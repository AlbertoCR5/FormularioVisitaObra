/**
 * @file FormResponseProcessor.gs
 * @description Clase para procesar las respuestas del formulario.
 * @version 1.0.0
 * @author Gemini
 */
class FormResponseProcessor {
  /**
   * @param {GoogleAppsScript.Forms.ItemResponse[]} itemResponses
   */
  constructor(itemResponses) {
    this.itemResponses = itemResponses;
  }

  /**
   * Procesa las respuestas del formulario.
   * @returns {object}
   */
  process() {
    const elementosParaOcultar = this._determinarElementosOcultos();
    
    const datosParaRellenar = [];
    const ratingDataForStyling = [];
    const richDescriptionsToInsert = [];
    const imageResponses = {}; // Objeto para almacenar IDs por pregunta
    let fechaVisitaObj = null;
    const correosVisitadores = new Set();
    const correosIndividuales = new Set();
    let nombreEmpresaPrincipal = '';
    let disponeLocalRespuesta = '';

    const { empresas: datosEmpresas, titulosProcesados } = this._agruparDatosEmpresas();

    datosEmpresas.forEach(empresa => {
      if (empresa.email) correosIndividuales.add(empresa.email.trim().toLowerCase());
    });

    const extraerCorreosDeTexto = (texto) => {
      if (!texto || typeof texto !== 'string') return [];
      return texto.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/gi) || [];
    };

    this.itemResponses.forEach(itemResponse => {
      const item = itemResponse.getItem();
      const titulo = item.getTitle();
      const tipo = item.getType();
      const placeholderOriginal = QUESTION_TO_PLACEHOLDER_MAP[titulo];
      let respuesta = itemResponse.getResponse();

      if (titulo === 'Empresa Visitada') nombreEmpresaPrincipal = String(respuesta);
      
      if (titulo === 'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)') {
        disponeLocalRespuesta = String(respuesta);
      }

      if (titulo === 'Visitador Principal' && Array.isArray(respuesta)) {
          respuesta.forEach(nombreVisitador => {
              const email = VISITOR_EMAIL_MAP[nombreVisitador.trim()];
              if (email) correosVisitadores.add(email.toLowerCase());
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

      if (!placeholderOriginal) return;

      const respuestaOriginalString = Array.isArray(respuesta) ? respuesta.join(', ') : String(respuesta);

      if (CONDITIONAL_DESCRIPTIONS[titulo]) {
        const rules = CONDITIONAL_DESCRIPTIONS[titulo];
        const baseName = placeholderOriginal.slice(2, -2);
        const placeholderDescription = `{{${baseName}Descripcion}}`;

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
      else if (titulo === 'Equipos de Protección Individuales (EPI) necesarios según la actividad' && typeof respuesta === 'string') {
          respuesta = respuesta.split(/, |,| /).map(epi => epi.trim()).filter(epi => epi).map(epi => `➤ ${epi}`).join('\n');
          datosParaRellenar.push({ placeholder: placeholderOriginal, respuesta: String(respuesta || ' ') });
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
        respuesta = fechaVisitaObj.toLocaleDateString(CONFIG.LOCALE, CONFIG.DATE_FORMAT_OPTIONS).replace(/^\w/, c => c.toUpperCase());
      }
      if (titulo === 'Acompañantes' && respuesta) {
        respuesta = String(respuesta).replace(/\s*,\s*\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '').trim();
      }
    });

    Logger.log('✅ Respuestas procesadas y formateadas.');
    
    return { 
        datosParaRellenar, ratingDataForStyling, richDescriptionsToInsert, 
        datosEmpresas, elementosParaOcultar, fechaVisitaObj, 
        correosVisitadores: [...correosVisitadores],
        correosIndividuales: [...correosIndividuales],
        nombreEmpresaPrincipal: nombreEmpresaPrincipal || 'Sin Nombre',
        imageResponses: imageResponses, // Devolver el objeto con las respuestas de imágenes
        disponeLocalRespuesta
    };
  }

  /**
   * Determina los elementos a ocultar.
   * @returns {Set<string>}
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
   * Agrupa los datos de las empresas.
   * @returns {{empresas: Company[], titulosProcesados: Set<string>}}
   * @private
   */
  _agruparDatosEmpresas() {
    const empresas = [];
    const titulosProcesados = new Set();
    for (let i = 1; i <= 20; i++) {
        const nombreTitle = `Nombre Empresa ${i}`;
        const nombreResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === nombreTitle);
        if (nombreResponse && nombreResponse.getResponse()) {
            const empresa = new Company();
            empresa.nombre = nombreResponse.getResponse();
            titulosProcesados.add(nombreTitle);

            const cifTitle = `CIF Empresa ${i}`;
            const cifResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === cifTitle);
            if (cifResponse && cifResponse.getResponse()) empresa.cif = cifResponse.getResponse();
            titulosProcesados.add(cifTitle);

            const contactoTitle = `Persona Contacto Empresa ${i}`;
            const contactoResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === contactoTitle);
            if (contactoResponse && contactoResponse.getResponse()) empresa.personaDeContacto = contactoResponse.getResponse();
            titulosProcesados.add(contactoTitle);

            const cargoTitle = `Cargo contacto Empresa ${i}`;
            const cargoResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === cargoTitle);
            if (cargoResponse && cargoResponse.getResponse()) empresa.cargo = cargoResponse.getResponse();
            titulosProcesados.add(cargoTitle);

            const emailTitle = `Correo Electrónico Contacto Empresa ${i}`;
            const emailResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === emailTitle);
            if (emailResponse && emailResponse.getResponse()) empresa.email = emailResponse.getResponse();
            titulosProcesados.add(emailTitle);

            const intervencionTitle = `La empresa ${i} interviene como`;
            const intervencionResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === intervencionTitle);
            if(intervencionResponse && intervencionResponse.getResponse()) empresa.intervieneComo = intervencionResponse.getResponse();
            titulosProcesados.add(intervencionTitle);

            const trabajosTitle = `Qué trabajos está ejecutando la empresa ${i}?`;
            const trabajosResponse = this.itemResponses.find(ir => ir.getItem().getTitle() === trabajosTitle);
            if(trabajosResponse && trabajosResponse.getResponse().length > 0) {
                empresa.trabajosQueEjecuta = trabajosResponse.getResponse().map(trabajo => `➤ ${trabajo.trim()}`).join('\n');
            }
            titulosProcesados.add(trabajosTitle);
            empresas.push(empresa);
        }
    }
    return { empresas, titulosProcesados };
  }
}
