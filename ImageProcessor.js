/**
 * @file ImageProcessor.gs
 * @description Clase para procesar e insertar un grupo consolidado de imágenes en una única tabla.
 *              Se asegura que las imágenes tengan un tamaño uniforme (7,52 cm x 7,52 cm) usando un factor de escalado.
 * @version 8.1.0 - Re-implementa tablas y mantiene el escalado de imágenes.
 * @autor Gemini (Refactorizado)
 */
class ImageProcessor {
  /**
   * @param {GoogleAppsScript.Document.Body} body - El cuerpo del documento.
   * @param {string} placeholder - El placeholder maestro donde se insertará la tabla.
   * @param {string[]} allImageIds - Un array con TODOS los IDs de imágenes a insertar.
   */
  constructor(body, placeholder, allImageIds) {
    this.body = body;
    this.placeholder = placeholder;
    this.allImageIds = allImageIds || [];

    /** @constant {number} Número de columnas por tabla */
    this.COLUMNAS_POR_TABLA = 2;

    /** @constant {number} Tamaño final deseado para la imagen en puntos (7,52 cm = 212.88 pt) */
    const TARGET_IMAGE_SIZE_POINTS = 212.88;

    /** @constant {number} Factor de corrección para el tamaño de la imagen (134%) */
    const CORRECTION_FACTOR = 1.34;

    /** @constant {number} Tamaño ajustado a enviar a la API de Docs */
    this.ADJUSTED_IMAGE_SIZE_POINTS = TARGET_IMAGE_SIZE_POINTS * CORRECTION_FACTOR;
    
    /** @constant {number} Ancho de columna en puntos (8 cm = 226.77 pt) */
    this.COLUMN_WIDTH_POINTS = 226.77;
  }

  /**
   * Inserta todas las imágenes en una única tabla en el lugar del placeholder.
   * Elimina el placeholder una vez procesado.
   */
  insertAllImagesAsSingleTable() {
    const placeholderRange = this.body.findText(this.placeholder);
    if (!placeholderRange) {
      Logger.log(`⚠️ No se encontró el placeholder maestro "${this.placeholder}".`);
      return;
    }

    // Identificar párrafo de inserción
    const parentParagraph = placeholderRange.getElement().getParent().asParagraph();
    const insertionIndex = this.body.getChildIndex(parentParagraph);
    parentParagraph.removeFromParent();

    // Calcular número de filas
    const numRows = Math.ceil(this.allImageIds.length / this.COLUMNAS_POR_TABLA);
    if (numRows === 0) {
      Logger.log("ℹ️ No hay imágenes para insertar en la tabla única.");
      return;
    }

    // Crear tabla vacía con celdas
    const table = this.body.insertTable(
      insertionIndex,
      Array.from({ length: numRows }, () => Array(this.COLUMNAS_POR_TABLA).fill(""))
    );

    this._styleTable(table);

    // Insertar imágenes en celdas
    this.allImageIds.forEach((fileId, i) => {
      const rowIndex = Math.floor(i / this.COLUMNAS_POR_TABLA);
      const colIndex = i % this.COLUMNAS_POR_TABLA;
      const cell = table.getCell(rowIndex, colIndex);
      cell.setVerticalAlignment(DocumentApp.VerticalAlignment.MIDDLE);
      this._styleAndPopulateCell(cell, fileId);
    });

    Logger.log(`✅ Tabla única de ${numRows}x${this.COLUMNAS_POR_TABLA} creada con todas las imágenes.`);
  }

  /**
   * Aplica estilos generales a la tabla.
   * @param {GoogleAppsScript.Document.Table} table - La tabla a estilizar.
   * @private
   */
  _styleTable(table) {
    // Eliminar bordes
    const style = {};
    style[DocumentApp.Attribute.BORDER_WIDTH] = 0;
    table.setAttributes(style);

    // Fijar ancho de columnas
    try {
      for (let i = 0; i < this.COLUMNAS_POR_TABLA; i++) {
        table.setColumnWidth(i, this.COLUMN_WIDTH_POINTS);
      }
    } catch (e) {
      Logger.log(`⚠️ No se pudo fijar el ancho de columnas: ${e.toString()}`);
    }
  }

