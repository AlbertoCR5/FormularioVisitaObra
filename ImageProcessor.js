/**
 * @file ImageProcessor.gs
 * @description Clase genérica para procesar e insertar grupos de imágenes en el informe.
 * @version 4.0.0 - Estilo de imagen mejorado: sin bordes, sin títulos y ocupando toda la celda.
 * @author Gemini (Refactorizado)
 */
class ImageProcessor {
  /**
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @param {string} placeholder El placeholder exacto donde se insertarán las imágenes.
   * @param {string[]} fileIds Un array con los IDs de los archivos de imagen.
   */
  constructor(body, placeholder, fileIds) {
    this.body = body;
    this.placeholder = placeholder;
    this.fileIds = fileIds || [];
    this.IMAGENES_POR_TABLA = 6;
    this.COLUMNAS_POR_TABLA = 2;
  }

  /**
   * Inserta todas las imágenes en una o más tablas en la ubicación del placeholder y luego lo elimina.
   */
  insertImages() {
    const placeholderRange = this.body.findText(this.placeholder);
    if (!placeholderRange) {
      Logger.log(`⚠️ No se encontró el placeholder "${this.placeholder}".`);
      return;
    }

    const placeholderElement = placeholderRange.getElement().asText();

    if (this.fileIds.length === 0) {
      placeholderElement.setText('');
      Logger.log(`🤷 No se adjuntaron imágenes para "${this.placeholder}". Placeholder limpiado.`);
      return;
    }
    
    // Obtenemos el índice donde insertar las tablas, justo antes del párrafo del placeholder.
    const parentParagraph = placeholderElement.getParent().asParagraph();
    const insertionIndex = this.body.getChildIndex(parentParagraph);

    Logger.log(`🖼️ Procesando ${this.fileIds.length} imágenes para "${this.placeholder}"...`);

    // Dividimos el total de imágenes en grupos (chunks) para cada tabla.
    const chunks = [];
    for (let i = 0; i < this.fileIds.length; i += this.IMAGENES_POR_TABLA) {
      chunks.push(this.fileIds.slice(i, i + this.IMAGENES_POR_TABLA));
    }

    // Creamos y rellenamos una tabla por cada grupo de imágenes.
    chunks.forEach((chunk, chunkIndex) => {
      const table = this._createTableForChunk(chunk, insertionIndex + chunkIndex);
      if (table) {
        this._populateTableWithImages(table, chunk);
      }
    });
    
    // Eliminamos el párrafo que contenía el placeholder.
    parentParagraph.removeFromParent();
    Logger.log(`✅ Todas las tablas de imágenes para "${this.placeholder}" fueron creadas y el placeholder eliminado.`);
  }

  /**
   * Crea una nueva tabla con el estilo deseado (sin bordes).
   * @param {string[]} chunk El grupo de IDs de imágenes para esta tabla.
   * @param {number} index La posición en el body donde insertar la tabla.
   * @returns {GoogleAppsScript.Document.Table | null} La tabla creada.
   * @private
   */
  _createTableForChunk(chunk, index) {
    const numRows = Math.ceil(chunk.length / this.COLUMNAS_POR_TABLA);
    if (numRows === 0) return null;
    
    const tableArray = Array.from({ length: numRows }, () => Array(this.COLUMNAS_POR_TABLA).fill(''));
    const table = this.body.insertTable(index, tableArray);

    // Aplicamos estilo sin bordes a toda la tabla.
    const style = {};
    style[DocumentApp.Attribute.BORDER_WIDTH] = 0;
    table.setAttributes(style);
    
    return table;
  }

  /**
   * Rellena una tabla con un grupo de imágenes, ajustándolas a la celda.
   * @param {GoogleAppsScript.Document.Table} table La tabla a rellenar.
   * @param {string[]} chunk El grupo de IDs de imágenes.
   * @private
   */
  _populateTableWithImages(table, chunk) {
    chunk.forEach((fileId, index) => {
      try {
        const imageFile = DriveApp.getFileById(fileId);
        const imageBlob = imageFile.getBlob();

        const rowIndex = Math.floor(index / this.COLUMNAS_POR_TABLA);
        const colIndex = index % this.COLUMNAS_POR_TABLA;
        const cell = table.getCell(rowIndex, colIndex);
        
        // Limpiamos la celda y eliminamos el padding.
        cell.clear();
        cell.setPaddingTop(0).setPaddingBottom(0).setPaddingLeft(0).setPaddingRight(0);

        const insertedImage = cell.insertImage(0, imageBlob);
        this._styleImageToFitCell(insertedImage, cell);

      } catch (e) {
        Logger.log(`❌ No se pudo insertar la imagen con ID ${fileId}: ${e.toString()}`);
        const rowIndex = Math.floor(index / this.COLUMNAS_POR_TABLA);
        const colIndex = index % this.COLUMNAS_POR_TABLA;
        table.getCell(rowIndex, colIndex).setText(`[Error al cargar imagen ID: ${fileId}]`);
      }
    });
  }

  /**
   * Aplica estilo a una imagen para que ocupe el ancho de la celda manteniendo la proporción.
   * @param {GoogleAppsScript.Document.InlineImage} image La imagen a estilizar.
   * @param {GoogleAppsScript.Document.TableCell} cell La celda que contiene la imagen.
   * @private
   */
  _styleImageToFitCell(image, cell) {
    // Calculamos el ancho disponible en la página para la tabla.
    const pageWidth = this.body.getPageWidth() - this.body.getMarginLeft() - this.body.getMarginRight();
    const cellWidth = pageWidth / this.COLUMNAS_POR_TABLA;
    
    // Centramos el párrafo que contiene la imagen.
    image.getParent().asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    const originalWidth = image.getWidth();
    const originalHeight = image.getHeight();
    const aspectRatio = originalHeight / originalWidth;

    // Ajustamos la imagen al ancho de la celda, manteniendo la proporción.
    image.setWidth(cellWidth);
    image.setHeight(cellWidth * aspectRatio);
  }
}
