/**
 * @file ImageProcessor.gs
 * @description Clase para procesar e insertar imágenes en el informe.
 * @version 1.0.0
 * @author Gemini
 */
class ImageProcessor {
  /**
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @param {string[]} imageFileIds Un array con los IDs de los archivos de imagen.
   */
  constructor(body, imageFileIds) {
    this.body = body;
    this.imageFileIds = imageFileIds;
  }

  /**
   * Inserta las imágenes en el documento.
   */
  insertImages() {
    if (!this.imageFileIds || this.imageFileIds.length === 0) {
        Logger.log('🤷 No se adjuntaron imágenes.');
        this._limpiarPlaceholdersRestantes(/\{\{adjuntarImagenes[^}]+\}\}/g);
        return;
    }

    const placeholderRange = this.body.findText('{{adjuntarImagenes1a10}}') || this.body.findText('{{adjuntarImagenes11a20}}') || this.body.findText('{{adjuntarImagenes21a30}}');
    
    if (!placeholderRange) {
        Logger.log('⚠️ No se encontró ningún placeholder de imágenes. No se insertarán las imágenes.');
        return;
    }

    const placeholderElement = placeholderRange.getElement();
    const parentParagraph = placeholderElement.getParent().asParagraph();
    const insertionIndex = this.body.getChildIndex(parentParagraph);

    Logger.log(`🖼️ Insertando ${this.imageFileIds.length} imágenes...`);

    this.imageFileIds.forEach((fileId, index) => {
        try {
            const imageFile = DriveApp.getFileById(fileId);
            const imageBlob = imageFile.getBlob();
            
            const insertedImage = this.body.insertImage(insertionIndex + index, imageBlob);
            insertedImage.getParent().asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
            
            const maxWidth = 500;
            const originalWidth = insertedImage.getWidth();
            if (originalWidth > maxWidth) {
                const aspectRatio = insertedImage.getHeight() / originalWidth;
                insertedImage.setWidth(maxWidth).setHeight(maxWidth * aspectRatio);
            }

            this.body.insertParagraph(insertionIndex + index + 1, `Fotografía ${index + 1}.`).setAlignment(DocumentApp.HorizontalAlignment.CENTER);

        } catch (e) {
            Logger.log(`❌ No se pudo insertar la imagen con ID ${fileId}: ${e.toString()}`);
            this.body.insertParagraph(insertionIndex + index, `[Error al cargar imagen con ID: ${fileId}]`);
        }
    });

    this._limpiarPlaceholdersRestantes(/\{\{adjuntarImagenes[^}]+\}\}/g);
    Logger.log('✅ Imágenes insertadas y placeholders limpiados.');
  }

  /**
   * Limpia los placeholders restantes.
   * @param {RegExp} regex La expresión regular para encontrar los placeholders.
   * @private
   */
  _limpiarPlaceholdersRestantes(regex = /\{\{[^}]+\}\}/g) {
    this.body.replaceText(regex, ' ');
    Logger.log('🧹 Placeholders restantes limpiados.');
  }
}