  /**
   * Inserta y estiliza una imagen en la celda indicada.
   * @param {GoogleAppsScript.Document.TableCell} cell - La celda a modificar.
   * @param {string} fileId - El ID del archivo de imagen en Google Drive.
   * @returns {GoogleAppsScript.Document.InlineImage|null} La imagen insertada o null en caso de error.
   * @private
   */
  _styleAndPopulateCell(cell, fileId) {
    try {
      // Limpiar celda
      cell.clear();
      cell.setPaddingTop(0).setPaddingBottom(0).setPaddingLeft(0).setPaddingRight(0);
      cell.setVerticalAlignment(DocumentApp.VerticalAlignment.MIDDLE);

      // Obtener imagen como PNG para evitar problemas con DPI
      const imageFile = DriveApp.getFileById(fileId);
      const imageBlob = imageFile.getBlob().getAs("image/png");

      // Insertar imagen
      const insertedImage = cell.insertImage(0, imageBlob);
      
      // Añadir enlace a la imagen
      const imageUrl = imageFile.getUrl(); // Obtener la URL del archivo de imagen
      insertedImage.setLinkUrl(imageUrl);

      // Redimensionar (doble resize para forzar tamaño)
      this._forceResize(insertedImage);

      // Centrar y limpiar párrafos vacíos
      this._styleImage(insertedImage);
      this._cleanEmptyParagraphs(cell);
      
      // Redimensionar (doble resize para forzar tamaño)
      this._forceResize(insertedImage);

      return insertedImage;
    } catch (e) {
      Logger.log(`❌ No se pudo procesar la imagen con ID ${fileId}: ${e.toString()}`);
      try {
        cell.setText(`[Error al cargar imagen ID: ${fileId}]`);
      } catch (cellError) {
        Logger.log(`❌ Tampoco se pudo escribir en la celda: ${cellError.toString()}`);
      }
      return null;
    }
  }

  /**
   * Fuerza el redimensionamiento exacto de la imagen (doble resize).
   * @param {GoogleAppsScript.Document.InlineImage} image - La imagen a redimensionar.
   * @private
   */
  _forceResize(image) {
    image.setWidth(this.ADJUSTED_IMAGE_SIZE_POINTS).setHeight(this.ADJUSTED_IMAGE_SIZE_POINTS);
    Utilities.sleep(50); // pequeño delay para que Docs procese
    image.setWidth(this.ADJUSTED_IMAGE_SIZE_POINTS).setHeight(this.ADJUSTED_IMAGE_SIZE_POINTS);
  }

  /**
   * Aplica estilo de alineación y elimina espaciados alrededor de la imagen.
   * @param {GoogleAppsScript.Document.InlineImage} image - La imagen a estilizar.
   * @private
   */
  _styleImage(image) {
    const paragraph = image.getParent().asParagraph();
    const style = {};
    style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
    style[DocumentApp.Attribute.SPACING_BEFORE] = 0;
    style[DocumentApp.Attribute.SPACING_AFTER] = 0;
    style[DocumentApp.Attribute.INDENT_START] = 0;
    style[DocumentApp.Attribute.INDENT_END] = 0;
    paragraph.setAttributes(style);
  }

  /**
   * Elimina párrafos vacíos residuales en una celda.
   * @param {GoogleAppsScript.Document.TableCell} cell - La celda a limpiar.
   * @private
   */
  _cleanEmptyParagraphs(cell) {
    const numChildren = cell.getNumChildren();
    if (numChildren > 1) {
      for (let i = numChildren - 1; i >= 0; i--) {
        const child = cell.getChild(i);
        if (
          child.getType() === DocumentApp.ElementType.PARAGRAPH &&
          child.asParagraph().getText().trim() === "" &&
          cell.getNumChildren() > 1
        ) {
          child.removeFromParent();
        }
      }
    }
  }
}
