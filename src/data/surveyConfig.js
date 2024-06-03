export const surveyData = {
  title: "<span class='title1'>Registro de asistencia</span><br><span class='title2'>Yo, Hedda Gabler</span><br><span class='title3'>Temporada de Estrenos ASAB</span>​",
  showProgressBar: "top",
  pageNextText: "Siguiente",
  pagePrevText: "Anterior",
  completeText: "Registrarme",
  showPrevButton: false,
  goNextPageAutomatic: true,
  allowCompleteSurveyAutomatic: true,
  completedHtml: `
    <h5>¡Gracias por registrarte!</h5>
    <p>Este trabajo se realiza en el marco del proyecto de investigación <strong>Análisis de la escénificación</strong> en el área de <strong>Públicos</strong> del <strong>Grupo de Investigación Dramaturgias del Cuerpo y Escrituras del Espacio</strong>. Estamos interesados en conocer a los públicos que asisten a las funciones teatrales en la Temporada de Estrenos de la Facultad de Artes ASAB. Si deseas conocer más detalles sobre este proceso, haz clic <a href="#">aquí</a>.</p>
    <p><strong>Al finalizar la función se te enviará una encuesta vía correo electrónico en la cual quisieramos saber tus percepciones sobre la obra, la sala de teatro y la logística de ingreso.</strong></p>
    <p>Por último, te aseguramos que tus datos serán almacenados de forma confidencial y utilizados únicamente con fines académicos e investigativos. Si necesitas más información, por favor consulta nuestros <a href="#">Política de Tratamiento de Datos</a>.</p>
  `,
  showQuestionNumbers: "off",
  pages: [
    {
      name: "Bienvenida",
      elements: [
        {
          type: "html",
          name: "informative_message",
          html: `
            <h4>¡Bienvenida/o al <strong>Registro de asistencia</strong> para la Temporada de Estrenos de la Facultad de Artes ASAB!</h4>
            <p>Antes de registrarte, queremos contarte que estamos trabajando en el marco del proyecto de investigación <strong>Análisis de la escenificación</strong> en el área de <strong>Públicos</strong> del <strong>Grupo de Investigación Dramaturgias del Cuerpo y Escrituras del Espacio</strong>. Estamos interesados en conocer a los públicos que asisten a las funciones teatrales en la Temporada de Estrenos de la Facultad de Artes ASAB. Si deseas conocer más detalles sobre este proceso, haz clic <a href="#">aquí</a>.</p>
            <p><strong>Al finalizar la función se te enviará una encuesta vía correo electrónico en la cual quisieramos saber tus percepciones sobre la obra, la sala de teatro y la logística de ingreso.</strong></p>
            <p>Por último, te aseguramos que tus datos serán almacenados de forma confidencial y utilizados únicamente con fines académicos e investigativos. Si necesitas más información, por favor consulta nuestros <a href="#">Política de Tratamiento de Datos</a>.</p>
            <p><strong>¡Gracias por ayudarnos a construir el conocimiento sobre los espectadores teatrales de la Temporada de Estrenos ASAB!</strong></p>
          `
        },
        {
          type: "checkbox",
          name: "politica_datos",
          title: "Aceptación de política de datos",
          titleLocation: "hidden", // Ocultar el título
          isRequired: true,
          requiredErrorText: "Por favor marca la casilla",
          choices: [
            { 
              value: "true",
              text: "Acepto la Política de Tratamiento de Datos [Política de Tratamiento de Datos](#)"
            }
          ]
        },
        {
          type: "checkbox",
          name: "comprension_datos",
          title: "Comprensión de datos",
          titleLocation: "hidden", // Ocultar el título
          isRequired: true,
          requiredErrorText: "Por favor marca la casilla",
          choices: [
            { 
              value: "true",
              text: "Comprendo que los datos recogidos a través del presente formulario tienen un fin académico e investigativo y no serán usados para otros fines."
            }
          ]
        }
      ]
    },
    {
      name: "Datos Básicos",
      elements: [
        {
          type: "html",
          name: "informative_message",
          html: `
            <h4>Datos de asistencia</h4>
            <p>En esta parte solamente requerimos algunos datos básicos para saber quién eres, cual es la obra a la que deseas asistir, el día y la hora.</p>
          `
        },
        {
          type: "text",
          name: "nombre",
          title: "Nombres y apellidos:",
          isRequired: true,
          requiredErrorText: "Por favor ingresa tu nombre y apellido",
          placeholder: "Por favor ingresa tu nombre completo"
        },
        {
          type: "text",
          name: "correo",
          title: "Correo electrónico:",
          inputType: "email",
          isRequired: true,
          requiredErrorText: "Por favor ingresa tu email",
          description: "Por favor verifica que tu correo electrónico está correctamente escrito.",
          validators: [
            {
              "type": "email"
            }
          ]
        },
        {
          type: "dropdown",
          name: "event_date",
          title: "Selecciona la fecha de la función:",
          isRequired: true,
          requiredErrorText: "Por favor selecciona el día y la hora de la función",
          placeholder: "Selecciona...",
          choices: []
        }
      ]
    },
    {
      name: "Datos Demográficos",
      elements: [
        {
          type: "html",
          name: "informative_message",
          html: `
            <h4>Datos Demográficos</h4>
            <p>Agradecemos tus respuestas para poder hacer un perfil más específico de los asistentes a las funciones en la Temporada de Estrenos ASAB.</p>
          `
        },
        {
          type: "dropdown",
          name: "edad",
          title: "Rango de edad:",
          choices: ["Menos de 18", "18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 o más"],
          placeholder: "Selecciona tu rango de edad",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "genero",
          title: "Género:",
          choices: ["Femenino", "Masculino", "No binario", "Otro", "Prefiero no decir"],
          placeholder: "Por favor selecciona una respuesta",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "localidad",
          title: "Localidad de residencia",
          choices: [
            "Fuera de Bogotá", "Antonio Nariño", "Barrios Unidos", "Bosa", "Chapinero", "Ciudad Bolívar",
            "Engativá", "Fontibón", "Kennedy", "La Candelaria", "Los Mártires",
            "Puente Aranda", "Rafael Uribe Uribe", "San Cristóbal", "Santa Fe",
            "Suba", "Sumapaz", "Teusaquillo", "Tunjuelito", "Usaquén", "Usme"
          ],
          description: 'Si no resides en Bogotá, por favor selecciona "Fuera de Bogotá"',
          placeholder: "Selecciona...",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "municipio_aledano",
          title: "Municipio aledaño a Bogotá:",
          visibleIf: "{localidad} = 'Fuera de Bogotá'",
          choices: [
            "Otra ciudad", "Bojacá", "Cajicá", "Chía", "Cogua", "Cota", "El Rosal", "Facatativá", "Funza", "Gachancipá", "La Calera", "Madrid", "Mosquera", "Nemocón", "Soacha", "Sibaté", "Sopó", "Tabio", "Tenjo", "Tocancipá", "Zipacón", "Zipaquirá"
          ],
          description: 'Si no vienes de un municipio cercano a Bogotá, por favor selecciona "Otra ciudad".',
          placeholder: 'Selecciona',
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "nivel_educativo",
          title: "Nivel educativo:",
          choices: ["Primaria", "Bachillerato", "Técnico o Tecnólogo", "Pregrado universitario", "Especialización", "Maestría", "Doctorado"],
          placeholder: 'Por favor selecciona tu nivel educativo.',
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "perfil_ocupacional",
          title: "Perfil Ocupacional:",
          choices: ["Artes", "Educación (Docencia)", "Ciencias sociales", "Ciencias Biológicas y de la Salud", "Administración o Finanzas", "Derecho", "Tecnología, comunicación y medios", "Ingenierías, Informática, Ciencias matemáticas y Físicas", "Otro"],
          placeholder: 'Por favor selecciona tu perfil ocupacional',
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "vinculacion_teatral",
          title: "¿Tienes o tuviste alguna ocupación vinculada al ámbito teatral (actuación, dirección, diseño, etc.)?",
          choices: ["Si", "No"],
          placeholder: 'Por favor selecciona una respuesta',
          isRequired: true,
        }
      ]
    },
    {
      name: "Motivaciones, medio informativo y consumo cultural",
      elements: [
        {
          type: "html",
          name: "informative_message",
          html: `
            <h4>Motivación para asistir a la función</h4>
            <p>Cuéntanos los motivos por los cuales estás interesado en asistir a la función. Por favor, organízalos de mayor a menor importancia de 1 a 5</p><p>Para organizar las motivaciones, debes dar clic sostenido en el item que quieras mover y luego ubicarlo en el orden que quieras.</p>
          `
        },
        {
          type: "ranking",
          name: "motivations",
          title: "Motivación para asistir a la función",
          titleLocation: "hidden",
          isRequired: true,
          choices: [
            "Cercanía al lugar de la función",
            "Gratuidad del evento",
            "Programación de la Temporada de Estrenos",
            "Por los artistas (actores, actrices, director o directora)",
            "Porque te gusta asistir a funciones teatrales"
          ]
        },
        {
          type: "text",
          name: "otras_motivaciones",
          title: "Otras motivaciones",
        },
        {
          type: "html",
          name: "informative_message",
          html: `
            <h4>Preguntas finales</h4>
            <p>¡Estás a punto de terminar! Gracias por tomarte el tiempo para diligenciar el formulario. Al finalizar, por favor da clic en el botón <strong>"Registrarme"</strong> ubicado al final y estarás en lista para asistir a la función seleccionada.</p>
          `
        },
        {
          type: "dropdown",
          name: "medio_informacion",
          title: "Medio principal a través del cuál te informaste para asistir a la obra:",
          choices: ["Voz a voz", "Instagram", "Facebook", "Prensa", "Sitio web", "Radio"],
          isRequired: true,
        },
        {
          type: "checkbox",
          name: "otros_eventos",
          title: "¿A que otro tipo de eventos culturales te gusta asistir?:",
          description: "Puedes seleccionar más de una opción",
          choices: ["Espectáculos de Danza y Festivales", "Música / Conciertos / Recitales", "Artes Visuales: Exposiciones y Ferias", "Eventos Literarios", "Audiovisuales: Festivales de cine / Exposiciones Fotográficas"],
          isRequired: true,
        }
      ]
    }
  ]
};