import React, { useState, useEffect } from 'react';
import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import '../css/SurveyComponent.css'
import { PlainLight } from "survey-core/themes/plain-light";

import showdown from 'showdown';

import "survey-core/i18n/spanish";



// Configurar Showdown
const converter = new showdown.Converter();

const SurveyComponent = () => {
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/functions/')
      .then(response => response.json())
      .then(data => setFunctions(data));
  }, []);

  const surveyData = {
    title: "Registro de Asistencia a Obras de Teatro",
    showProgressBar: "top",
    pages: [
      {
        name: "Parte 1",
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
        name: "Parte 2",
        elements: [
          {
            type: "text",
            name: "nombre",
            title: "Nombre y apellido:",
            isRequired: true
          },
          {
            type: "text",
            name: "correo",
            title: "Correo electrónico:",
            inputType: "email",
            isRequired: true
          },
          {
            type: "dropdown",
            name: "function_date",
            title: "Selecciona la fecha de la función:",
            isRequired: true,
            choices: functions.map(func => ({
              value: func.date,
              text: `Función del ${func.date} - Tickets disponibles: ${func.available_tickets}`
            }))
          }
        ]
      },
      {
        name: "Parte 3",
        elements: [
          {
            type: "dropdown",
            name: "edad",
            title: "Rango de edad:",
            choices: ["Menos de 18", "18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 o más"]
          },
          {
            type: "dropdown",
            name: "genero",
            title: "Género:",
            choices: ["Femenino", "Masculino", "No binario", "Otro", "Prefiero no decir"]
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
            ]
          },
          {
            type: "dropdown",
            name: "municipio_aledano",
            title: "Municipio aledaño a Bogotá:",
            visibleIf: "{localidad} = 'Fuera de Bogotá'",
            choices: [
              "Otra ciudad", "Bojacá", "Cajicá", "Chía", "Cogua", "Cota", "El Rosal", "Facatativá", "Funza", "Gachancipá", "La Calera", "Madrid", "Mosquera", "Nemocón", "Soacha", "Sibaté", "Sopó", "Tabio", "Tenjo", "Tocancipá", "Zipacón", "Zipaquirá"
            ]
          },
          {
            type: "dropdown",
            name: "nivel_educativo",
            title: "Nivel educativo:",
            choices: ["Primaria", "Bachillerato", "Técnico o Tecnólogo", "Pregrado universitario", "Especialización", "Maestría", "Doctorado"]
          },
          {
            type: "dropdown",
            name: "perfil_ocupacional",
            title: "Perfil Ocupacional:",
            choices: ["Artes", "Educación (Docencia)", "Ciencias sociales", "Ciencias Biológicas y de la Salud", "Administración o Finanzas", "Derecho", "Tecnología, comunicación y medios", "Ingenierías, Informática, Ciencias matemáticas y Físicas", "Otro"]
          },
          {
            type: "dropdown",
            name: "vinculacion_teatral",
            title: "¿Tienes o tuviste alguna ocupación vinculada al ámbito teatral (actuación, dirección, diseño, etc.)?",
            choices: ["Si", "No"]
          }
        ]
      },
      {
        name: "Parte 4",
        elements: [
          {
            type: "ranking",
            name: "motivations",
            title: "Motivación para asistir a la función",
            choices: [
              "Cercanía al lugar de la función",
              "Gratuidad del evento",
              "Programación de la Temporada de Estrenos",
              "Por los artistas (actores, actrices, director o directora)",
              "Porque le gusta asistir a funciones teatrales"
            ]
          },
          {
            type: "text",
            name: "otras_motivaciones",
            title: "Otras motivaciones",
          },
          {
            type: "dropdown",
            name: "medio_informacion",
            title: "Medio principal a través del cuál te informaste para asistir a la obra:",
            choices: ["Voz a voz", "Instagram", "Facebook", "Prensa", "Sitio web", "Radio"]
          },
          {
            type: "checkbox",
            name: "otros_eventos",
            title: "¿A que otro tipo de eventos culturales te gusta asistir?:",
            choices: ["Espectáculos de Danza y Festivales", "Música / Conciertos / Recitales", "Artes Visuales: Exposiciones y Ferias", "Eventos Literarios", "Audiovisuales: Festivales de cine / Exposiciones Fotográficas"]
          }
        ]
      }
    ]
  };

  const survey = new Model(surveyData);

  survey.applyTheme(PlainLight);

  survey.locale = "es";

  survey.onTextMarkdown.add(function (survey, options) {
    // Convertir el texto de Markdown a HTML
    let str = converter.makeHtml(options.text);
    // Eliminar las etiquetas <p> agregadas por defecto
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    options.html = str;
  });

  survey.onComplete.add((result) => {
    const data = result.data;

    fetch('http://localhost:8000/api/survey/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There was a problem with your fetch operation:', error));
  });

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
};

export default SurveyComponent;


