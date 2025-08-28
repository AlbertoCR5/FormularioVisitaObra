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
    
    // Obtenemos el índice donde insertar las tablas y eliminamos el párrafo del placeholder.
    const parentParagraph = placeholderElement.getParent().asParagraph();
    const insertionIndex = this.body.getChildIndex(parentParagraph);
    parentParagraph.removeFromParent();

    Logger.log(`🖼️ Procesando ${this.fileIds.length} imágenes para "${this.placeholder}"...`);

    // Dividimos el total de imágenes en grupos (chunks) para cada tabla.
    const chunks = [];
    for (let i = 0; i < this.fileIds.length; i += this.IMAGENES_POR_TABLA) {
      chunks.push(this.fileIds.slice(i, i + this.IMAGENES_POR_TABLA));
    }

    // Invertimos los chunks para insertarlos en el mismo índice y que queden en el orden correcto.
    chunks.reverse().forEach(chunk => {
      const table = this._createTableForChunk(chunk, insertionIndex);
      if (table) {
        this._populateTableWithImages(table, chunk);
        
        // Google Docs puede añadir párrafos vacíos alrededor de la tabla. Eliminamos todos los párrafos
        // vacíos consecutivos antes y después para evitar cualquier salto de línea entre tablas.
        let prev = table.getPreviousSibling();
        while (prev && prev.getType() === DocumentApp.ElementType.PARAGRAPH && prev.asParagraph().getText().trim() === '') {
          const toRemove = prev;
          prev = prev.getPreviousSibling();
          toRemove.removeFromParent();
        }

        let next = table.getNextSibling();
        while (next && next.getType() === DocumentApp.ElementType.PARAGRAPH && next.asParagraph().getText().trim() === '') {
          const toRemove = next;
          next = next.getNextSibling();
          toRemove.removeFromParent();
        }
      }
    });
    // Limpieza post-procesado: eliminamos párrafos vacíos que queden adyacentes a tablas
    // (más agresivo) para eliminar saltos de línea residuales.
    try {
      this._removeEmptyParagraphsAroundTables();
    } catch (e) {
      Logger.log('⚠️ Error al limpiar párrafos vacíos: ' + e.toString());
    }
    
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
    // Intentamos fijar el ancho de columnas para que cada celda pueda alojar una imagen de 7.50cm.
    // 1 cm = 28.3465 points. 7.50 cm = 212.6 points.
    const imageSizePoints = 28.3465 * 7.5; // 212.59875 ~ 212.6
    try {
      for (let c = 0; c < this.COLUMNAS_POR_TABLA; c++) {
        table.setColumnWidth(c, imageSizePoints);
      }
    } catch (e) {
      // Si la API no soporta setColumnWidth en esta versión, lo ignoramos y lo intentaremos
      // fijando la altura mínima de las celdas al insertar las imágenes.
      Logger.log('⚠️ setColumnWidth no disponible: ' + e.toString());
    }
    
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
        
                // Limpiamos la celda, eliminamos el padding y centramos verticalmente.
                cell.clear();
                cell.setPaddingTop(0).setPaddingBottom(0).setPaddingLeft(0).setPaddingRight(0);
                cell.setVerticalAlignment(DocumentApp.VerticalAlignment.MIDDLE);

                // Aseguramos una altura mínima para la celda equivalente al tamaño de la imagen
                // para evitar que Google Docs reescale la imagen para ajustarla a una celda más pequeña.
                const imageSizePoints = 28.3465 * 7.5; // 212.59875
                try {
                  cell.setMinimumHeight(imageSizePoints);
                } catch (e) {
                  // Algunas versiones no exponen setMinimumHeight; ignorar si falla.
                }

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
    // 1 cm = 28.3465 points. 7.50 cm = 212.6 points.
    const imageSize = 212.6; 

    // Centramos el párrafo que contiene la imagen.
    const paragraph = image.getParent().asParagraph();
    paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    // Eliminar espaciado adicional del párrafo que puede crear saltos verticales.
    try {
      paragraph.setSpacingBefore(0);
      paragraph.setSpacingAfter(0);
    } catch (e) {
      // Algunas versiones de DocumentApp no exponen setSpacingBefore/After; ignorar si falla.
    }

    // Ajustamos la imagen a un tamaño fijo de 7.50cm x 7.50cm en puntos.
    image.setWidth(imageSize).setHeight(imageSize);
  }

  /**
   * Recorre el body y elimina párrafos vacíos que estén adyacentes a tablas
   * o que sean parte de grupos de párrafos vacíos consecutivos.
   * Esto ayuda a eliminar saltos de línea insertados por Google Docs alrededor de tablas.
   * @private
   */
  _removeEmptyParagraphsAroundTables() {
    const numChildren = this.body.getNumChildren();
    // Recorremos de atrás hacia adelante para poder eliminar elementos sin romper índices.
    for (let i = numChildren - 1; i >= 0; i--) {
      const child = this.body.getChild(i);
      if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
        const para = child.asParagraph();
        if (para.getText().trim() === '') {
          const prev = i > 0 ? this.body.getChild(i - 1) : null;
          const next = i < this.body.getNumChildren() - 1 ? this.body.getChild(i + 1) : null;
          const prevIsTable = prev && prev.getType() === DocumentApp.ElementType.TABLE;
          const nextIsTable = next && next.getType() === DocumentApp.ElementType.TABLE;
          const nextIsEmptyPara = next && next.getType() === DocumentApp.ElementType.PARAGRAPH && next.asParagraph().getText().trim() === '';
          const prevIsEmptyPara = prev && prev.getType() === DocumentApp.ElementType.PARAGRAPH && prev.asParagraph().getText().trim() === '';

          if (prevIsTable || nextIsTable || nextIsEmptyPara || prevIsEmptyPara) {
            para.removeFromParent();
          }
        }
      }
    }
  }
}
