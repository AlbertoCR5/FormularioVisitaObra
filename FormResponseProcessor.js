/**
 * @file FormResponseProcessor.gs
 * @description Clase para procesar las respuestas del formulario de Google Forms
 * y preparar los datos para rellenar un documento de Google Docs.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */
class FormResponseProcessor {
  /**
   * Crea una instancia de FormResponseProcessor.
   * @param {GoogleAppsScript.Forms.ItemResponse[]} itemResponses - Un array de objetos de respuesta de items de un formulario.
   */
  constructor(itemResponses) {
    this.itemResponses = itemResponses;
  }

  /**
   * Procesa todas las respuestas del formulario para generar un objeto de datos consolidado.
   * Este método orquesta la extracción, formateo y consolidación de las respuestas,
   * incluyendo la determinación de la visibilidad de elementos, el manejo de respuestas
   * de tipo rating y la agrupación de datos de empresas.
   * @returns {object} Un objeto con todos los datos necesarios para generar el informe.
   * @property {Array<object>} datosParaRellenar - Array de objetos con 'placeholder' y 'respuesta' para el documento.
   * @property {Array<object>} ratingDataForStyling - Datos de las valoraciones para aplicar estilos.
   * @property {Array<object>} richDescriptionsToInsert - Descripciones detalladas para insertar.
   * @property {Array<Company>} datosEmpresas - Array de objetos de empresa con sus datos.
   * @property {Set<string>} elementosParaOcultar - Conjunto de textos a ocultar en el informe.
   * @property {Date|null} fechaVisitaObj - El objeto Date de la visita.
   * @property {string[]} correosVisitadores - Array de correos electrónicos de los visitadores.
   * @property {string[]} correosIndividuales - Array de correos electrónicos adicionales para el envío.
   * @property {string} nombreEmpresaPrincipal - El nombre de la empresa principal.
   * @property {object} imageResponses - Objeto con los IDs de las imágenes agrupados por pregunta.
   * @property {string} disponeLocalRespuesta - La respuesta a la pregunta sobre el local de primeros auxilios.
   */
  process() {
    const t0 = Date.now();
    const elementosParaOcultar = this._determinarElementosOcultos();
    const tAfterHidden = Date.now();

    // Optimización: construir un mapa título -> itemResponse para accesos O(1)
    const titleToItem = new Map();
    this.itemResponses.forEach(ir => {
      try {
        const it = ir.getItem();
        const t = it && it.getTitle ? it.getTitle() : undefined;
        if (t) titleToItem.set(t, ir);
      } catch (e) { /* ignorar elementos problemáticos */ }
    });
    const tAfterIndex = Date.now();

    const datosParaRellenar = [];
    const ratingDataForStyling = [];
    const richDescriptionsToInsert = [];
    const imageResponses = {};
    let fechaVisitaObj = null;
    const correosVisitadores = new Set();
    const correosIndividuales = new Set();
    let nombreEmpresaPrincipal = '';
    let disponeLocalRespuesta = '';

  const { empresas: datosEmpresas, titulosProcesados } = this._agruparDatosEmpresas(titleToItem);

    datosEmpresas.forEach(empresa => {
      if (empresa.email) correosIndividuales.add(empresa.email.trim().toLowerCase());
    });

    const extraerCorreosDeTexto = (texto) => {
      if (!texto || typeof texto !== 'string') return [];
      return texto.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/gi) || [];
    };
    
    // Conjunto para rastrear los placeholders que ya han sido procesados.
    const processedPlaceholders = new Set();

