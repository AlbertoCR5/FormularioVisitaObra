/**
 * @file Configuration.gs
 * @description Centraliza toda la configuración y mapeo del script.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

/**
 * ===================================================================================
 * ⚙️ CONFIGURACIÓN CENTRAL
 * ===================================================================================
 */
const CONFIG = {
  FORM_ID: '1i3LC6D4cozcHe9mXeQ-9y7kO0wSmnxrh2mMDQadDE-g',
  TEMPLATE_DOC_ID: '1gK9pcJ_kOdCeXPcem0iJy8xLSdUdq9xiIaMcNQSlG-4',
  FOLDER_ID: '1V5q_RAjnsOknkFctaxQ4cg4kU1wMM8at',
  TIMEZONE: 'Europe/Madrid',
  DATE_FORMAT_FILENAME: 'yyyy-MM-dd',
  DATE_FORMAT_OPTIONS: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  LOCALE: 'es-ES'
};

/**
 * ===================================================================================
 * 🗺️ MAPA DE PREGUNTAS A PLACEHOLDERS
 * ===================================================================================
 * Define la correspondencia entre el título de una pregunta y su placeholder.
 */
const QUESTION_TO_PLACEHOLDER_MAP = {
  // --- DATOS GENERALES ---
  'Empresa Visitada': '{{empresaVisitada}}',
  'Dirección Obra': '{{direccionObra}}',
  'Provincia': '{{provincia}}',
  'Municipio': '{{municipio}}',
  'Código Postal': '{{codigoPostal}}',
  'Fecha Visita': '{{fechaVisita}}',
  'Hora Entrada': '{{horaEntrada}}',
  'Visitador Principal': '{{visitadorPrincipal}}',
  'Acompañantes': '{{acompanantes}}',
  'Tipología de la obra': '{{tipologiaObra}}',

  // --- GESTIÓN ---
  'Existe Coordinador de Seguridad y Salud en fase de ejecución': '{{existeCoordinadorSys}}',
  'La modalidad organizativa de la PRL en la empresa es': '{{modalidadPRL}}',
  'Se han designado Delegados/as de Prevención': '{{hayDelegadosPrevencion}}',
  'Se ha creado Comité de Seguridad y Salud': '{{hayComiteSys}}',
  'Hay medidas preventivas previstas frente a los riesgos derivados de la concurrencia de actividades': '{{medidasConcurrencia}}',
  
  // --- EMERGENCIAS ---
  'Están visibles el listado con los teléfonos de emergencia y las direcciones de los centros de asistencia (y el recorrido recomendable para acceder)': '{{telefonosEmergenciaVisibles}}',
  'Se dispone de medios de comunicación con cobertura suficiente': '{{comunicacionConCobertura}}',
  '¿Existe un botiquín en obra que esté completo, accesible y señalizado adecuadamente?': '{{disponeBotiquin}}',
  'El material de primeros auxilios se revisa periódicamente y se repone': '{{revisionBotiquin}}',
  'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)': '{{disponeLocalPrimerosAuxilios}}',
  'El local / material de primeros auxilios está señalizado': '{{senalizacionPrimerosAuxilios}}',
  'Se dispone de medios de extinción de incendios': '{{disponeMediosExtincion}}',
  'Sabe quiénes son las personas designadas para actuar en situaciones de emergencia': '{{conoceEquipoEmergencia}}',
  'Los encargados de emergencia disponen de la formación necesaria': '{{formacionEquipoEmergencia}}',
  'Están señalizadas las vías y salidas de emergencia': '{{senalizacionViasEvacuacion}}',
  'Existe un punto de reunión y está señalizado': '{{puntoReunionSenalizado}}',

  // --- CONDICIONES GENERALES ---
  'La obra en general, ¿está ordenada y limpia? (áreas de trabajo, zonas comunes, vías de circulación, etc.)': '{{ordenLimpiezaGeneral}}',
  '¿Existen zonas de acopio de material?': '{{existenZonasAcopio}}',
  '¿Las zonas de acopio están correctamente delimitadas y en orden?': '{{zonasAcopioDelimitadas}}',
  '¿Las vías de circulación de vehículos y peatones son adecuadas?': '{{viasCirculacionAdecuadas}}',
  'Se dispone de iluminación suficiente en pasillos, vías de circulación y zonas de trabajo': '{{iluminacionSuficiente}}',
  '¿Existe vallado exterior y se encuentra en buen estado?': '{{valladoExteriorCorrecto}}',
  '¿Los tajos están balizados?': '{{tajosBalizados}}',
  '¿Existe señalización general de Seguridad y Salud?': '{{senalizacionGeneralSys}}',
  '¿Existen señales para riesgos específicos en el lugar de trabajo concreto?': '{{senalizacionRiesgosEspecificos}}',
  '¿Se dispone de instalaciones de higiene y bienestar y Cumplen con lo establecido en el Convenio General del sector de la construcción?': '{{instalacionesHigieneCumplen}}',

  // --- INSTALACIÓN ELÉCTRICA ---
  '¿Existe una instalación eléctrica?': '{{existeInstalacionElectrica}}',
  'Ubicación de los cuadros o del generador': '{{ubicacionCuadros}}',
  '¿Se dispone de toma de tierra?': '{{disponeTomaTierra}}',
  '¿Las conexiones son adecuadas?': '{{conexionesAdecuadas}}',
  '¿Se dispone de extintor de CO2?': '{{disponeExtintorCO2}}',
  '¿La ubicación de extintores es adecuada?': '{{ubicacionExtintoresAdecuada}}',
  'Tendido de cables': '{{tendidoCables}}',
  'Estado de las mangueras y las conexiones': '{{estadoManguerasConexiones}}',
  '¿Existen líneas de Alta Tensión en las proximidades?': '{{hayLineasAltaTension}}',
  '¿Las líneas de alta tensión están bien identificadas?': '{{lineasAltaTensionIdentificadas}}',

  // --- EQUIPOS, MEDIOS Y PROTECCIONES ---
  '¿Equipos de trabajo que utiliza la empresa?': '{{equiposTrabajoUtilizados}}',
  'En general, ¿los equipos de trabajo que utiliza la empresa en la obra están en buenas condiciones?': '{{estadoEquiposTrabajo}}',
  '¿Maquinaria de elevación que utiliza la empresa?': '{{maquinariaElevacionUtilizada}}',
  'En general, ¿la maquinaria de elevación que utiliza la empresa en la obra están en buenas condiciones?': '{{estadoMaquinariaElevacion}}',
  'Equipos de trabajo auxiliares que utilice la empresa en la obra': '{{equiposAuxiliaresUtilizados}}',
  'En general, ¿los equipos de trabajo auxiliares que utiliza la empresa en la obra están en buenas condiciones?': '{{estadoEquiposAuxiliares}}',
  '¿Medios de protección colectiva que afecten a la empresa?': '{{mediosProteccionColectiva}}',
  'En general, ¿los medios de protección que afecten a la empresa se encuentran en buenas condiciones?': '{{estadoMediosProteccionColectiva}}',
  '¿Redes que afecten a la empresa?': '{{redesSeguridad}}',
  'En general, ¿las redes que afectan a la empresa se encuentran en buenas condiciones?': '{{estadoRedesSeguridad}}',

  // --- EPIs ---
  '¿Equipos de Protección Individuales (EPI) necesarios según la actividad?': '{{episNecesarios}}',
  'En general, ¿los trabajadores hacen uso adecuado de los Equipos de Protección Individual (EPI)?': '{{usoAdecuadoEpis}}',
  'En general, ¿los Equipos de Protección Individual (EPI) se encuentran en buen estado de conservación y funcionamiento?': '{{estadoEpis}}',

  // --- RIESGOS HIGIÉNICOS Y ERGONÓMICOS ---
  'Se utilizan productos químicos por parte de la empresa visitada': '{{usaProductosQuimicos}}',
  '¿Se almacenan los productos químicos en lugares y condiciones adecuados?': '{{almacenamientoQuimicosAdecuado}}',
  '¿Están correctamente envasados y etiquetados los productos químicos?': '{{etiquetadoQuimicos}}',
  '¿Se planifica el trabajo teniendo en cuenta la meteorología (precipitaciones, viento, temperaturas extremas, etc.)?': '{{planificacionMeteorologia}}',
  'Se han previsto medidas para proteger a las personas trabajadoras de los factores atmosféricos': '{{medidasProteccionClima}}',
  'Las personas trabajadoras conocen los procedimientos de trabajo y pautas a seguir para prevenir los riesgos derivados de los factores atmosféricos': '{{conocimientoProcedimientosClima}}',
  'Se dispone de medios de señalización que alertan de los peligros y equipos de medición que advierten de la presencia de ciertos factores atmosféricos': '{{senalizacionPeligrosClima}}',
  'El trabajo realizado requiere:': '{{trabajoRequiereEsfuerzo}}',
  'En general, ¿cómo valorarías el equilibrio entre el esfuerzo físico requerido y la aplicación de medidas preventivas en el trabajo realizado?': '{{valoracionEquilibrioEsfuerzo}}',

  // --- OBSERVACIONES Y FINAL ---
  'Utiliza este espacio para añadir cualquier comentario, aclaración o información relevante que consideres importante sobre el trabajo realizado o las condiciones evaluadas.': '{{observacionesGenerales}}',
  'Adjuntar imágenes (1 a 10)': '{{adjuntarImagenes1a10}}',
  'Adjuntar imágenes (11 a 20)': '{{adjuntarImagenes11a20}}',
  'Adjuntar imágenes (21 a 30)': '{{adjuntarImagenes21a30}}',
  'Correo Adicional (Opcional):': '{{correoAdicional}}',
  'Hora Salida': '{{horaSalida}}'
};

