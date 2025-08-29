/**
 * @file TestNo.gs
 * @description Contiene funciones para probar la lógica principal de la aplicación.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */
  const DATOS_DE_PRUEBA_ = [
    // --- DATOS GENERALES ---
    { titulo: 'Empresa Visitada', respuesta: 'Constructora de Prueba Definitiva, S.L.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Dirección Obra', respuesta: 'Avenida de la Simulación Completa, 456', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Provincia', respuesta: 'Madrid', tipo: FormApp.ItemType.LIST },
    { titulo: 'Municipio', respuesta: 'Getafe', tipo: FormApp.ItemType.LIST },
    { titulo: 'Código Postal', respuesta: '28905', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Fecha Visita', respuesta: new Date(), tipo: FormApp.ItemType.DATE },
    { titulo: 'Hora Entrada', respuesta: '10:00', tipo: FormApp.ItemType.TIME },
    { titulo: 'Visitador Principal', respuesta: ['Alberto Castro Rivas'], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'Acompañantes', respuesta: 'Lucía Méndez, FLC, Técnica, albertocastrovas@gmail.com', tipo: FormApp.ItemType.PARAGRAPH_TEXT },
    
    // --- TIPOLOGÍA ---
    { titulo: 'Tipología de la obra', respuesta: 'Obra civil', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    
    // --- EMPRESAS (Simulando hasta la 10) ---
    // Empresa 1
    { titulo: 'Nombre Empresa 1', respuesta: 'Instalaciones Ficticias, S.A.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 1', respuesta: 'A12345678', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 1', respuesta: 'Juan Pérez', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 1', respuesta: 'contacto.empresa1@email.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 1 interviene como', respuesta: 'Contratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 1', respuesta: ['Estructura', 'Movimiento de Tierra'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 2
    { titulo: 'Añadir Empresa 2', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 2', respuesta: 'Excavaciones del Sur, S.L.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 2', respuesta: 'B23456789', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 2', respuesta: 'Ana Torres', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 2', respuesta: 'ana@excavacionesdelsur.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 2 interviene como', respuesta: 'Subcontratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 2', respuesta: ['Movimiento de tierras'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 3
    { titulo: 'Añadir Empresa 3', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 3', respuesta: 'Pinturas Rápidas S.L.U.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 3', respuesta: 'C34567890', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 3', respuesta: 'Carlos Díaz', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 3', respuesta: 'carlos@pinturasrapidas.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 3 interviene como', respuesta: 'Subcontratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 3', respuesta: ['Pintura interior y exterior'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 4
    { titulo: 'Añadir Empresa 4', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 4', respuesta: 'Fontanería Total', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 4', respuesta: 'D45678901', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 4', respuesta: 'Lucía Fernández', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 4', respuesta: 'lucia@fontaneriatotal.es', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 4 interviene como', respuesta: 'Contratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 4', respuesta: ['Fontanería y sanitarios'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 5
    { titulo: 'Añadir Empresa 5', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 5', respuesta: 'Grúas y Elevadores, S.A.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 5', respuesta: 'E56789012', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 5', respuesta: 'Miguel López', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 5', respuesta: 'miguel@gruasyelevadores.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 5 interviene como', respuesta: 'Contratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 5', respuesta: ['Montaje de grúas torre'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 6
    { titulo: 'Añadir Empresa 6', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 6', respuesta: 'Carpintería Metálica Hermanos Ruiz', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 6', respuesta: 'F67890123', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 6', respuesta: 'Rosa Ruiz', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 6', respuesta: 'rosa@cmhermanosruiz.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 6 interviene como', respuesta: 'Subcontratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 6', respuesta: ['Estructuras metálicas'], tipo: FormApp.ItemType.CHECKBOX },

    // Empresa 7
    { titulo: 'Añadir Empresa 7', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Nombre Empresa 7', respuesta: 'Hormigones Preparados, S.L.', tipo: FormApp.ItemType.TEXT },
    { titulo: 'CIF Empresa 7', respuesta: 'G78901234', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Persona Contacto Empresa 7', respuesta: 'Pedro Gómez', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Correo Electrónico Contacto Empresa 7', respuesta: 'pedro@hormigonespreparados.com', tipo: FormApp.ItemType.TEXT },
    { titulo: 'La empresa 7 interviene como', respuesta: 'Subcontratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Qué trabajos está ejecutando la empresa 7', respuesta: ['Suministro de hormigón'], tipo: FormApp.ItemType.CHECKBOX },

    // --- GESTIÓN ---
    { titulo: 'Existe Coordinador de Seguridad y Salud en fase de ejecución', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'La modalidad organizativa de la PRL en la empresa es', respuesta: 'Servicio de Prevención Mancomunado', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se han designado Delegados/as de Prevención', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se ha creado Comité de Seguridad y Salud', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Hay medidas preventivas previstas frente a los riesgos derivados de la concurrencia de actividades', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    
    // --- EMERGENCIAS ---
    { titulo: 'Están visibles el listado con los teléfonos de emergencia y las direcciones de los centros de asistencia (y el recorrido recomendable para acceder)', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se dispone de medios de comunicación con cobertura suficiente', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se dispone de botiquín en obra', respuesta: 4, tipo: FormApp.ItemType.RATING },
    { titulo: 'El material de primeros auxilios se revisa periódicamente y se repone', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'El local / material de primeros auxilios está señalizado', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se dispone de medios de extinción de incendios', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Sabe quiénes son las personas designadas para actuar en situaciones de emergencia', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Los encargados de emergencia disponen de la formación necesaria', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Están señalizadas las vías y salidas de emergencia', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Existe un punto de reunión y está señalizado', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },

    // --- CONDICIONES GENERALES ---
    { titulo: 'La obra en general, ¿está ordenada y limpia? (áreas de trabajo, zonas comunes, vías de circulación, etc.)', respuesta: 4, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Existen zonas de acopio de material?', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: '¿Las zonas de acopio están correctamente delimitadas y en orden?', respuesta: 1, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Las vías de circulación de vehículos y peatones son adecuadas?', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: 'Se dispone de iluminación suficiente en pasillos, vías de circulación y zonas de trabajo', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Existe vallado exterior y se encuentra en buen estado?', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Los tajos están balizados?', respuesta: 4, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Existe señalización general de Seguridad y Salud?', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Existen señales para riesgos específicos en el lugar de trabajo concreto?', respuesta: ['Si'], tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: '¿Se dispone de instalaciones de higiene y bienestar y Cumplen con lo establecido en el Convenio General del sector de la construcción?', respuesta: 1, tipo: FormApp.ItemType.RATING },

    // --- INSTALACIÓN ELÉCTRICA ---
    { titulo: '¿Existe una instalación eléctrica?', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Ubicación de los cuadros o del generador', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Se dispone de toma de tierra?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: '¿Las conexiones son adecuadas?', respuesta: 3, tipo: FormApp.ItemType.RATING },
    { titulo: '¿Se dispone de extintor de CO2?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: '¿La ubicación de extintores es adecuada?', respuesta: 1, tipo: FormApp.ItemType.RATING },
    { titulo: 'Tendido de cables', respuesta: 3, tipo: FormApp.ItemType.RATING },
    { titulo: 'Estado de las mangueras y las conexiones', respuesta: 5, tipo: FormApp.ItemType.RATING },
    { titulo: 'Existen líneas de Alta Tensión en las proximidades', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: '¿Las líneas de alta tensión están bien identificadas?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    
    // --- EQUIPOS, MEDIOS Y PROTECCIONES ---
    { titulo: 'Equipos de trabajo que utiliza la empresa', respuesta: [], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿los equipos de trabajo que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: 'Maquinaria de elevación que utiliza la empresa', respuesta: [], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿la maquinaria de elevación que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 3, tipo: FormApp.ItemType.RATING },
    { titulo: 'Equipos de trabajo auxiliares que utilice la empresa en la obra', respuesta: [], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿los equipos de trabajo auxiliares que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 4, tipo: FormApp.ItemType.RATING },
    { titulo: 'Medios de protección que afecten a la empresa', respuesta: [], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿los medios de protección que afecten a la empresa se encuentran en buenas condiciones?', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: 'Redes que afecten a la empresa', respuesta: [], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿las redes que afecten a la empresa se encuentran en buenas condiciones?', respuesta: 5, tipo: FormApp.ItemType.RATING },

    // --- EPIs ---
    { titulo: 'Equipos de Protección Individuales (EPI) necesarios según la actividad', respuesta: 'Casco, Guantes, Calzado de seguridad, Gafas de protección', tipo: FormApp.ItemType.PARAGRAPH_TEXT },
    { titulo: 'En general, ¿los trabajadores hacen uso adecuado de los Equipos de Protección Individual (EPI)?', respuesta: 5, tipo: FormApp.ItemType.RATING },
    { titulo: 'En general, ¿los Equipos de Protección Individual (EPI) se encuentran en buen estado de conservación y funcionamiento?', respuesta: 4, tipo: FormApp.ItemType.RATING },

    // --- RIESGOS HIGIÉNICOS Y ERGONÓMICOS ---
    { titulo: 'Se utilizan productos químicos por parte de la empresa visitada', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se almacenan los productos químicos en lugares y condiciones adecuados', respuesta: 5, tipo: FormApp.ItemType.RATING },
    { titulo: 'Están correctamente envasados y etiquetados los productos químicos', respuesta: 2, tipo: FormApp.ItemType.RATING },
    { titulo: 'Se planifica el trabajo teniendo en cuenta la meteorología (precipitaciones, viento, temperaturas extremas, etc.)', respuesta: 'Si', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se han previsto medidas para proteger a las personas trabajadoras de los factores atmosféricos', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Las personas trabajadoras conocen los procedimientos de trabajo y pautas a seguir para prevenir los riesgos derivados de los factores atmosféricos', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'Se dispone de medios de señalización que alertan de los peligros y equipos de medición que advierten de la presencia de ciertos factores atmosféricos', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    { titulo: 'El trabajo realizado requiere:', respuesta: ['Manipular cargas de forma manual', 'Adoptar posturas forzadas', 'Movimientos repetitivos'], tipo: FormApp.ItemType.CHECKBOX },
    { titulo: 'En general, ¿cómo valorarías el equilibrio entre el esfuerzo físico requerido y la aplicación de medidas preventivas en el trabajo realizado?', respuesta: 1, tipo: FormApp.ItemType.RATING },
    
    // --- OBSERVACIONES Y FINAL ---
    { titulo: 'Utiliza este espacio para añadir cualquier comentario, aclaración o información relevante que consideres importante sobre el trabajo realizado o las condiciones evaluadas.', respuesta: 'Prueba completa y exhaustiva del formulario. Se han rellenado todos los campos posibles para asegurar el correcto funcionamiento del script.', tipo: FormApp.ItemType.PARAGRAPH_TEXT },
    { titulo: 'Correo Adicional (Opcional):', respuesta: 'test.completo@flc.org', tipo: FormApp.ItemType.TEXT },
    { titulo: 'Hora Salida', respuesta: '13:45', tipo: FormApp.ItemType.TIME }
  ];

/**
 * ===================================================================================
 * FUNCIÓN DE PRUEBA (VERSIÓN REFACTORIZADA)
 * ===================================================================================
 * Construye un objeto de evento de formulario ('e') simulado y lo utiliza para
 * llamar a la función `alEnviarFormulario`.
 *
 * @throws {Error} Si ocurre un problema durante la prueba, el error se captura
 * y se registra en el Logger para facilitar la depuración.
 */
function enviarRespuestaDePrueba() {
  try {
    Logger.log('Iniciando la creación de una respuesta de prueba simulada...');

    // --- 2. CREACIÓN DEL OBJETO 'ItemResponse' SIMULADO ---
    // Transforma `DATOS_DE_PRUEBA` en una estructura que imita el array `itemResponses`
    // que se recibe en un evento de formulario real. La simulación es ahora más simple.
    const mockItemResponses = DATOS_DE_PRUEBA.map(dato => {
      return {
        // Simula la función que devuelve el ítem de la pregunta.
        getItem: () => ({
          // Solo necesitamos simular las funciones que realmente usamos en Main.gs:
          // getTitle() para buscar en el mapa y getType() para formatos especiales.
          getTitle: () => dato.titulo,
          getType: () => dato.tipo,
        }),
        // Simula la función que devuelve la respuesta del usuario.
        getResponse: () => dato.respuesta
      };
    });

    // --- 3. CREACIÓN DEL OBJETO DE EVENTO SIMULADO ('mockEvent') ---
    // Se construye el objeto `e` final que se pasará a la función `alEnviarFormulario`.
    // Este objeto tiene la misma estructura que el evento real de Google.
    const mockEvent = {
      response: {
        getItemResponses: () => mockItemResponses
      }
    };

    // --- 4. EJECUCIÓN DE LA FUNCIÓN PRINCIPAL CON DATOS SIMULADOS ---
    // Se llama a la función que se quiere probar (`alEnviarFormulario`) y se le pasa
    // el evento simulado (`mockEvent`) como si fuera un envío real del formulario.
    Logger.log('Objeto de evento simulado y 100% completo creado. Llamando a "alEnviarFormulario"...');
    
    alEnviarFormulario(mockEvent);
    
    Logger.log('Prueba finalizada. "alEnviarFormulario" ha sido ejecutada. Revisa tu Google Drive para ver el informe de prueba completo.');

  } catch (error) {
    // --- MANEJO DE ERRORES ---
    // Si algo falla (ya sea en la preparación de los datos o en la ejecución de `alEnviarFormulario`),
    // se captura el error y se muestra en el log para facilitar su corrección.
    Logger.log(`❌ ERROR durante la ejecución de la prueba completa: ${error.toString()}\n${error.stack}`);
  }
}