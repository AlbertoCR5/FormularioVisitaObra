/**
 * @file ImageProcessor.gs
 * @description Clase para procesar e insertar un grupo consolidado de imágenes en una única tabla.
 * @version 7.0.0 - Lógica de tabla única para eliminar saltos de línea entre grupos.
 * @author Gemini (Refactorizado)
 */
class ImageProcessor {
  /**
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @param {string} placeholder El placeholder "maestro" donde se insertará la tabla.
   * @param {string[]} allImageIds Un array con TODOS los IDs de imágenes a insertar.
   */
  constructor(body, placeholder, allImageIds) {
    this.body = body;
    this.placeholder = placeholder;
    this.allImageIds = allImageIds || [];
    this.COLUMNAS_POR_TABLA = 2;
    this.IMAGE_SIZE_POINTS = 212.6; // 7.50 cm en puntos (1 cm = 28.3465 pt)
    this.COLUMN_WIDTH_POINTS = 218.3; // 7.7 cm en puntos
  }

  /**
   * Crea una única tabla para todas las imágenes en la ubicación del placeholder y luego lo elimina.
   */
  insertAllImagesAsSingleTable() {
    const placeholderRange = this.body.findText(this.placeholder);
    if (!placeholderRange) {
      Logger.log(`⚠️ No se encontró el placeholder maestro "${this.placeholder}".`);
      return;
    }

    const parentParagraph = placeholderRange.getElement().getParent().asParagraph();
    const insertionIndex = this.body.getChildIndex(parentParagraph);
    parentParagraph.removeFromParent();

    const numRows = Math.ceil(this.allImageIds.length / this.COLUMNAS_POR_TABLA);
    if (numRows === 0) {
        Logger.log('No hay imágenes para insertar en la tabla única.');
        return;
    }

    const table = this.body.insertTable(insertionIndex, Array.from({ length: numRows }, () => Array(this.COLUMNAS_POR_TABLA).fill('')));
    this._styleTable(table);

    try {
      for (let i = 0; i < table.getNumRows(); i++) {
        table.getRow(i).setMinimumHeight(this.COLUMN_WIDTH_POINTS);
      }
    } catch (e) {
      Logger.log(`⚠️ No se pudo fijar la altura mínima de las filas. Es posible que el entorno no lo soporte. Error: ${e.toString()}`);
    }

    this.allImageIds.forEach((fileId, i) => {
      const rowIndex = Math.floor(i / this.COLUMNAS_POR_TABLA);
      const colIndex = i % this.COLUMNAS_POR_TABLA;
      const cell = table.getCell(rowIndex, colIndex);
      this._styleAndPopulateCell(cell, fileId);
    });

    Logger.log(`✅ Tabla única de ${numRows}x${this.COLUMNAS_POR_TABLA} creada para todas las imágenes.`);
  }

  /**
   * Aplica estilos a la tabla, como bordes y ancho de columna.
   * @param {GoogleAppsScript.Document.Table} table La tabla a estilizar.
   * @private
   */
  _styleTable(table) {
    const style = {};
    style[DocumentApp.Attribute.BORDER_WIDTH] = 0;
    table.setAttributes(style);

    try {
      for (let i = 0; i < this.COLUMNAS_POR_TABLA; i++) {
        table.setColumnWidth(i, this.COLUMN_WIDTH_POINTS);
      }
    } catch (e) {
      Logger.log(`⚠️ No se pudo fijar el ancho de las columnas. Es posible que el entorno no lo soporte. Error: ${e.toString()}`);
    }
  }

  /**
   * Estiliza una celda y la rellena con una imagen.
   * @param {GoogleAppsScript.Document.TableCell} cell La celda a modificar.
   * @param {string} fileId El ID del archivo de imagen.
   * @private
   */
  _styleAndPopulateCell(cell, fileId) {
    try {
      cell.clear();
      cell.setPaddingTop(0).setPaddingBottom(0).setPaddingLeft(0).setPaddingRight(0);
      cell.setVerticalAlignment(DocumentApp.VerticalAlignment.MIDDLE);

      const imageFile = DriveApp.getFileById(fileId);
      const imageBlob = imageFile.getBlob();
      const insertedImage = cell.insertImage(0, imageBlob);
      this._styleImage(insertedImage);

      // Limpieza de párrafos vacíos residuales en la celda
      const numChildren = cell.getNumChildren();
      if (numChildren > 1) {
        for (let i = numChildren - 1; i >= 0; i--) {
          const child = cell.getChild(i);
          if (child.getType() === DocumentApp.ElementType.PARAGRAPH && child.asParagraph().getText().trim() === '' && cell.getNumChildren() > 1) {
            child.removeFromParent();
          }
        }
      }

    } catch (e) {
      Logger.log(`❌ No se pudo procesar la imagen con ID ${fileId}: ${e.toString()}`);
      try {
        cell.setText(`[Error al cargar imagen ID: ${fileId}]`);
      } catch (cellError) {
        Logger.log(`❌ No se pudo ni siquiera escribir en la celda: ${cellError.toString()}`);
      }
    }
  }

  /**
   * Aplica estilo a una imagen para que ocupe el tamaño definido.
   * @param {GoogleAppsScript.Document.InlineImage} image La imagen a estilizar.
   * @private
   */
  _styleImage(image) {
    image.setWidth(this.IMAGE_SIZE_POINTS).setHeight(this.IMAGE_SIZE_POINTS);
    const paragraph = image.getParent().asParagraph();
    paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    paragraph.setSpacingBefore(0);
    paragraph.setSpacingAfter(0);
  }
}