// --- BUCLE DINÁMICO PARA EMPRESAS (1 a 20) ---
// Este bucle añade automáticamente los placeholders para las 20 empresas.
for (let i = 1; i <= 20; i++) {
  QUESTION_TO_PLACEHOLDER_MAP[`Nombre Empresa ${i}`] = `{{nombreEmpresa${i}}}`;
  QUESTION_TO_PLACEHOLDER_MAP[`CIF Empresa ${i}`] = `{{cifEmpresa${i}}}`;
  QUESTION_TO_PLACEHOLDER_MAP[`Persona Contacto Empresa ${i}`] = `{{contactoEmpresa${i}}}`;
  QUESTION_TO_PLACEHOLDER_MAP[`Cargo contacto Empresa ${i}`] = `{{cargoContactoEmpresa${i}}}`; // Nuevo campo
  QUESTION_TO_PLACEHOLDER_MAP[`Correo Electrónico Contacto Empresa ${i}`] = `{{emailEmpresa${i}}}`;
  QUESTION_TO_PLACEHOLDER_MAP[`La empresa ${i} interviene como`] = `{{intervencionEmpresa${i}}}`;
  QUESTION_TO_PLACEHOLDER_MAP[`Qué trabajos está ejecutando la empresa ${i}?`] = `{{trabajosEmpresa${i}}}`; // Título actualizado
  if (i < 20) {
    QUESTION_TO_PLACEHOLDER_MAP[`Añadir Empresa ${i + 1}`] = `{{anadirEmpresa${i + 1}}}`;
  }
}

