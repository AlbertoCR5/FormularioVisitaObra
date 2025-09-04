/**
 * @file ConditionalDescriptions.gs
 * @description Este archivo contiene descripciones mejoradas con resúmenes claros y enlaces
 * directos a la normativa oficial para un mayor contexto y rigor.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

const CONDITIONAL_DESCRIPTIONS = {
  'Existe Coordinador de Seguridad y Salud en fase de ejecución': {
    conditions: ['No', 'No procede'],
    summary: 'La designación de un Coordinador de Seguridad y Salud es obligatoria cuando en la obra interviene más de una empresa o autónomos. Su ausencia supone un incumplimiento grave que afecta a la gestión preventiva global.',
    link: {
      text: 'Referencia legal: RD 1627/1997, art. 3 y 9.',
      url: 'https://www.boe.es/eli/es/rd/1997/10/24/1627/con'
    }
  },
  'La modalidad organizativa de la PRL en la empresa es': {
    conditions: ['NS/NC'],
    summary: 'Toda empresa debe tener una modalidad de organización preventiva definida (Servicio de Prevención Propio/Ajeno, Trabajador Designado, etc.). Desconocerla indica una falta de integración de la prevención en la empresa.',
    link: {
      text: 'Referencia legal: Ley 31/1995, art. 30.',
      url: 'https://www.boe.es/eli/es/l/1995/11/08/31/con'
    }
  },
  'Se han designado Delegados/as de Prevención': {
    conditions: ['No', 'NS/NC'],
    summary: 'Los Delegados/as de Prevención son los representantes de los trabajadores en materia de PRL. Su ausencia o desconocimiento dificulta la participación y consulta de los trabajadores en la seguridad de la obra.',
    link: {
      text: 'Referencia legal: Ley 31/1995, art. 35.',
      url: 'https://www.boe.es/eli/es/l/1995/11/08/31/con'
    }
  },
  'Se ha creado Comité de Seguridad y Salud': {
    conditions: ['No', 'NS/NC'],
    summary: 'El Comité de Seguridad y Salud es un órgano de participación clave en empresas o centros de 50 o más trabajadores. Su inexistencia, si es obligatoria, es un incumplimiento grave.',
    link: {
      text: 'Referencia legal: Ley 31/1995, art. 38.',
      url: 'https://www.boe.es/eli/es/l/1995/11/08/31/con'
    }
  },
  'Hay medidas preventivas previstas frente a los riesgos derivados de la concurrencia de actividades': {
    conditions: ['No', 'NS/NC'],
    summary: 'La falta de coordinación de actividades aumenta significativamente el riesgo de accidentes. Es obligatorio establecer medios de coordinación para prevenir los riesgos derivados de la concurrencia de diferentes empresas en la obra.',
    link: {
      text: 'Referencia legal: RD 171/2004.',
      url: 'https://www.boe.es/eli/es/rd/2004/01/30/171'
    }
  },
  'Están visibles el listado con los teléfonos de emergencia y las direcciones de los centros de asistencia (y el recorrido recomendable para acceder)': {
    conditions: ['No', 'Algunos'],
    summary: 'La información de emergencia (teléfonos, dirección del centro médico más cercano) debe estar en un lugar visible para garantizar una respuesta rápida y eficaz en caso de accidente.',
    link: {
      text: 'Referencia: Guía Técnica INSST RD 1627/1997.',
      url: 'https://www.insst.es/documents/94886/789467/Gu%C3%ADa+t%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+de+los+riesgos+relativos+a+las+obras+de+construcci%C3%B3n.pdf'
    }
  },
  'Se dispone de medios de comunicación con cobertura suficiente': {
    conditions: ['No'],
    summary: 'En trabajos aislados o con mala cobertura, es fundamental asegurar un medio de comunicación fiable para poder alertar en caso de emergencia. La falta de este medio puede retrasar críticamente la asistencia.',
    link: {
      text: 'Referencia: Guía Técnica INSST RD 1627/1997.',
      url: 'https://www.insst.es/documents/94886/789467/Gu%C3%ADa+t%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+de+los+riesgos+relativos+a+las+obras+de+construcci%C3%B3n.pdf'
    }
  },
  'El material de primeros auxilios se revisa periódicamente y se repone': {
    conditions: ['No'],
    summary: 'Un botiquín no revisado puede contener material caducado o insuficiente. Es obligatorio asegurar su revisión y reposición periódica para que sea efectivo en caso de necesidad.',
    link: {
      text: 'Referencia legal: Anexo VI del RD 486/1997.',
      url: 'https://www.boe.es/eli/es/rd/1997/04/14/486/con'
    }
  },
  'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)': {
    conditions: ['No'],
    summary: 'En obras con 50 o más trabajadores (o cuando la autoridad laboral lo determine), es obligatorio disponer de un local de primeros auxilios debidamente equipado.',
    link: {
      text: 'Referencia legal: RD 1627/1997, Anexo VIdel RD 486/1997.',
      url: 'https://www.boe.es/eli/es/rd/1997/04/14/486/con'
    }
  },
  'El local / material de primeros auxilios está señalizado': {
    conditions: ['No'],
    summary: 'La señalización de los equipos y locales de primeros auxilios es crucial para su rápida localización en una emergencia. La falta de señalización puede suponer una pérdida de tiempo vital.',
    link: {
      text: 'Referencia legal: RD 485/1997, Anexo III.',
      url: 'https://www.boe.es/eli/es/rd/1997/04/14/485/con'
    }
  },
  'Se dispone de medios de extinción de incendios': {
    conditions: ['No'],
    summary: 'La obra debe contar con medios de extinción de incendios adecuados, en número suficiente, revisados y accesibles. Su ausencia o mal estado constituye un riesgo grave.',
    link: {
      text: 'Real Decreto 513/2017, de 22 de mayo.',
      url: 'https://www.boe.es/eli/es/rd/2017/05/22/513/con'
    }
  },
  'Sabe quiénes son las personas designadas para actuar en situaciones de emergencia': {
    conditions: ['No', 'NS/NC'],
    summary: 'El personal de la obra debe conocer quiénes son los trabajadores designados para actuar en emergencias. El desconocimiento generalizado evidencia una falta de implantación del plan de emergencia.',
    link: {
      text: 'Referencia legal: Ley 31/1995, art. 20.',
      url: 'https://www.boe.es/eli/es/l/1995/11/08/31/con'
    }
  },
  'Los encargados de emergencia disponen de la formación necesaria': {
    conditions: ['No', 'NS/NC'],
    summary: 'El personal designado para emergencias debe recibir formación específica y adecuada en primeros auxilios, lucha contra incendios y evacuación. La falta de formación anula su capacidad de respuesta.',
    link: {
      text: 'Referencia legal: Ley 31/1995, art. 20.',
      url: 'https://www.boe.es/eli/es/l/1995/11/08/31/con'
    }
  },
  'Están señalizadas las vías y salidas de emergencia': {
    conditions: ['No'],
    summary: 'Las vías de evacuación y salidas de emergencia deben estar claramente señalizadas y permanentemente despejadas para garantizar una evacuación segura y ordenada.',
    link: {
      text: 'Referencia legal: RD 485/1997, Anexo III.',
      url: 'https://www.boe.es/eli/es/rd/1997/04/14/485/con'
    }
  },
  'Existe un punto de reunión y está señalizado': {
    conditions: ['No'],
    summary: 'Debe existir un punto de reunión seguro, conocido por todo el personal y debidamente señalizado, como parte fundamental del plan de evacuación de la obra.',
    link: {
      text: 'Referencia: Norma UNE-EN ISO 7010 (Señal E007).',
      url: 'https://www.boe.es/eli/es/rd/1997/10/24/1627/con'
    }
  },
  '¿Existen señales para riesgos específicos en el lugar de trabajo concreto?': {
    conditions: ['No'],
    summary: 'Además de la señalización general, se deben señalizar los riesgos específicos de cada tajo (riesgo de caída, riesgo eléctrico, etc.) para advertir a los trabajadores y a terceros.',
    link: {
      text: 'Referencia legal: RD 485/1997, art. 4.',
      url: 'https://www.boe.es/eli/es/rd/1997/04/14/485/con'
    }
  },
  '¿Se dispone de toma de tierra?': {
    conditions: ['No'],
    summary: 'La toma de tierra es un elemento de seguridad esencial en cualquier instalación eléctrica para proteger a las personas frente a contactos indirectos. Su ausencia es un defecto muy grave.',
    link: {
      text: 'Referencia: Guía Técnica Riesgo Eléctrico INSST.',
      url: 'https://www.insst.es/documents/94886/391927/Gu%C3%ADa+t%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+del+riesgo+el%C3%A9ctrico+2021.pdf'
    }
  },
  '¿Se dispone de extintor de CO2?': {
    conditions: ['No'],
    summary: 'En las proximidades de cuadros eléctricos y zonas con riesgo eléctrico, es obligatorio disponer de extintores de CO2 (dióxido de carbono), ya que no son conductores de la electricidad.',
    link: {
      text: 'Referencia: Guía Técnica Riesgo Eléctrico INSST.',
      url: 'https://www.insst.es/documents/94886/391927/Gu%C3%ADa+t%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+del+riesgo+el%C3%A9ctrico+2021.pdf'
    }
  },
  '¿Las líneas de alta tensión están bien identificadas?': {
    conditions: ['No'],
    summary: 'La falta de identificación y señalización de líneas eléctricas de alta tensión cercanas a la obra supone un riesgo mortal. Es crucial delimitar las distancias de seguridad.',
    link: {
      text: 'Referencia legal: RD 614/2001, Anexo V.',
      url: 'https://www.boe.es/eli/es/rd/2001/06/08/614/con'
    }
  },
  '¿Se planifica el trabajo teniendo en cuenta la meteorología (precipitaciones, viento, temperaturas extremas, etc.)?': {
    conditions: ['No'],
    summary: 'No adaptar las condiciones de trabajo a fenómenos meteorológicos adversos (olas de calor, viento fuerte) es una negligencia grave. La planificación debe contemplar estos factores para proteger la salud de los trabajadores.',
    link: {
      text: 'Referencia legal: RD 486/1997 y VII CGSC art. 74 bis.',
      url: 'https://www.boe.es/eli/es/res/2023/09/06/(2)'
    }
  },
  'Se han previsto medidas para proteger a las personas trabajadoras de los factores atmosféricos': {
    conditions: ['No'],
    summary: 'La empresa está obligada a proporcionar medidas de protección frente al clima, como zonas de sombra, agua potable, ropa de abrigo o pausas adaptadas, priorizando siempre las medidas colectivas.',
    link: {
      text: 'Referencia legal: RD 1627/1997, Anexo IV.',
      url: 'https://www.boe.es/eli/es/rd/1997/10/24/1627/con'
    }
  },
  'Las personas trabajadoras conocen los procedimientos de trabajo y pautas a seguir para prevenir los riesgos derivados de los factores atmosféricos': {
    conditions: ['No'],
    summary: 'Es fundamental que los trabajadores reciban formación e información sobre los riesgos del estrés térmico o la hipotermia y conozcan los procedimientos a seguir para protegerse.',
    link: {
      text: 'Referencia: Guía Técnica INSST RD 1627/1997.',
      url: 'https://www.insst.es/documents/94886/390959/Gu%C3%ADa+T%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+de+los+riesgos+relativos+a+las+obras+de+construcci%C3%B3n.pdf'
    }
  },
  'Se dispone de medios de señalización que alertan de los peligros y equipos de medición que advierten de la presencia de ciertos factores atmosféricos': {
    conditions: ['No'],
    summary: 'En obras expuestas, el uso de equipos como anemómetros (para el viento) o termómetros puede ser necesario para tomar decisiones objetivas sobre la paralización de ciertas tareas.',
    link: {
      text: 'Referencia: Guía Técnica INSST RD 1627/1997.',
      url: 'https://www.insst.es/documents/94886/390959/Gu%C3%ADa+T%C3%A9cnica+para+la+evaluaci%C3%B3n+y+prevenci%C3%B3n+de+los+riesgos+relativos+a+las+obras+de+construcci%C3%B3n.pdf'
    }
  }
};
