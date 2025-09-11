/**
 * Renombra archivos dentro de carpetas específicas de Google Drive.
 * La función itera sobre un conjunto predefinido de carpetas,
 * renombra los archivos dentro de cada una según un patrón
 * que incluye la fecha actual y un número secuencial dentro de un rango específico.
 * Se añade una comprobación para evitar renombrar archivos que ya cumplen el formato.
 */
function renameFiles() {
  // Define los IDs de las carpetas y el rango de numeración para los archivos en cada una.
  const FOLDER_IDS = {
    '1eSMfw2ALxCpXBH5lLd7ij3_5LF4KTyu4aCLXoUXF0wAf7TxyEmLZTK-bTSwJpR-tk4taG2yK': { start: 1, end: 10 }, // Rango de numeración del 1 al 10 para esta carpeta.
    '1yLjOiTxdc1Vr1Q1qqlCx-gt-9_o9YWn9oTez2qm6fT7pmRySWh1DyHPE4eSna6Z3-MPnp-gf': { start: 11, end: 20 }, // Rango de numeración del 11 al 20 para esta carpeta.
    '1w8oFs_JrgDkZSVE41cyD1lH8XvoX0Cpy467UerO4cwQ4QCrTuNI4e6lrE57_YP6U7OsQRpVD': { start: 21, end: 30 }, // Rango de numeración del 21 al 30 para esta carpeta.
    '1p-zSuwjMAmsztbOcAZltzTj4H1yxMNUS9M14IQvbINQQdZxBYyf_OXJ5EYMcuzPKrQdJjeJJ': { start: 31, end: 40 }, // Rango de numeración del 31 al 40 para esta carpeta.
    '1ojykZr98Y9bwm3XonHqlXvnyVtsC73bLoiCamlmAYFGI5oyg8gHE1PUf98tukSG9RPGxK9oh': { start: 41, end: 50 }  // Rango de numeración del 41 al 50 para esta carpeta.
  };

  // Obtiene la fecha actual y la formatea como ddmmyyyy.
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0, por eso se suma 1.
  const year = today.getFullYear();
  const dateFormatted = `${day}${month}${year}`; // Formato ddmmyyyy.

  // Define el patrón regex para el nombre de archivo esperado (ej: IMG_ddmmyyyy_nnnn.extension).
  // Este patrón busca "IMG_" seguido de 8 dígitos (la fecha), un guión bajo, 4 dígitos (el número secuencial)
  // y opcionalmente una extensión precedida por un punto.
  const expectedNamePattern = /^IMG_\d{8}_\d{4}(\..*)?$/;

  // Itera sobre cada carpeta definida en FOLDER_IDS.
  for (const folderId in FOLDER_IDS) {
    // Obtiene la información del rango de numeración para la carpeta actual.
    const folderInfo = FOLDER_IDS[folderId];
    // Obtiene el objeto Folder de Google DriveApp.
    const folder = DriveApp.getFolderById(folderId);
    // Obtiene un iterador para los archivos dentro de la carpeta.
    const files = folder.getFiles();

    // Inicializa el contador de imágenes con el número de inicio definido para la carpeta.
    let i = folderInfo.start;

    // Itera sobre cada archivo en la carpeta.
    while (files.hasNext()) {
      const file = files.next();
      const currentName = file.getName();

      // *** Comprobación añadida: Verifica si el nombre actual del archivo ya cumple el formato esperado. ***
      if (expectedNamePattern.test(currentName)) {
        // Si el nombre ya cumple el formato, salta al siguiente archivo sin renombrar.
        Logger.log(`El archivo "${currentName}" en carpeta "${folder.getName()}" ya tiene el formato adecuado. Saltando renombrado.`);
        i++; // Incrementa el contador incluso si no se renombra, para mantener la secuencia.
        // Opcional: Si no quieres que los archivos ya renombrados cuenten para el rango,
        // podrías comentar la línea `i++;` aquí y solo incrementarla cuando se renombra.
        // Sin embargo, para mantener la numeración secuencial en el rango, es mejor incrementarla.
        continue; // Pasa a la siguiente iteración del bucle while.
      }
      // *** Fin de la comprobación añadida ***


      // Extrae la extensión del archivo si existe.
      const extension = currentName.lastIndexOf('.') > 0 ? currentName.slice(currentName.lastIndexOf('.')) : '';

      // Genera el nuevo nombre del archivo en el formato "IMG_ddmmyyyy_0001".
      // Usa padStart(4, '0') para asegurar que el número secuencial tenga 4 dígitos, rellenando con ceros a la izquierda.
      const newName = `IMG_${dateFormatted}_${String(i).padStart(4, '0')}${extension}`;

      // Intenta renombrar el archivo y registra el resultado o cualquier error.
      try {
        file.setName(newName);
        // Registra el renombrado exitoso.
        Logger.log(`Renombrado "${currentName}" a "${newName}" en carpeta "${folder.getName()}"`);
      } catch (e) {
        // Registra cualquier error durante el renombrado, incluyendo el mensaje de error.
        Logger.log(`Error al renombrar "${currentName}" en carpeta "${folder.getName()}": ${e.message}`);
      }

      // Incrementa el contador para el siguiente archivo.
      i++;

      // Si el contador excede el número final definido para la carpeta, detiene el procesamiento de archivos en esta carpeta.
      if (i > folderInfo.end) {
        break;
      }
    }
  }
}