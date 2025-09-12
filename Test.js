/**
 * @file Test.gs
 * @description Contiene funciones para probar la lógica principal de la aplicación.
 * @version 1.0.0
 * @author Alberto Castro
 * @email AlbertoCastrovas@gmail.com
 */
function generarDatosDePruebaCompletos() {

   // --- OBTENCIÓN Y DISTRIBUCIÓN DE IMÁGENES REALES ---
    const todosLosIdsDeImagenes = obtenerIdsDeImagenesDePrueba();
    const idsImagenes1a10 = todosLosIdsDeImagenes.slice(0, 10);
    const idsImagenes11a20 = todosLosIdsDeImagenes.slice(10, 20);
    const idsImagenes21a30 = todosLosIdsDeImagenes.slice(20, 30);
    const idsImagenes31a40 = todosLosIdsDeImagenes.slice(30, 40);
    const idsImagenes41a50 = todosLosIdsDeImagenes.slice(40, 50);

    const datosBase = [
        // --- DATOS GENERALES ---
        { titulo: 'Empresa Visitada', respuesta: 'Constructora de Prueba (Test 20 Empresas)', tipo: FormApp.ItemType.TEXT },
        { titulo: 'Dirección Obra', respuesta: 'Avenida de la Simulación Completa, 456', tipo: FormApp.ItemType.TEXT },
        { titulo: 'Provincia', respuesta: 'Madrid', tipo: FormApp.ItemType.LIST },
        { titulo: 'Municipio', respuesta: 'Getafe', tipo: FormApp.ItemType.LIST },
        { titulo: 'Código Postal', respuesta: '28905', tipo: FormApp.ItemType.TEXT },
        { titulo: 'Fecha Visita', respuesta: new Date(), tipo: FormApp.ItemType.DATE },
        { titulo: 'Hora Entrada', respuesta: '10:00', tipo: FormApp.ItemType.TIME },
        { titulo: 'Visitador Principal', respuesta: ['Alberto Castro Rivas', 'Carlos Parra'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'Acompañantes', respuesta: 'Lucía Méndez, FLC, Técnica, albertocastrovas@gmail.com', tipo: FormApp.ItemType.PARAGRAPH_TEXT },
        
        // --- TIPOLOGÍA ---
        { titulo: 'Tipología de la obra', respuesta: 'Obra civil', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
    ];

    // --- BUCLE PARA GENERAR DATOS DE 20 EMPRESAS ---
    const datosEmpresas = [];
    for (let i = 1; i <= 20; i++) {
        datosEmpresas.push(
            { titulo: `Nombre Empresa ${i}`, respuesta: `Empresa de Ejemplo ${i}, S.L.`, tipo: FormApp.ItemType.TEXT },
            { titulo: `CIF Empresa ${i}`, respuesta: `B123456${i.toString().padStart(2, '0')}`, tipo: FormApp.ItemType.TEXT },
            { titulo: `Persona Contacto Empresa ${i}`, respuesta: `Contacto Apellido ${i}`, tipo: FormApp.ItemType.TEXT },
            { titulo: `Cargo contacto Empresa ${i}`, respuesta: `Jefe de Equipo ${i}`, tipo: FormApp.ItemType.TEXT },
            { titulo: `Correo Electrónico Contacto Empresa ${i}`, respuesta: `contacto.empresa${i}@email.com`, tipo: FormApp.ItemType.TEXT },
            { titulo: `La empresa ${i} interviene como`, respuesta: (i % 3 === 0) ? 'Autónomo' : 'Subcontratista', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
            { titulo: `Qué trabajos está ejecutando la empresa ${i}?`, respuesta: (i % 2 === 0) ? ['Estructura', 'Movimiento de Tierra'] : ['Acabados (pintura, escayola, etc.)'], tipo: FormApp.ItemType.CHECKBOX }
        );
        if (i < 20) {
            datosEmpresas.push({ titulo: `Añadir Empresa ${i + 1}`, respuesta: 'Si', tipo: FormApp.ItemType.MULTIPLE_CHOICE });
        }
    }

    const datosFinales = [
        // --- GESTIÓN ---
        { titulo: 'Existe Coordinador de Seguridad y Salud en fase de ejecución', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'La modalidad organizativa de la PRL en la empresa es', respuesta: 'Servicio de Prevención Mancomunado', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se han designado Delegados/as de Prevención', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se ha creado Comité de Seguridad y Salud', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Hay medidas preventivas previstas frente a los riesgos derivados de la concurrencia de actividades', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        
        // --- EMERGENCIAS ---
        { titulo: 'Están visibles el listado con los teléfonos de emergencia y las direcciones de los centros de asistencia (y el recorrido recomendable para acceder)', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se dispone de medios de comunicación con cobertura suficiente', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Existe un botiquín en obra que esté completo, accesible y señalizado adecuadamente?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: 'El material de primeros auxilios se revisa periódicamente y se repone', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se dispone de local de primeros auxilios (en obras con más de 50 trabajadores)', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'El local / material de primeros auxilios está señalizado', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se dispone de medios de extinción de incendios', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Sabe quiénes son las personas designadas para actuar en situaciones de emergencia', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Los encargados de emergencia disponen de la formación necesaria', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Están señalizadas las vías y salidas de emergencia', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Existe un punto de reunión y está señalizado', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },

        // --- CONDICIONES GENERALES ---
        { titulo: 'La obra en general, ¿está ordenada y limpia? (áreas de trabajo, zonas comunes, vías de circulación, etc.)', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Existen zonas de acopio de material?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Las zonas de acopio están correctamente delimitadas y en orden?', respuesta: 3, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Las vías de circulación de vehículos y peatones son adecuadas?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: 'Se dispone de iluminación suficiente en pasillos, vías de circulación y zonas de trabajo', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Existe vallado exterior y se encuentra en buen estado?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Los tajos están balizados?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Existe señalización general de Seguridad y Salud?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Existen señales para riesgos específicos en el lugar de trabajo concreto?', respuesta: ['Si'], tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Se dispone de instalaciones de higiene y bienestar y Cumplen con lo establecido en el Convenio General del sector de la construcción?', respuesta: 3, tipo: FormApp.ItemType.RATING },

        // --- INSTALACIÓN ELÉCTRICA ---
        { titulo: '¿Existe una instalación eléctrica?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Ubicación de los cuadros o del generador', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Se dispone de toma de tierra?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Las conexiones son adecuadas?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Se dispone de extintor de CO2?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿La ubicación de extintores es adecuada?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: 'Tendido de cables', respuesta: 3, tipo: FormApp.ItemType.RATING },
        { titulo: 'Estado de las mangueras y las conexiones', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Existen líneas de Alta Tensión en las proximidades?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Las líneas de alta tensión están bien identificadas?', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        
        // --- EQUIPOS, MEDIOS Y PROTECCIONES ---
        { titulo: '¿Equipos de trabajo que utiliza la empresa?', respuesta: ['Hormigonera', 'Maquinaria de elevación', 'Sierra circular'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿los equipos de trabajo que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Maquinaria de elevación que utiliza la empresa?', respuesta: ['Grúa Torre', 'Plataforma Elevadora Móvil de Personal (PEMP)'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿la maquinaria de elevación que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: 'Equipos de trabajo auxiliares que utilice la empresa en la obra', respuesta: ['Andamios tubulares', 'Escaleras de mano', 'Borriquetas'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿los equipos de trabajo auxiliares que utiliza la empresa en la obra están en buenas condiciones?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Medios de protección colectiva que afecten a la empresa?', respuesta: ['Redes', 'Barandillas', 'Marquesinas'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿los medios de protección que afecten a la empresa se encuentran en buenas condiciones?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Redes que afecten a la empresa?', respuesta: ['Tipo horca (Sistema V)'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿las redes que afectan a la empresa se encuentran en buenas condiciones?', respuesta: 4, tipo: FormApp.ItemType.RATING },

        // --- EPIs ---
        { titulo: '¿Equipos de Protección Individuales (EPI) necesarios según la actividad?', respuesta: ['Casco', 'Guantes', 'Calzado de seguridad', 'Gafas de protección'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿los trabajadores hacen uso adecuado de los Equipos de Protección Individual (EPI)?', respuesta: 5, tipo: FormApp.ItemType.RATING },
        { titulo: 'En general, ¿los Equipos de Protección Individual (EPI) se encuentran en buen estado de conservación y funcionamiento?', respuesta: 1, tipo: FormApp.ItemType.RATING },

        // --- RIESGOS HIGIÉNICOS Y ERGONÓMICOS ---
        { titulo: 'Se utilizan productos químicos por parte de la empresa visitada', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: '¿Se almacenan los productos químicos en lugares y condiciones adecuados?', respuesta: 3, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Están correctamente envasados y etiquetados los productos químicos?', respuesta: 4, tipo: FormApp.ItemType.RATING },
        { titulo: '¿Se planifica el trabajo teniendo en cuenta la meteorología (precipitaciones, viento, temperaturas extremas, etc.)?', respuesta: 'Si', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se han previsto medidas para proteger a las personas trabajadoras de los factores atmosféricos', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Las personas trabajadoras conocen los procedimientos de trabajo y pautas a seguir para prevenir los riesgos derivados de los factores atmosféricos', respuesta: 'Sí', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'Se dispone de medios de señalización que alertan de los peligros y equipos de medición que advierten de la presencia de ciertos factores atmosféricos', respuesta: 'No', tipo: FormApp.ItemType.MULTIPLE_CHOICE },
        { titulo: 'El trabajo realizado requiere:', respuesta: ['Manipular cargas de forma manual', 'Adoptar posturas forzadas', 'Movimientos repetitivos'], tipo: FormApp.ItemType.CHECKBOX },
        { titulo: 'En general, ¿cómo valorarías el equilibrio entre el esfuerzo físico requerido y la aplicación de medidas preventivas en el trabajo realizado?', respuesta: 3, tipo: FormApp.ItemType.RATING },
        
        // --- IMÁGENES (distribuidas correctamente) ---
        { titulo: 'Adjuntar imágenes (1 a 10)', respuesta: idsImagenes1a10, tipo: FormApp.ItemType.FILE_UPLOAD },
        { titulo: 'Adjuntar imágenes (11 a 20)', respuesta: idsImagenes11a20, tipo: FormApp.ItemType.FILE_UPLOAD },
        { titulo: 'Adjuntar imágenes (21 a 30)', respuesta: idsImagenes21a30, tipo: FormApp.ItemType.FILE_UPLOAD },
        { titulo: 'Adjuntar imágenes (31 a 40)', respuesta: idsImagenes31a40, tipo: FormApp.ItemType.FILE_UPLOAD },
        { titulo: 'Adjuntar imágenes (41 a 50)', respuesta: idsImagenes41a50, tipo: FormApp.ItemType.FILE_UPLOAD },

        // --- OBSERVACIONES Y FINAL ---
        { titulo: 'Utiliza este espacio para añadir cualquier comentario, aclaración o información relevante que consideres importante sobre el trabajo realizado o las condiciones evaluadas.', respuesta: 'Test completo con 20 empresas simuladas.', tipo: FormApp.ItemType.PARAGRAPH_TEXT },
        { titulo: 'Correo Adicional (Opcional):', respuesta: 'test.20empresas@flc.org', tipo: FormApp.ItemType.TEXT },
        { titulo: 'Hora Salida', respuesta: '14:00', tipo: FormApp.ItemType.TIME }
    ];

    return [...datosBase, ...datosEmpresas, ...datosFinales];
}
/**
 * Obtiene los IDs de las imágenes de una carpeta específica en Google Drive y las ordena numéricamente.
 * @returns {string[]} Un array con los IDs de las imágenes ordenados.
 */
function obtenerIdsDeImagenesDePrueba() {
  // ID de la carpeta que contiene las 30 imágenes de prueba.
  const folderId = '1K1o4Mmx7_OhEw7lSXVBEuM-vWZxXH3PT';
  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    const imageInfo = [];
    
    while (files.hasNext()) {
      const file = files.next();
      // Extraemos el número del nombre del archivo para poder ordenar.
      const fileName = file.getName();
      const fileNumber = parseInt(fileName.split('.')[0], 10);
      if (!isNaN(fileNumber)) {
        imageInfo.push({ number: fileNumber, id: file.getId() });
      }
    }
    
    // Ordenamos el array basándonos en el número extraído del nombre del archivo.
    imageInfo.sort((a, b) => a.number - b.number);
    
    Logger.log(`Se encontraron y ordenaron ${imageInfo.length} imágenes de la carpeta de prueba.`);
    // Devolvemos solo los IDs ya ordenados.
    return imageInfo.map(info => info.id);

  } catch (e) {
    Logger.log(`❌ ERROR al acceder a la carpeta de Drive "${folderId}": ${e.toString()}`);
    // Si hay un error (ej. permisos), devolvemos un array vacío para no detener la prueba.
    return [];
  }
}

const DATOS_DE_PRUEBA = generarDatosDePruebaCompletos();

/**
 * ===================================================================================
 * FUNCIÓN DE PRUEBA
 * ===================================================================================
 */
function enviarRespuestaDePrueba() {
  try {
    Logger.log('Iniciando la creación de una respuesta de prueba simulada...');

    const mockItemResponses = DATOS_DE_PRUEBA.map(dato => {
      return {
        getItem: () => ({
          getTitle: () => dato.titulo,
          getType: () => dato.tipo,
        }),
        getResponse: () => dato.respuesta
      };
    });

    const mockEvent = {
      response: {
        getItemResponses: () => mockItemResponses
      }
    };

    Logger.log('Objeto de evento simulado y completo creado. Llamando a "alEnviarFormulario"...');
    
    alEnviarFormulario(mockEvent);
    
    Logger.log('Prueba finalizada. "alEnviarFormulario" ha sido ejecutada. Revisa tu Google Drive para ver el informe de prueba.');

  } catch (error) {
    Logger.log(`❌ ERROR durante la ejecución de la prueba completa: ${error.toString()}\n${error.stack}`);
  }
}
