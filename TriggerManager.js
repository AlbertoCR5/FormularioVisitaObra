/**
 * @file TriggerManager.gs
 * @description Gestiona la creación y eliminación de activadores (triggers)
 * para procesar tareas pesadas de forma asíncrona.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

/**
 * Función que será llamada por el activador para procesar las imágenes.
 * Esta función se ejecuta de forma independiente al script principal.
 */
function processImagesTriggerHandler() {
  const userProperties = PropertiesService.getUserProperties();
  const docId = userProperties.getProperty('docIdForImageProcessing');
  const imageIdsString = userProperties.getProperty('imageIdsForProcessing');

  if (docId && imageIdsString) {
    try {
      const imageIds = JSON.parse(imageIdsString);
      Logger.log(`🖼️ Ejecutando activador para procesar ${imageIds.length} imágenes en el documento ID: ${docId}`);

      const imageProcessor = new ImageProcessor(docId, imageIds);
      imageProcessor.processImages();

      // Una vez procesado, guardamos y cerramos el documento.
      const doc = DocumentApp.openById(docId);
      doc.saveAndClose();
      Logger.log(`✅ Imágenes insertadas y documento guardado.`);

    } catch (e) {
      Logger.log(`❌ ERROR en el activador de imágenes: ${e.toString()}`);
    } finally {
      // Limpiamos las propiedades para no volver a ejecutarlo innecesariamente.
      userProperties.deleteProperty('docIdForImageProcessing');
      userProperties.deleteProperty('imageIdsForProcessing');
    }
  }

  // Eliminamos todos los activadores asociados a esta función para evitar ejecuciones futuras.
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'processImagesTriggerHandler') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}


/**
 * Clase para gestionar la creación de activadores.
 */
class TriggerManager {
  /**
   * Crea un activador temporal para procesar las imágenes.
   * @param {string} docId El ID del documento donde se insertarán las imágenes.
   * @param {string[]} allImageIds Un array con todos los IDs de las imágenes.
   */
  static createImageProcessingTrigger(docId, allImageIds) {
    if (!docId || !allImageIds || allImageIds.length === 0) {
      Logger.log('🤷 No hay imágenes para procesar, no se crea el activador.');
      return;
    }

    try {
      // Guardamos los datos necesarios para que el activador pueda acceder a ellos.
      const userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty('docIdForImageProcessing', docId);
      userProperties.setProperty('imageIdsForProcessing', JSON.stringify(allImageIds));

      // Creamos un activador que se ejecutará una vez, 10 segundos en el futuro.
      // Este tiempo da margen para que la ejecución principal termine.
      ScriptApp.newTrigger('processImagesTriggerHandler')
        .timeBased()
        .after(10 * 1000) // 10 segundos
        .create();

      Logger.log('⏳ Activador para el procesamiento de imágenes creado. Se ejecutará en breve.');

    } catch (e) {
      Logger.log(`❌ ERROR al crear el activador de imágenes: ${e.toString()}`);
    }
  }
}
