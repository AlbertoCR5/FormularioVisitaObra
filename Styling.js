/**
 * @file Styling.gs
 * @description Centraliza la configuración y las funciones de estilo para el informe.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

// ===================================================================================
// 🎨 CONFIGURACIÓN DE ESTILOS
// ===================================================================================

// Define los colores para cada nivel de valoración.
const RATING_COLORS = {
  1: '#D32F2F', // Rojo Intenso
  2: '#F57C00', // Naranja Intenso
  3: '#FBC02D', // Amarillo Intenso
  4: '#7CB342', // Verde Claro
  5: '#206b23'  // Verde
};

// Mapea la puntuación a la palabra clave correspondiente.
const RATING_KEYWORDS = {
  1: 'CRÍTICO',
  2: 'DEFICIENTE',
  3: 'MEJORABLE',
  4: 'ADECUADO',
  5: 'CORRECTO'
};

// Define el estilo para el texto legal/explicativo.
const DESCRIPTION_STYLE = {
  color: '#B71C1C', // Rojo fuerte (alerta)
  fontSize: 11,
  italic: true
};


// ===================================================================================
// 🖌️ FUNCIONES DE ESTILO
// ===================================================================================

/**
 * Módulo de aplicación de estilos. Aplica todo el formato dinámico al documento.
 * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
 * @param {Object} reportData El objeto con todos los datos del informe.
 */
function aplicarEstilosFinales(body, reportData) {
  reportData.ratingDataForStyling.forEach(data => {
    if (data.starString) {
      const color = RATING_COLORS[data.score];
      const consejoText = RESPUESTAS_ESPECIFICAS[data.titulo] && RESPUESTAS_ESPECIFICAS[data.titulo][data.score];
      if (consejoText) {
        // Mantener la PALABRA CLAVE (CRÍTICO/...) con su color por puntuación
        // y aplicar azul corporativo a la descripción del consejo.
        styleRatingConsejo(body, consejoText, color, '#1155cc');
      }
      styleTextInBody(body, data.starString, color, 15, true, false);
    }
  });
  // Asegurar que cualquier aparición aislada de los RATING_KEYWORDS mantenga su color asociado.
  aplicarColorAKeywords(body);
  Logger.log('🎨 Se ha aplicado el formato a los consejos de valoración y a las estrellas.');
}


/**
 * (VERSIÓN CORREGIDA) Aplica estilo a los consejos de valoración de forma robusta.
 * Busca solo la palabra clave y luego formatea el resto del texto.
 * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
 * @param {string} textToFind El texto completo del consejo a buscar (ej. "CRÍTICO: ...").
 * @param {string} keywordColor Color para la palabra clave (según RATING_COLORS).
 * @param {string} descriptionColor Color para la descripción del consejo (azul corporativo).
 */
function styleRatingConsejo(body, textToFind, keywordColor, descriptionColor) {
  // 1. Extraer la palabra clave del texto completo. Añadimos los dos puntos.
  const keyword = textToFind.split(':')[0] + ':'; // ej. "CRÍTICO:"

  // 2. Buscar SOLO la palabra clave. Esto es mucho más fiable que buscar el texto entero.
  let searchResult = body.findText(keyword);

  while (searchResult !== null) {
    const thisElement = searchResult.getElement().asText();
    const fullTextInElement = thisElement.getText();

    // 3. Comprobación de seguridad: Nos aseguramos de que el párrafo donde encontramos la
    //    palabra clave realmente contiene el texto completo del consejo.
    //    Esto evita dar formato a una palabra clave que aparezca sola en otro lugar.
    if (fullTextInElement.includes(textToFind)) {
      const keywordStartIndex = searchResult.getStartOffset();
      const keywordEndIndex = searchResult.getEndOffsetInclusive();

      // Calcular el final del texto completo del consejo para formatear la descripción
      const fullConsejoEndIndex = keywordStartIndex + textToFind.length - 1;

      // --- Aplicar estilo a la PALABRA CLAVE ---
  thisElement.setBold(keywordStartIndex, keywordEndIndex, true);
  thisElement.setForegroundColor(keywordStartIndex, keywordEndIndex, keywordColor);
      thisElement.setItalic(keywordStartIndex, keywordEndIndex, false);
      thisElement.setFontSize(keywordStartIndex, keywordEndIndex, 12);

      // --- Aplicar estilo a la DESCRIPCIÓN ---
      // La descripción empieza 2 caracteres después de la palabra clave (para saltar ':' y el espacio)
      const descriptionStartIndex = keywordEndIndex + 2;
      if (descriptionStartIndex <= fullConsejoEndIndex) {
        thisElement.setBold(descriptionStartIndex, fullConsejoEndIndex, false);
        // Descripción del consejo en azul corporativo
        thisElement.setForegroundColor(descriptionStartIndex, fullConsejoEndIndex, descriptionColor);
        thisElement.setItalic(descriptionStartIndex, fullConsejoEndIndex, true);
        thisElement.setFontSize(descriptionStartIndex, fullConsejoEndIndex, 12);
      }
    }
    
    // Buscar la siguiente aparición de la palabra clave
    searchResult = body.findText(keyword, searchResult);
  }
}

/**
 * Aplica el color correspondiente a cualquier aparición de las palabras clave
 * de valoración (CRÍTICO, DEFICIENTE, etc.) en el documento.
 * Mantiene coherencia con RATING_COLORS.
 * @param {GoogleAppsScript.Document.Body} body
 */
function aplicarColorAKeywords(body) {
  Object.entries(RATING_KEYWORDS).forEach(([score, keyword]) => {
    const color = RATING_COLORS[Number(score)];
    if (!color) return;
    // Solo color: no forzamos negrita ni cursiva para no alterar el formato original
    styleTextInBody(body, keyword, color, null, null, null);
  });
}


/**
 * Aplica un estilo genérico a un texto encontrado en el cuerpo del documento.
 * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
 * @param {string} textToFind El texto a buscar.
 * @param {string} color Código de color.
 * @param {number} fontSize Tamaño de la fuente.
 * @param {boolean} isBold Si debe ser negrita.
 * @param {boolean} isItalic Si debe ser cursiva.
 */
function styleTextInBody(body, textToFind, color, fontSize, isBold, isItalic) {
  let searchResult = body.findText(textToFind);
  while (searchResult !== null) {
    const thisElement = searchResult.getElement().asText();
    const startIndex = searchResult.getStartOffset();
    const endIndex = searchResult.getEndOffsetInclusive();
    
    if (color) thisElement.setForegroundColor(startIndex, endIndex, color);
    if (fontSize) thisElement.setFontSize(startIndex, endIndex, fontSize);
    if (isBold !== null) thisElement.setBold(startIndex, endIndex, isBold);
    if (isItalic !== null) thisElement.setItalic(startIndex, endIndex, isItalic);
    
    searchResult = body.findText(textToFind, searchResult);
  }
}

/**
 * Convierte una puntuación numérica en una cadena de caracteres de estrellas.
 * @param {number} numero La puntuación a convertir (ej. 3).
 * @param {number} [maximo=5] El número máximo de estrellas.
 * @returns {string} Una cadena de estrellas (ej. "★★★☆☆").
 */
function convertirNumeroAEstrellas(numero, maximo = 5) {
  if (typeof numero !== 'number' || isNaN(numero) || numero < 0) return '';
  return '★'.repeat(Math.min(numero, maximo)) + '☆'.repeat(Math.max(0, maximo - numero));
}