/**
 * @file EmailConfig.gs
 * @description Centraliza la configuración para el envío de correos.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

const EMAIL_CONFIG = {
  // ⬇️ IMPORTANTE: Edita esta línea con el correo que siempre debe recibir el informe.
  RECIPIENT_ALWAYS: 'alberto.fica.sevilla@gmail.com', //, r.a@thorsl.com'
  
  // Opcional: puedes añadir más correos fijos aquí, separados por comas dentro de las comillas.
  // Ejemplo: 'correo1@ejemplo.com, correo2@ejemplo.com'
};

/**
 * ===================================================================================
 * 🗺️ MAPA DE VISITADORES A CORREOS ELECTRÓNICOS
 * ===================================================================================
 * Asocia el nombre de un visitador (tal como aparece en el formulario) con su
 * dirección de correo electrónico para el envío automático de informes.
 */
const VISITOR_EMAIL_MAP = {
  'Manuel Gil Ruiz': 'prl.ficaugtsevilla@gmail.com',
  'Manuel Ponce': 'manuelponce.mca@gmail.com',
  'Carlos Parra': 'organizacion.sevilla@fica.ugt.org'
  // Puedes añadir más visitadores aquí si es necesario.
};
