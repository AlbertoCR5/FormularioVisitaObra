/**
 * @file ImageProcessor.gs
 * @description Clase genérica para procesar e insertar grupos de imágenes en el informe.
 * @version 3.0.1 - Corrige el error 'table.appendRow is not a function'.
 * @author Gemini (Refactorizado)
 */
class ImageProcessor {
  /**
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @param {string} placeholder El placeholder exacto a buscar.
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
   * Inserta las imágenes en una o más tablas en la ubicación del placeholder y luego lo elimina.
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

    const parentElement = placeholderElement.getParent().getParent();
    let insertionIndex = parentElement.getChildIndex(placeholderElement.getParent());

    Logger.log(`🖼️ Procesando ${this.fileIds.length} imágenes para "${this.placeholder}"...`);

    const chunks = [];
    for (let i = 0; i < this.fileIds.length; i += this.IMAGENES_POR_TABLA) {
      chunks.push(this.fileIds.slice(i, i + this.IMAGENES_POR_TABLA));
    }

    chunks.forEach((chunk, chunkIndex) => {
      const table = this._createTableForChunk(chunk, insertionIndex + chunkIndex);
      if (table) {
        this._populateTable(table, chunk, chunkIndex * this.IMAGENES_POR_TABLA);
      }
    });
    
    placeholderElement.setText('');
    Logger.log(`✅ Todas las tablas de imágenes para "${this.placeholder}" fueron creadas.`);
  }

  /**
   * Crea y devuelve una nueva tabla en la posición especificada.
   * @param {string[]} chunk El grupo de IDs de imágenes para esta tabla.
   * @param {number} index La posición en el body donde insertar la tabla.
   * @returns {GoogleAppsScript.Document.Table | null} La tabla creada o null si no hay imágenes.
   * @private
   */
  _createTableForChunk(chunk, index) {
    const numRows = Math.ceil(chunk.length / this.COLUMNAS_POR_TABLA);
    if (numRows === 0) {
      return null;
    }
    const tableArray = Array.from({ length: numRows }, () => Array(this.COLUMNAS_POR_TABLA).fill(''));
    return this.body.insertTable(index, tableArray);
  }

  /**
   * Rellena una tabla con un grupo de imágenes y sus pies de foto.
   * @param {GoogleAppsScript.Document.Table} table La tabla a rellenar.
   * @param {string[]} chunk El grupo de IDs de imágenes.
   * @param {number} imageStartIndex El índice global de inicio para los pies de foto.
   * @private
   */
  _populateTable(table, chunk, imageStartIndex) {
    chunk.forEach((fileId, index) => {
      try {
        const imageFile = DriveApp.getFileById(fileId);
        const imageBlob = imageFile.getBlob();

        const rowIndex = Math.floor(index / this.COLUMNAS_POR_TABLA);
        const colIndex = index % this.COLUMNAS_POR_TABLA;
        const cell = table.getCell(rowIndex, colIndex);
        cell.clear();

        const insertedImage = cell.insertImage(0, imageBlob);
        this._styleImage(insertedImage);

        const caption = cell.appendParagraph(`Fotografía ${imageStartIndex + index + 1}.`);
        caption.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        caption.setItalic(true);

      } catch (e) {
        Logger.log(`❌ No se pudo insertar la imagen con ID ${fileId}: ${e.toString()}`);
        const rowIndex = Math.floor(index / this.COLUMNAS_POR_TABLA);
        const colIndex = index % this.COLUMNAS_POR_TABLA;
        table.getCell(rowIndex, colIndex).setText(`[Error al cargar imagen ID: ${fileId}]`);
      }
    });
  }

  /**
   * Aplica un estilo consistente a una imagen insertada.
   * @param {GoogleAppsScript.Document.InlineImage} image La imagen a estilizar.
   * @private
   */
  _styleImage(image) {
    const maxWidth = 250;
    const originalWidth = image.getWidth();
    image.getParent().asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    if (originalWidth > maxWidth) {
      const aspectRatio = image.getHeight() / originalWidth;
      image.setWidth(maxWidth).setHeight(maxWidth * aspectRatio);
    }
  }
}