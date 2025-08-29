/**
 * @file SpecificAnswers.gs
 * @description Este archivo contiene todas las respuestas y consejos específicos para cada
 * pregunta calificable (tipo RATING) del formulario.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */

const RESPUESTAS_ESPECIFICAS = {
  // --- EMERGENCIAS ---
  '¿Existe un botiquín en obra que esté completo, accesible y señalizado adecuadamente?': {
    1: 'CRÍTICO: Ausencia total de botiquín en la obra. Incumplimiento grave de la normativa y riesgo inasumible para los trabajadores. Adquirir y dotar un botiquín adecuado de forma inmediata.',
    2: 'DEFICIENTE: El botiquín es claramente insuficiente, le faltan elementos esenciales o está en mal estado. Revisar y reponer el contenido según el RD 486/1997.',
    3: 'MEJORABLE: Se dispone de un botiquín básico, pero podría estar mejor señalizado, ser más accesible o no estar completo. Asegurar una correcta señalización y fácil acceso.',
    4: 'ADECUADO: El botiquín está completo, señalizado y cumple con la normativa vigente.',
    5: 'CORRECTO: Botiquín perfectamente dotado, señalizado, accesible y con un sistema de revisión periódica documentado. Un ejemplo de buenas prácticas.'
  },

  // --- CONDICIONES GENERALES ---
  'La obra en general, ¿está ordenada y limpia? (áreas de trabajo, zonas comunes, vías de circulación, etc.)': {
    1: 'CRÍTICO: Desorden y suciedad generalizados que suponen un riesgo grave de tropiezos, caídas e incendios. Requiere una jornada de limpieza y orden inmediata en toda la obra.',
    2: 'DEFICIENTE: Acumulación de escombros, materiales y desorden en zonas de paso. El orden y la limpieza no son una prioridad. Establecer un plan de limpieza diario y asignación de responsabilidades.',
    3: 'MEJORABLE: Se aprecian esfuerzos de orden, pero son insuficientes y no constantes. Zonas concretas desorganizadas. Fomentar la cultura de "limpiar sobre la marcha" entre todo el personal.',
    4: 'ADECUADO: La obra se mantiene razonablemente ordenada y limpia. Las zonas de paso principales están despejadas, cumpliendo los mínimos de seguridad.',
    5: 'CORRECTO: La obra está impecable. El orden y la limpieza son evidentes en todas las áreas, lo que mejora significativamente la seguridad, la imagen y la eficiencia del trabajo.'
  },
  '¿Las zonas de acopio están correctamente delimitadas y en orden?': {
    1: 'CRÍTICO: Materiales acopiados de forma caótica, invadiendo zonas de paso y sin delimitación alguna. Riesgo alto de desplome y tropiezos. Reorganizar y señalizar las zonas de acopio urgentemente.',
    2: 'DEFICIENTE: Las zonas de acopio existen pero no están bien delimitadas ni ordenadas. Los materiales se mezclan y apilan de forma insegura, dificultando su acceso.',
    3: 'MEJORABLE: Las zonas están delimitadas, pero el orden interno es mejorable. Se recomienda optimizar el apilamiento, segregar materiales y mejorar la clasificación.',
    4: 'ADECUADO: Zonas de acopio bien delimitadas, señalizadas y con un orden lógico que facilita el acceso seguro a los materiales.',
    5: 'CORRECTO: Acopios perfectamente delimitados, señalizados y ordenados por tipo de material. Un modelo de eficiencia y seguridad que previene accidentes y optimiza el tiempo.'
  },
  '¿Las vías de circulación de vehículos y peatones son adecuadas?': {
    1: 'CRÍTICO: Vías de circulación obstruidas, mal definidas o inexistentes. Riesgo muy alto de atropellos y colisiones. Definir, señalizar y despejar rutas seguras para vehículos y peatones de inmediato.',
    2: 'DEFICIENTE: Las vías no están claramente separadas para peatones y vehículos, o presentan obstáculos frecuentes. Se debe mejorar la señalización y eliminar todas las obstrucciones.',
    3: 'MEJORABLE: Existen vías definidas, pero podrían mejorarse con más señalización o una separación física más clara (barreras tipo New Jersey) entre peatones y vehículos.',
    4: 'ADECUADO: Las vías de circulación para vehículos y peatones están bien definidas, señalizadas y libres de obstáculos, garantizando un tránsito seguro.',
    5: 'CORRECTO: Rutas para peatones y vehículos completamente segregadas, bien iluminadas y señalizadas. Seguridad vial ejemplar dentro de la obra.'
  },
  'Se dispone de iluminación suficiente en pasillos, vías de circulación y zonas de trabajo': {
    1: 'CRÍTICO: Zonas de trabajo o paso a oscuras o con iluminación muy deficiente. Riesgo grave de accidentes. Instalar iluminación provisional adecuada de forma inmediata.',
    2: 'DEFICIENTE: Iluminación insuficiente en puntos clave, generando sombras y zonas de riesgo. Revisar y reforzar los puntos de luz en toda la obra.',
    3: 'MEJORABLE: La iluminación general es aceptable, pero algunas zonas específicas de trabajo requieren luz de apoyo adicional (focos portátiles) para tareas de precisión.',
    4: 'ADECUADO: La obra cuenta con una iluminación general y específica suficiente para realizar los trabajos de forma segura.',
    5: 'CORRECTO: Iluminación óptima en toda la obra, sin sombras y con especial atención a los detalles, lo que mejora la seguridad y la calidad del trabajo.'
  },
  '¿Existe vallado exterior y se encuentra en buen estado?': {
    1: 'CRÍTICO: Ausencia de vallado perimetral o vallado en estado ruinoso. Riesgo de acceso de personal no autorizado y de caídas. Instalar o reparar de forma urgente.',
    2: 'DEFICIENTE: El vallado presenta roturas, huecos o falta de estabilidad. No garantiza la seguridad perimetral. Realizar un mantenimiento correctivo inmediato.',
    3: 'MEJORABLE: El vallado es correcto en general, pero algunos puntos podrían reforzarse o mejorar su señalización de advertencia (riesgo de obra, etc.).',
    4: 'ADECUADO: El perímetro de la obra está correctamente vallado y señalizado, impidiendo el acceso no autorizado.',
    5: 'CORRECTO: Vallado perimetral robusto, estable, sin huecos y con señalización clara y visible. Seguridad perimetral impecable.'
  },
  '¿Los tajos están balizados?': {
    1: 'CRÍTICO: Zonas de riesgo (huecos, zanjas) sin ningún tipo de balizamiento. Riesgo de caída a distinto nivel inminente. Balizar inmediatamente todas las zonas peligrosas.',
    2: 'DEFICIENTE: El balizamiento es escaso o inadecuado (cintas rotas, vallas caídas). No cumple su función de advertencia. Revisar y reponer todo el balizamiento de la obra.',
    3: 'MEJORABLE: Los tajos principales están balizados, pero se podrían proteger mejor zonas de riesgo secundarias o mejorar la visibilidad del balizamiento (uso de mallas, etc.).',
    4: 'ADECUADO: Las zonas de trabajo y riesgo están correctamente balizadas y señalizadas.',
    5: 'CORRECTO: Todo tajo o zona de riesgo, por pequeño que sea, está perfectamente balizado con sistemas robustos (vallas, guardacuerpos) y de alta visibilidad.'
  },
  '¿Existe señalización general de Seguridad y Salud?': {
    1: 'CRÍTICO: Ausencia total de señalización de seguridad. Riesgo muy alto de accidentes por falta de información sobre peligros y obligaciones. Instalar señalización básica (EPIs, riesgos, salidas) de forma inmediata.',
    2: 'DEFICIENTE: La señalización es muy escasa, está deteriorada o mal ubicada (no visible). No cumple su función informativa. Realizar un estudio de necesidades y colocar la señalización adecuada.',
    3: 'MEJORABLE: Existe señalización básica, pero es insuficiente. Faltan señales en puntos clave o algunas no son las reglamentarias. Se recomienda completar y estandarizar la señalización.',
    4: 'ADECUADO: La obra cuenta con la señalización de seguridad y salud necesaria para informar de los riesgos y obligaciones generales.',
    5: 'CORRECTO: Señalización completa, clara, en perfecto estado y estratégicamente ubicada. Se complementa con paneles informativos, demostrando un alto compromiso con la seguridad.'
  },
  '¿Se dispone de instalaciones de higiene y bienestar y Cumplen con lo establecido en el Convenio General del sector de la construcción?': {
    1: 'CRÍTICO: Ausencia total de instalaciones de higiene (retretes, lavamanos, agua potable). Incumplimiento grave que atenta contra la dignidad y salud de los trabajadores. Instalar de inmediato.',
    2: 'DEFICIENTE: Las instalaciones son insuficientes para el número de trabajadores, están en mal estado o no disponen de los elementos básicos (jabón, papel).',
    3: 'MEJORABLE: Se dispone de instalaciones, pero su limpieza es deficiente o no se realiza con la frecuencia necesaria. Establecer un plan de limpieza periódico.',
    4: 'ADECUADO: Las instalaciones de higiene y bienestar cumplen con los requisitos mínimos del convenio en cuanto a dotación y estado.',
    5: 'CORRECTO: Instalaciones limpias, bien dotadas, en número suficiente y con extras que mejoran el bienestar, como vestuarios con taquillas o comedores adecuados.'
  },

  // --- INSTALACIÓN ELÉCTRICA ---
  'Ubicación de los cuadros o del generador': {
    1: 'CRÍTICO: Cuadros eléctricos o generadores en zonas de paso, expuestos a la humedad o de fácil acceso para personal no autorizado. Riesgo eléctrico grave. Reubicar y proteger inmediatamente.',
    2: 'DEFICIENTE: La ubicación no es la ideal, presenta ciertos riesgos o no está correctamente señalizada. Mejorar la protección y señalización.',
    3: 'MEJORABLE: Ubicación segura pero podría mejorarse la señalización de "Riesgo Eléctrico" o el orden de los cables en sus inmediaciones.',
    4: 'ADECUADO: Los cuadros y generadores están en un lugar seguro, protegido de la intemperie y del paso de vehículos.',
    5: 'CORRECTO: Ubicación perfectamente planificada, en zona protegida, señalizada, con extintor específico cercano y de acceso restringido a personal autorizado.'
  },
  '¿Las conexiones son adecuadas?': {
    1: 'CRÍTICO: Conexiones improvisadas, cables pelados, empalmes con cinta aislante. Riesgo muy alto de electrocución e incendio. Desconectar y rehacer todas las conexiones de forma segura.',
    2: 'DEFICIENTE: Se observan conexiones en mal estado o el uso de ladrones y alargadores domésticos no aptos para obra. Sustituir por material industrial adecuado.',
    3: 'MEJORABLE: Las conexiones son seguras, pero el cableado podría estar más protegido u ordenado para evitar daños y tropiezos.',
    4: 'ADECUADO: Se utilizan clavijas y bases de enchufe industriales (tipo CETAC) y las conexiones están en buen estado.',
    5: 'CORRECTO: Todas las conexiones son estancas, seguras y están protegidas. El cableado está ordenado y protegido mediante canaletas o pasacables.'
  },
  '¿La ubicación de extintores es adecuada?': {
    1: 'CRÍTICO: No hay extintores cerca de los cuadros eléctricos o están obstruidos/inaccesibles. En caso de incendio eléctrico, no hay medios de actuación. Colocar extintores y señalizarlos urgentemente.',
    2: 'DEFICIENTE: Hay un extintor, pero está lejos, mal señalizado o no es el adecuado (ej. de agua). Asegurar extintor de CO2, cercano y visible.',
    3: 'MEJORABLE: El extintor está presente y es el correcto, pero su señalización podría ser más visible o su acceso mejorable.',
    4: 'ADECUADO: Existe un extintor de CO2 adecuado, señalizado y accesible cerca de cada cuadro eléctrico.',
    5: 'CORRECTO: Extintores de CO2 perfectamente ubicados, señalizados (señal fotoluminiscente), con revisiones al día y personal formado en su uso.'
  },
  'Tendido de cables': {
    1: 'CRÍTICO: Cables eléctricos por el suelo en zonas de paso de personas y vehículos, o sumergidos en charcos. Riesgo inminente de tropiezos y electrocución. Elevar o proteger los cables inmediatamente.',
    2: 'DEFICIENTE: Los cables no están elevados ni protegidos adecuadamente, creando riesgo de tropiezos y daños en el cableado. Corregir el tendido.',
    3: 'MEJORABLE: La mayoría de los cables están elevados, pero algunos tramos podrían estar mejor protegidos o fijados para evitar que caigan.',
    4: 'ADECUADO: Los cables se tienden por vía aérea o se protegen con pasacables en las zonas de paso, evitando riesgos.',
    5: 'CORRECTO: Todo el tendido eléctrico está planificado, protegido, elevado y ordenado. No hay cables por el suelo en ninguna zona de paso.'
  },
  'Estado de las mangueras y las conexiones': {
    1: 'CRÍTICO: Mangueras con el aislamiento dañado, mostrando los conductores internos. Conexiones rotas o reparadas de forma precaria. Riesgo eléctrico muy grave. Retirar y sustituir todo el material dañado.',
    2: 'DEFICIENTE: Se aprecian desgastes o pequeños cortes en las mangueras. Algunas conexiones no parecen robustas. Material a revisar y sustituir a corto plazo.',
    3: 'MEJORABLE: El material está en buen estado general, pero se recomienda una revisión más exhaustiva y la limpieza de las conexiones.',
    4: 'ADECUADO: Las mangueras y conexiones están en buen estado de conservación y son de tipo industrial.',
    5: 'CORRECTO: Todo el material (mangueras, conexiones) está en perfecto estado, es de alta calidad y se almacena correctamente cuando no se usa.'
  },

  // --- EQUIPOS, MEDIOS Y PROTECCIONES ---
  'En general, ¿los equipos de trabajo que utiliza la empresa en la obra están en buenas condiciones?': {
    1: 'CRÍTICO: Equipos en estado ruinoso, con protecciones anuladas o averías evidentes. Riesgo de accidente grave. Prohibir su uso hasta su reparación o sustitución.',
    2: 'DEFICIENTE: Equipos con mantenimiento deficiente, falta de marcado CE o sin manual de instrucciones. Requieren una revisión y puesta a punto.',
    3: 'MEJORABLE: Los equipos son funcionales y seguros, pero se echa en falta un registro de mantenimiento periódico para asegurar su buen estado a largo plazo.',
    4: 'ADECUADO: Los equipos de trabajo están en buen estado, disponen de sus protecciones y son aptos para el uso previsto.',
    5: 'CORRECTO: Equipos modernos, con mantenimiento preventivo documentado y operados por personal con formación específica. Máxima seguridad y fiabilidad.'
  },
  'En general, ¿la maquinaria de elevación que utiliza la empresa en la obra están en buenas condiciones?': {
    1: 'CRÍTICO: Maquinaria de elevación (grúas, plataformas) con deficiencias graves, sin revisiones o con elementos de seguridad inoperativos. Riesgo extremo. Paralizar su uso inmediatamente.',
    2: 'DEFICIENTE: Falta documentación importante (revisiones, ITV) o se aprecian desgastes (fugas de aceite, etc.). Requiere una inspección técnica y administrativa.',
    3: 'MEJORABLE: La maquinaria es segura, pero se podría mejorar la formación de los operadores o la planificación de las maniobras para evitar interferencias.',
    4: 'ADECUADO: La maquinaria de elevación cuenta con su documentación al día y se encuentra en buen estado de funcionamiento.',
    5: 'CORRECTO: Maquinaria en perfecto estado, con todas las revisiones e inspecciones documentadas, y operada por personal altamente cualificado.'
  },
  'En general, ¿los equipos de trabajo auxiliares que utiliza la empresa en la obra están en buenas condiciones?': {
    1: 'CRÍTICO: Andamios mal montados, escaleras rotas, borriquetas inestables. Riesgo inminente de caída a distinto nivel. Prohibir su uso y sustituir o montar correctamente.',
    2: 'DEFICIENTE: Los equipos auxiliares presentan deformaciones, óxido o falta de elementos (plataformas, rodapiés en andamios). Deben ser revisados y reparados.',
    3: 'MEJORABLE: Los equipos son seguros, pero se observa un uso inadecuado por parte de los trabajadores (ej. posturas forzadas en escaleras). Reforzar la formación.',
    4: 'ADECUADO: Los equipos auxiliares (andamios, escaleras) están en buen estado y se utilizan de forma segura.',
    5: 'CORRECTO: Equipos auxiliares de calidad, con inspecciones periódicas documentadas y un alto nivel de concienciación de los trabajadores sobre su uso correcto.'
  },
  'En general, ¿los medios de protección que afecten a la empresa se encuentran en buenas condiciones?': {
    1: 'CRÍTICO: Ausencia de protecciones colectivas en zonas con riesgo de caída (barandillas, redes) o protecciones en estado ruinoso. Riesgo de accidente mortal. Instalar protecciones de inmediato.',
    2: 'DEFICIENTE: Las protecciones son insuficientes, están mal instaladas o presentan daños. No garantizan la seguridad. Revisar y reparar todas las protecciones.',
    3: 'MEJORABLE: Existen protecciones, pero se podrían mejorar ciertos aspectos, como la altura de las barandillas o la señalización de las redes de seguridad.',
    4: 'ADECUADO: Se han instalado los medios de protección colectiva necesarios y estos se encuentran en buen estado.',
    5: 'CORRECTO: Las protecciones colectivas no solo cumplen la normativa, sino que la superan, cubriendo todos los posibles riesgos de caída. Un entorno de trabajo muy seguro.'
  },
  'En general, ¿las redes que afectan a la empresa se encuentran en buenas condiciones?': {
    1: 'CRÍTICO: Redes de seguridad rotas, mal instaladas, sin solape o con objetos caídos sobre ellas. No cumplirían su función en caso de caída. Retirar o reparar urgentemente.',
    2: 'DEFICIENTE: Las redes presentan daños menores, están destensadas o su fecha de caducidad ha expirado. Deben ser revisadas por personal competente.',
    3: 'MEJORABLE: Las redes están bien instaladas, pero se debe vigilar que no se usen como zonas de acopio de material, lo que reduce su eficacia.',
    4: 'ADECUADO: Las redes de seguridad están correctamente instaladas, tensadas y sin daños, conforme a las especificaciones del fabricante.',
    5: 'CORRECTO: Redes en perfecto estado, con su correspondiente certificado y un plan de supervisión y mantenimiento documentado.'
  },

  // --- EPIs ---
  'En general, ¿los trabajadores hacen uso adecuado de los Equipos de Protección Individual (EPI)?': {
    1: 'CRÍTICO: La mayoría de los trabajadores no utilizan los EPIs básicos (casco, calzado) o los usan de forma incorrecta. Riesgo personal muy alto. Detener los trabajos y exigir el uso correcto.',
    2: 'DEFICIENTE: Se observa un uso inconsistente de los EPIs. Algunos trabajadores los usan y otros no. Falta de supervisión y concienciación. Reforzar la vigilancia por parte de los mandos.',
    3: 'MEJORABLE: Se usan los EPIs básicos, pero se olvida el uso de otros más específicos (gafas, guantes, mascarillas) cuando la tarea lo requiere. Realizar charlas de concienciación.',
    4: 'ADECUADO: La mayoría de los trabajadores utilizan los EPIs necesarios para su puesto de trabajo de forma correcta.',
    5: 'CORRECTO: Cultura preventiva totalmente implantada. El 100% de los trabajadores usa todos los EPIs requeridos para cada tarea de forma consciente y responsable.'
  },
  'En general, ¿los Equipos de Protección Individual (EPI) se encuentran en buen estado de conservación y funcionamiento?': {
    1: 'CRÍTICO: Los trabajadores utilizan EPIs en estado ruinoso (cascos rotos, arneses deshilachados). No ofrecen ninguna protección. Retirar y sustituir inmediatamente.',
    2: 'DEFICIENTE: Se aprecian EPIs muy desgastados, sucios o que han superado su vida útil. La empresa no parece reponerlos con la frecuencia necesaria.',
    3: 'MEJORABLE: Los EPIs están en buen estado, pero no se almacenan correctamente, lo que acelera su deterioro. Fomentar el cuidado y almacenamiento adecuado.',
    4: 'ADECUADO: La empresa suministra EPIs en buen estado y los trabajadores los mantienen en condiciones aceptables.',
    5: 'CORRECTO: La empresa tiene un sistema para la entrega, revisión y sustitución periódica de EPIs, garantizando que siempre estén en perfecto estado.'
  },

  // --- RIESGOS HIGIÉNICOS Y ERGONÓMICOS ---
  '¿Se almacenan los productos químicos en lugares y condiciones adecuados?': {
    1: 'CRÍTICO: Productos químicos almacenados sin control, cerca de fuentes de calor, sin ventilación o sin cubeto de retención. Riesgo de derrame, incendio o intoxicación. Corregir el almacenamiento de inmediato.',
    2: 'DEFICIENTE: El almacenamiento no es el adecuado. Los productos no están segregados por compatibilidad o el lugar no está bien ventilado.',
    3: 'MEJORABLE: Están almacenados en un lugar seguro, pero se podría mejorar la señalización de riesgo químico o la disponibilidad de las Fichas de Datos de Seguridad (FDS).',
    4: 'ADECUADO: Los productos químicos se almacenan en un lugar ventilado, señalizado y sobre cubetos de retención para evitar derrames.',
    5: 'CORRECTO: Almacenamiento en armario específico, con segregación por tipo de riesgo, ventilación forzada y kit de absorción de derrames disponible y señalizado.'
  },
  '¿Están correctamente envasados y etiquetados los productos químicos?': {
    1: 'CRÍTICO: Uso de envases no originales (ej. botellas de agua) sin etiquetar. Riesgo de ingestión accidental o manipulación incorrecta. Retirar y etiquetar todo inmediatamente.',
    2: 'DEFICIENTE: Algunos envases originales tienen las etiquetas deterioradas o ilegibles. Dificulta la identificación de riesgos. Re-etiquetar o solicitar nuevos envases.',
    3: 'MEJORABLE: Todos los envases son originales y están etiquetados, pero se podría reforzar la información con pictogramas de riesgo adicionales y visibles.',
    4: 'ADECUADO: Todos los productos químicos se encuentran en sus envases originales y con su etiqueta reglamentaria en buen estado.',
    5: 'CORRECTO: Etiquetado perfecto y Fichas de Datos de Seguridad (FDS) disponibles junto a los productos para consulta inmediata por parte de cualquier trabajador.'
  },
  'En general, ¿cómo valorarías el equilibrio entre el esfuerzo físico requerido y la aplicación de medidas preventivas en el trabajo realizado?': {
    1: 'CRÍTICO: Se realizan tareas con un esfuerzo físico extremo sin ningún tipo de ayuda mecánica o rotación. Riesgo muy alto de lesiones musculoesqueléticas. Reevaluar los procedimientos de trabajo.',
    2: 'DEFICIENTE: Predominio del esfuerzo manual. Se dispone de pocas ayudas mecánicas o no se utilizan. Fomentar el uso de carretillas, transpaletas, etc.',
    3: 'MEJORABLE: Se utilizan algunas ayudas mecánicas, pero aún hay muchas tareas que podrían optimizarse para reducir el esfuerzo físico y las posturas forzadas.',
    4: 'ADECUADO: Se ha evaluado la manipulación manual de cargas y se proporcionan las ayudas mecánicas necesarias para las tareas más pesadas.',
    5: 'CORRECTO: La empresa ha invertido en ayudas mecánicas y ha formado a los trabajadores en higiene postural, minimizando activamente los riesgos ergonómicos.'
  }
};
