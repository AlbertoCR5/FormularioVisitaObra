/**
 * @file Main.gs
 * @fileoverview Script para generar informes de visitas a obras desde Google Forms
 * usando una plantilla de Google Docs y un mapa de placeholders centralizado.
 *
 * @version 10.0.0
 * @author Alberto Castro (Refactorizado por Gemini)
 */

/**
 * ===================================================================================
 * 🚀 FUNCIÓN PRINCIPAL ORQUESTADORA
 * ===================================================================================
 */
function alEnviarFormulario(e) {
  const reportGenerator = new ReportGenerator(e);
  reportGenerator.generate();
}
