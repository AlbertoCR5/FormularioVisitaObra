/**
 * @file ReportGenerator.gs
 * @description Clase para generar el informe de visita a obra.
 * @version 1.0.0
 * @author Gemini
 */
class ReportGenerator {
  /**
   * @param {object} e El objeto de evento de Google Forms.
   */
  constructor(e) {
    this.e = e;
    this.reportData = null;
  }

  /**
   * Orquesta la generación del informe.
   */
  generate() {
    try {
      Logger.log('🚀 Iniciando proceso de generación de informe v10.0.0...');
      
      // FASE 1: Procesar todas las respuestas.
      const formResponseProcessor = new FormResponseProcessor(this.e.response.getItemResponses());
      this.reportData = formResponseProcessor.process();

      // FASE 2: Crear el documento.
      const { doc, body } = this._crearDocumentoDesdePlantilla();
      
      // FASE 3: Rellenar contenido de texto y datos.
      this._rellenarContenido(doc, body);
      
      // FASE 4: Insertar las imágenes adjuntas.
      const imageProcessor = new ImageProcessor(body, this.reportData.imageFileIds);
      imageProcessor.insertImages();

      // FASE 5: Aplicar estilos finales.
      this._aplicarEstilosFinales(body);

      // FASE 6: Guardar y cerrar.
      doc.saveAndClose();
      Logger.log(`✅ Informe completado correctamente: ${doc.getUrl()}`);

      // FASE 7: Enviar por correo.
      const emailSender = new EmailSender(doc, this.reportData);
      emailSender.send();

    } catch (error) {
      Logger.log(`❌ ERROR en ReportGenerator.generate: ${error.toString()}\n${error.stack}`);
    }
  }

  /**
   * Crea un documento a partir de la plantilla.
   * @returns {{doc: GoogleAppsScript.Document.Document, body: GoogleAppsScript.Document.Body}}
   * @private
   */
  _crearDocumentoDesdePlantilla() {
    const fechaFormateadaNombreArchivo = Utilities.formatDate(this.reportData.fechaVisitaObj || new Date(), CONFIG.TIMEZONE, CONFIG.DATE_FORMAT_FILENAME);
    const nuevoNombreDoc = `Informe Visita - ${this.reportData.nombreEmpresaPrincipal} - ${fechaFormateadaNombreArchivo}`;

    const carpetaDestino = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const archivoPlantilla = DriveApp.getFileById(CONFIG.TEMPLATE_DOC_ID);
    const nuevoArchivo = archivoPlantilla.makeCopy(nuevoNombreDoc, carpetaDestino);
    Logger.log(`📄 Documento creado: "${nuevoNombreDoc}"`);

    const doc = DocumentApp.openById(nuevoArchivo.getId());
    const body = doc.getBody();
    return { doc, body };
  }

  /**
   * Rellena el contenido del documento.
   * @param {GoogleAppsScript.Document.Document} doc El objeto del documento.
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @private
   */
  _rellenarContenido(doc, body) {
    const bookmarks = this._insertarBloqueEmpresas(doc, body, this.reportData.datosEmpresas);
    this._insertarListaEmpresasConEnlaces(body, this.reportData.datosEmpresas, bookmarks);

    this.reportData.datosParaRellenar.forEach(dato => {
      if (dato.placeholder) body.replaceText(dato.placeholder, dato.respuesta);
    });
    
    this._insertarDescripcionesConEnlace(body, this.reportData.richDescriptionsToInsert);
    this._ocultarElementosCondicionales(body, this.reportData.elementosParaOcultar);
    Logger.log('✅ Contenido de texto insertado en el documento.');
  }

  /**
   * Aplica los estilos finales al documento.
   * @param {GoogleAppsScript.Document.Body} body El cuerpo del documento.
   * @private
   */
  _aplicarEstilosFinales(body) {
    aplicarEstilosFinales(body, this.reportData);
  }

