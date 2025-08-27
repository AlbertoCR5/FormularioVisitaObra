/**
 * @file Styling.gs
 * @description Centraliza la configuración y las funciones de estilo para el informe.
 * @version 2.0.0 (Funciones de estilo añadidas)
 * @author Alberto Castro (Refactorizado por Gemini)
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
        styleRatingConsejo(body, consejoText, color);
      }
      styleTextInBody(body, data.starString, color, 15, true, false);
    }
  });
  Logger.log('🎨 Se ha aplicado el formato a los consejos de valoración y a las estrellas.');
}


/**
 * Aplica estilo a los consejos de valoración basados en una palabra clave (ej. "CRÍTICO").
 * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
 * @param {string} textToFind El texto a buscar.
 * @param {string} color El código de color a aplicar.
 */
function styleRatingConsejo(body, textToFind, color) {
  let searchResult = body.findText(textToFind);
  while (searchResult !== null) {
    const thisElement = searchResult.getElement().asText();
    const startIndex = searchResult.getStartOffset();
    const endIndex = searchResult.getEndOffsetInclusive();
    
    const keyword = textToFind.split(':')[0];
    const keywordEndIndex = startIndex + keyword.length;

    thisElement.setBold(startIndex, keywordEndIndex, true);
    thisElement.setForegroundColor(startIndex, keywordEndIndex, color);
    thisElement.setItalic(startIndex, keywordEndIndex, false);
    thisElement.setFontSize(startIndex, keywordEndIndex, 12);

    const descriptionStartIndex = keywordEndIndex + 2;
    if (descriptionStartIndex <= endIndex) {
      thisElement.setBold(descriptionStartIndex, endIndex, false);
      thisElement.setForegroundColor(descriptionStartIndex, endIndex, '#000000');
      thisElement.setItalic(descriptionStartIndex, endIndex, true);
      thisElement.setFontSize(descriptionStartIndex, endIndex, 12);
    }
    
    searchResult = body.findText(textToFind, searchResult);
  }
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