    this.itemResponses.forEach(itemResponse => {
      const item = itemResponse.getItem();
      const titulo = item.getTitle();
      const tipo = item.getType();
      const placeholderOriginal = QUESTION_TO_PLACEHOLDER_MAP[titulo];
      let respuesta = itemResponse.getResponse();

      if (titulo === 'Empresa Visitada') {
        nombreEmpresaPrincipal = String(respuesta);
      }

      if (titulo === 'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)') {
        disponeLocalRespuesta = String(respuesta);
      }

      if (titulo === 'Visitador Principal' && Array.isArray(respuesta)) {
        respuesta.forEach(nombreVisitador => {
          const email = VISITOR_EMAIL_MAP[nombreVisitador.trim()];
          if (email) {
            correosVisitadores.add(email.toLowerCase());
          }
        });
      }

      if (titulo === 'Acompañantes' || titulo === 'Correo Adicional (Opcional):') {
        const emails = extraerCorreosDeTexto(String(respuesta));
        emails.forEach(email => correosIndividuales.add(email.trim().toLowerCase()));
      }

      if (tipo === FormApp.ItemType.FILE_UPLOAD && respuesta && respuesta.length > 0) {
        if (!imageResponses[titulo]) {
          imageResponses[titulo] = [];
        }
        imageResponses[titulo].push(...respuesta);
        return;
      }

      if (titulosProcesados.has(titulo) || titulo.startsWith('Añadir Empresa') || elementosParaOcultar.has(titulo) || elementosParaOcultar.has(placeholderOriginal)) {
        return;
      }

      // Si la pregunta no tiene un placeholder mapeado, la ignoramos.
      if (!placeholderOriginal) {
        return;
      }

      // Añadimos el placeholder al conjunto de procesados.
      processedPlaceholders.add(placeholderOriginal);

      const respuestaOriginalString = Array.isArray(respuesta) ? respuesta.join(', ') : String(respuesta);

      if (CONDITIONAL_DESCRIPTIONS[titulo]) {
        const rules = CONDITIONAL_DESCRIPTIONS[titulo];
        const baseName = placeholderOriginal.slice(2, -2);
        const placeholderDescription = `{{${baseName}Descripcion}}`;
        processedPlaceholders.add(placeholderDescription);
        if (rules.conditions.includes(respuestaOriginalString.trim())) {
          richDescriptionsToInsert.push({ placeholder: placeholderDescription, summary: rules.summary, link: rules.link });
        } else {
          datosParaRellenar.push({ placeholder: placeholderDescription, respuesta: '' });
        }
      }

      if ((tipo === FormApp.ItemType.RATING || tipo === FormApp.ItemType.SCALE)) {
        const puntuacionNumerica = parseInt(respuesta, 10);
        const baseName = placeholderOriginal.slice(2, -2);
        const placeholderConsejo = `{{${baseName}Consejo}}`;
        processedPlaceholders.add(placeholderConsejo);
        let consejoText = '';
        if (!isNaN(puntuacionNumerica)) {
          if (RESPUESTAS_ESPECIFICAS[titulo] && RESPUESTAS_ESPECIFICAS[titulo][puntuacionNumerica]) {
            consejoText = RESPUESTAS_ESPECIFICAS[titulo][puntuacionNumerica];
          }
          ratingDataForStyling.push({ score: puntuacionNumerica, starString: convertirNumeroAEstrellas(puntuacionNumerica), titulo: titulo });
        }
        datosParaRellenar.push({ placeholder: placeholderConsejo, respuesta: consejoText });
        if (!isNaN(puntuacionNumerica)) {
          datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: convertirNumeroAEstrellas(puntuacionNumerica) });
        } else {
          datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: '' });
        }
      }
      else if (titulo === '¿Equipos de Protección Individuales (EPI) necesarios según la actividad?') {
        // --- BLOQUE CORREGIDO PARA EPIs ---
        // Se corrige el título para que coincida con Configuration.js y se mejora la lógica de procesamiento.
        let epiList = [];
        if (Array.isArray(respuesta)) {
          // Procesa respuestas de tipo CHECKBOX
          epiList = respuesta;
        } else if (respuesta && typeof respuesta === 'string') {
          // Procesa respuestas de tipo TEXT o PARAGRAPH_TEXT
          // Divide por comas o espacios, ignorando entradas vacías.
          epiList = respuesta.split(/[, ]+/);
        }
        
        // Filtra, formatea y une la lista final.
        const formattedEpi = epiList
          .map(epi => epi.trim()) // Quita espacios extra
          .filter(Boolean) // Elimina cualquier cadena vacía resultante
          .map(epi => `➤ ${epi}`) // Añade el prefijo
          .join('\n'); // Une con saltos de línea

        datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: formattedEpi || ' ' });
      }
      else if (Array.isArray(respuesta)) {
        if (titulo === 'Visitador Principal' || titulo === '¿Existen señales para riesgos específicos en el lugar de trabajo concreto?') {
          respuesta = respuesta.join(', ');
        } else {
          respuesta = respuesta.filter(op => op && op.trim() !== '').map(opcion => `➤ ${opcion.trim()}`).join('\n');
        }
        datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: String(respuesta || ' ') });
      } else {
        datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: String(respuesta || ' ') });
      }

      if (titulo === 'Fecha Visita' && respuesta) {
        fechaVisitaObj = new Date(itemResponse.getResponse());
        // Se usa la nueva constante para el formato de fecha del informe.
        respuesta = Utilities.formatDate(fechaVisitaObj, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT_REPORT);
      }
      if (titulo === 'Acompañantes' && respuesta) {
        respuesta = String(respuesta).replace(/\s*,\s*\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '').trim();
      }
    });

    // Segunda pasada: Reemplaza todos los placeholders restantes con un espacio en blanco.
    // Esto asegura que no queden textos inesperados en el documento.
    Object.values(QUESTION_TO_PLACEHOLDER_MAP).forEach(placeholder => {
      if (!processedPlaceholders.has(placeholder) && !elementosParaOcultar.has(placeholder)) {
        datosParaRellenar.push({ placeholder: placeholder, respuesta: ' ' });
      }
    });
    const tAfterFill = Date.now();
    
    Logger.log(`✅ Respuestas procesadas y formateadas. Timing(ms): ocultos=${tAfterHidden - t0}, indexado=${tAfterIndex - tAfterHidden}, loop=${tAfterFill - tAfterIndex}, total=${tAfterFill - t0}`);

    return {
      datosParaRellenar, ratingDataForStyling, richDescriptionsToInsert,
      datosEmpresas, elementosParaOcultar, fechaVisitaObj,
      correosVisitadores: [...correosVisitadores],
      correosIndividuales: [...correosIndividuales],
      nombreEmpresaPrincipal: nombreEmpresaPrincipal || 'Sin Nombre',
      imageResponses: imageResponses,
      disponeLocalRespuesta
    };
  }

  /**
   * Determina los elementos a ocultar basándose en las respuestas negativas o de tipo "No".
   * @returns {Set<string>} Un conjunto de títulos y placeholders de elementos a ocultar.
   * @private
   */
  _determinarElementosOcultos() {
    const elementosParaOcultar = new Set();
    this.itemResponses.forEach(itemResponse => {
      const titulo = itemResponse.getItem().getTitle();
      const respuesta = itemResponse.getResponse();
      const regla = CONDITIONAL_VISIBILITY_MAP[titulo];
      if (regla && regla.negativeAnswers.includes(String(respuesta).trim())) {
        regla.elementosAHide.forEach(el => elementosParaOcultar.add(el));
      }
    });
    return elementosParaOcultar;
  }

  /**
   * Agrupa los datos de las empresas secundarias a partir de las respuestas del formulario.
   * @returns {{empresas: Company[], titulosProcesados: Set<string>}} Un objeto con el array de empresas y los títulos procesados.
   * @private
   */
  _agruparDatosEmpresas(titleToItem) {
    const empresas = [];
    const titulosProcesados = new Set();
    for (let i = 1; i <= 20; i++) {
      const nombreTitle = `Nombre Empresa ${i}`;
      const nombreResponse = titleToItem.get(nombreTitle);
      if (nombreResponse) {
        const nombreValue = nombreResponse.getResponse();
        if (!nombreValue) { continue; }
        const empresa = new Company();
        empresa.nombre = nombreValue;
        titulosProcesados.add(nombreTitle);

        const cifTitle = `CIF Empresa ${i}`;
        const cifResponse = titleToItem.get(cifTitle);
        if (cifResponse && cifResponse.getResponse()) empresa.cif = cifResponse.getResponse();
        titulosProcesados.add(cifTitle);

        const contactoTitle = `Persona Contacto Empresa ${i}`;
        const contactoResponse = titleToItem.get(contactoTitle);
        if (contactoResponse && contactoResponse.getResponse()) empresa.personaDeContacto = contactoResponse.getResponse();
        titulosProcesados.add(contactoTitle);

        const cargoTitle = `Cargo contacto Empresa ${i}`;
        const cargoResponse = titleToItem.get(cargoTitle);
        if (cargoResponse && cargoResponse.getResponse()) empresa.cargo = cargoResponse.getResponse();
        titulosProcesados.add(cargoTitle);

        const emailTitle = `Correo Electrónico Contacto Empresa ${i}`;
        const emailResponse = titleToItem.get(emailTitle);
        if (emailResponse && emailResponse.getResponse()) empresa.email = emailResponse.getResponse();
        titulosProcesados.add(emailTitle);

        const intervencionTitle = `La empresa ${i} interviene como`;
        const intervencionResponse = titleToItem.get(intervencionTitle);
        if (intervencionResponse && intervencionResponse.getResponse()) empresa.intervieneComo = intervencionResponse.getResponse();
        titulosProcesados.add(intervencionTitle);

        const trabajosTitle = `Qué trabajos está ejecutando la empresa ${i}?`;
        const trabajosResponse = titleToItem.get(trabajosTitle);
        if (trabajosResponse) {
          const trabajosValue = trabajosResponse.getResponse();
          if (Array.isArray(trabajosValue) && trabajosValue.length > 0) {
            empresa.trabajosQueEjecuta = trabajosValue.map(trabajo => `➤ ${trabajo.trim()}`).join('\n');
          }
        }
        titulosProcesados.add(trabajosTitle);
        empresas.push(empresa);
      }
    }
    return { empresas, titulosProcesados };
  }
}