  /**
   * Inserta el bloque de empresas en el documento.
   * @param {GoogleAppsScript.Document.Document} doc
   * @param {GoogleAppsScript.Document.Body} body
   * @param {Company[]} datosEmpresas
   * @returns {object}
   * @private
   */
  _insertarBloqueEmpresas(doc, body, datosEmpresas) {
    const bookmarks = {};
    const placeholderRange = body.findText('{{datosEmpresasVisitadas}}');
    if (!placeholderRange) {
        Logger.log('⚠️ No se encontró {{datosEmpresasVisitadas}}.');
        return bookmarks;
    }
    const placeholderParagraph = placeholderRange.getElement().getParent().asParagraph();
    let insertionIndex = body.getChildIndex(placeholderParagraph);
    placeholderParagraph.removeFromParent();
    
    const nameStyle = { [DocumentApp.Attribute.FONT_SIZE]: 15, [DocumentApp.Attribute.BOLD]: true };
    const labelStyle = { [DocumentApp.Attribute.FONT_SIZE]: 12, [DocumentApp.Attribute.BOLD]: false };
    const valueStyle = { [DocumentApp.Attribute.FONT_SIZE]: 12, [DocumentApp.Attribute.BOLD]: true };

    datosEmpresas.forEach((empresa, index) => {
        const nameParagraph = body.insertParagraph(insertionIndex++, empresa.nombre);
        nameParagraph.setAttributes(nameStyle);

        const position = doc.newPosition(nameParagraph.asText(), 0);
        bookmarks[empresa.nombre] = doc.addBookmark(position).getId();

        for (const [key, value] of Object.entries(empresa)) {
            if (key !== 'nombre' && key !== 'email' && value) {
                if (key === 'trabajosQueEjecuta') {
                    body.insertParagraph(insertionIndex++, 'Trabajos que ejecuta:').setAttributes(labelStyle);
                    body.insertParagraph(insertionIndex++, String(value)).setAttributes(valueStyle);
                } else {
                    const p = body.insertParagraph(insertionIndex++, '');
                    const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                    p.appendText(formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1) + ': ').setAttributes(labelStyle);
                    p.appendText(String(value)).setAttributes(valueStyle);
                }
            }
        }
        if (index < datosEmpresas.length - 1) {
            body.insertHorizontalRule(insertionIndex++);
        }
    });
    return bookmarks;
  }

  /**
   * Inserta la lista de empresas con enlaces.
   * @param {GoogleAppsScript.Document.Body} body
   * @param {Company[]} datosEmpresas
   * @param {object} bookmarks
   * @private
   */
  _insertarListaEmpresasConEnlaces(body, datosEmpresas, bookmarks) {
    const placeholderRange = body.findText('{{empresasPresentesLista}}');
    if (!placeholderRange) return;
    const placeholderParagraph = placeholderRange.getElement().getParent().asParagraph();
    placeholderParagraph.clear();

    datosEmpresas.forEach((empresa, index) => {
        const textToAppend = (index === datosEmpresas.length - 1) ? empresa.nombre : empresa.nombre + '\n';
        const bookmarkId = bookmarks[empresa.nombre];
        if (bookmarkId) {
            placeholderParagraph.appendText(textToAppend).setLinkUrl('#bookmark=' + bookmarkId);
        } else {
            placeholderParagraph.appendText(textToAppend);
        }
    });
  }

  /**
   * Inserta las descripciones con enlace.
   * @param {GoogleAppsScript.Document.Body} body
   * @param {object[]} richDescriptions
   * @private
   */
  _insertarDescripcionesConEnlace(body, richDescriptions) {
    const ATENTION_STYLE = { BOLD: true, FOREGROUND_COLOR: '#D32F2F' };
    const baseStyle = { [DocumentApp.Attribute.FONT_SIZE]: 9, [DocumentApp.Attribute.ITALIC]: true };

    richDescriptions.forEach(desc => {
      const tempMarker = `###DESC_MARKER_${Math.random()}###`;
      body.replaceText(desc.placeholder, `\n${tempMarker}`);
      const rangeElement = body.findText(tempMarker);
      if (rangeElement) {
        const paragraph = rangeElement.getElement().getParent();
        paragraph.replaceText(tempMarker, '');
        paragraph.appendText('⚠️ ATENCIÓN: ').setAttributes(ATENTION_STYLE);
        paragraph.appendText(desc.summary + ' ').setAttributes(baseStyle);
        paragraph.appendText(desc.link.text).setLinkUrl(desc.link.url).setAttributes(baseStyle);
      }
    });
  }

  /**
   * Oculta los elementos condicionales.
   * @param {GoogleAppsScript.Document.Body} body
   * @param {Set<string>} elementosParaOcultar
   * @private
   */
  _ocultarElementosCondicionales(body, elementosParaOcultar) {
    if (elementosParaOcultar.size === 0) return;
    elementosParaOcultar.forEach(textoAEncontrar => {
      let element = body.findText(textoAEncontrar);
      while (element !== null) {
        const paragraph = element.getElement().getParent();
        if (paragraph.getType() === DocumentApp.ElementType.PARAGRAPH) {
          try { paragraph.removeFromParent(); } catch (e) { /* Ya fue eliminado */ }
        }
        element = body.findText(textoAEncontrar, element);
      }
    });
  }
}