/**
 * ===================================================================================
 * 🙈 MAPA DE VISIBILIDAD CONDICIONAL
 * ===================================================================================
 */
const CONDITIONAL_VISIBILITY_MAP = {
  '¿Existen zonas de acopio de material?': {
    negativeAnswers: ['No'],
    elementosAHide: [
      '¿Las zonas de acopio están correctamente delimitadas y en orden?',
      '{{zonasAcopioDelimitadas}}',
      '{{zonasAcopioDelimitadasConsejo}}'
    ]
  },
  '¿Existe una instalación eléctrica?': {
    negativeAnswers: ['No'],
    elementosAHide: [
      'Ubicación de los cuadros o del generador', '{{ubicacionCuadros}}', '{{ubicacionCuadrosConsejo}}',
      '¿Se dispone de toma de tierra?', '{{disponeTomaTierra}}', '{{disponeTomaTierraDescripcion}}',
      '¿Las conexiones son adecuadas?', '{{conexionesAdecuadas}}', '{{conexionesAdecuadasConsejo}}',
      '¿Se dispone de extintor de CO2?', '{{disponeExtintorCO2}}', '{{disponeExtintorCO2Descripcion}}',
      '¿La ubicación de extintores es adecuada?', '{{ubicacionExtintoresAdecuada}}', '{{ubicacionExtintoresAdecuadaConsejo}}',
      'Tendido de cables', '{{tendidoCables}}', '{{tendidoCablesConsejo}}',
      'Estado de las mangueras y las conexiones', '{{estadoManguerasConexiones}}', '{{estadoManguerasConexionesConsejo}}', 'EXISTENCIA INSTALACIÓN ELÉCTRICA'
    ]
  },
   '¿Las líneas de alta tensión están bien identificadas?': {
    negativeAnswers: ['No'],
    elementosAHide: [
      '¿Las líneas de alta tensión están bien identificadas?',
      '{{lineasAltaTensionIdentificadas}}',
      '{{lineasAltaTensionIdentificadasDescripcion}}', 'LÍNEAS DE ALTA TENSIÓN EN PROXIMIDADES'
    ]
  }
};
