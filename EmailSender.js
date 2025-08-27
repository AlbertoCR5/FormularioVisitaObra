/**
 * @file EmailSender.gs
 * @description Clase para enviar el informe por correo electrónico.
 * @version 1.0.0
 * @author Gemini
 */
class EmailSender {
  /**
   * @param {GoogleAppsScript.Document.Document} doc El objeto del documento del informe.
   * @param {object} reportData Los datos del informe.
   */
  constructor(doc, reportData) {
    this.doc = doc;
    this.reportData = reportData;
  }

  /**
   * Envía el informe por correo electrónico.
   */
  send() {
    try {
      const horaActual = new Date().getHours();
      const saludo = horaActual < 12 ? 'Buenos días' : 'Buenas tardes';
      const asunto = `Informe de Visita a Obra: ${this.reportData.nombreEmpresaPrincipal}`;
      const cuerpoHtml = `
        <p>${saludo},</p>
        <br>
        <p>Adjunto se remite el informe en formato PDF correspondiente a la última visita realizada a la obra.</p>
        <br>
        <p>Saludos cordiales,</p>
        <br>
        <p><strong>Alberto Castro</strong><br>UGT</p>
      `;
      const adjuntoPdf = this.doc.getAs('application/pdf').setName(this.doc.getName() + '.pdf');

      const destinatariosVisitadores = new Set(this.reportData.correosVisitadores.filter(Boolean));
      if (EMAIL_CONFIG.RECIPIENT_ALWAYS) {
          const correosFijos = EMAIL_CONFIG.RECIPIENT_ALWAYS.split(',').map(email => email.trim());
          correosFijos.forEach(email => destinatariosVisitadores.add(email));
      }

      if (destinatariosVisitadores.size > 0) {
        const destinatariosArray = [...destinatariosVisitadores];
        MailApp.sendEmail({
          to: destinatariosArray.join(','),
          subject: asunto,
          htmlBody: cuerpoHtml,
          attachments: [adjuntoPdf]
        });
        Logger.log(`📧 Correo de grupo enviado correctamente a (Para): ${destinatariosArray.join(', ')}`);
      } else {
        Logger.log('🤷 No se encontraron correos de visitadores para el envío en grupo.');
      }

      const destinatariosIndividuales = new Set(this.reportData.correosIndividuales.filter(Boolean));
      
      destinatariosVisitadores.forEach(email => destinatariosIndividuales.delete(email));

      if (destinatariosIndividuales.size > 0) {
        Logger.log(`📧 Iniciando bucle de envío individual para ${destinatariosIndividuales.size} destinatarios.`);
        destinatariosIndividuales.forEach(destinatario => {
          try {
            MailApp.sendEmail({
              to: destinatario,
              subject: asunto,
              htmlBody: cuerpoHtml,
              attachments: [adjuntoPdf]
            });
            Logger.log(`   -> Correo individual enviado correctamente a: ${destinatario}`);
          } catch (e) {
            Logger.log(`   -> ❌ ERROR al enviar correo individual a ${destinatario}: ${e.toString()}`);
          }
        });
      } else {
         Logger.log('🤷 No se encontraron correos para el envío individual.');
      }

    } catch (error) {
      Logger.log(`❌ ERROR al enviar el correo: ${error.toString()}\n${error.stack}`);
    }
  }
}
