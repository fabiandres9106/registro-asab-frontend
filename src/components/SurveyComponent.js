import React, { useState, useEffect } from 'react';
import { Survey, Model } from 'survey-react-ui';
import 'survey-core/modern.min.css';
import showdown from 'showdown';

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
            name: "aceptacion_politica",
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
            choices: ["<18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
          },
          {
            type: "dropdown",
            name: "genero",
            title: "Género:",
            choices: ["Masculino", "Femenino", "No binario", "Prefiero no decir"]
          },
          {
            type: "dropdown",
            name: "localidad",
            title: "Localidad de residencia en Bogotá:",
            choices: [
              "Antonio Nariño", "Barrios Unidos", "Bosa", "Chapinero", "Ciudad Bolívar",
              "Engativá", "Fontibón", "Kennedy", "La Candelaria", "Los Mártires",
              "Puente Aranda", "Rafael Uribe Uribe", "San Cristóbal", "Santa Fe",
              "Suba", "Sumapaz", "Teusaquillo", "Tunjuelito", "Usaquén", "Usme"
            ]
          },
          {
            type: "dropdown",
            name: "nivel_educativo",
            title: "Nivel educativo:",
            choices: ["Primaria", "Secundaria", "Técnico", "Tecnológico", "Profesional", "Posgrado"]
          },
          {
            type: "dropdown",
            name: "perfil_ocupacional",
            title: "Perfil Ocupacional:",
            choices: ["Estudiante", "Empleado", "Independiente", "Desempleado", "Jubilado"]
          },
          {
            type: "dropdown",
            name: "vinculacion_teatral",
            title: "Vinculación al ámbito teatral:",
            choices: ["Ninguna", "Aficionado", "Estudiante de teatro", "Profesional del teatro"]
          }
        ]
      },
      {
        name: "Parte 4",
        elements: [
          {
            type: "ranking",
            name: "motivations",
            title: "Clasifica las siguientes motivaciones para asistir al espectáculo según tu preferencia:",
            choices: [
              "Cercanía a la función",
              "Gratuidad del evento",
              "Programación de la Temporada de Estrenos",
              "Por los artistas (actores, actrices, director o directora)",
              "Porque le gusta asistir a funciones teatrales",
              "Otras motivaciones (especificar)"
            ]
          },
          {
            type: "dropdown",
            name: "medio_informacion",
            title: "Medio principal a través del cuál se informó para asistir a la obra:",
            choices: ["Redes sociales", "Correo electrónico", "Página web", "Recomendación", "Otro"]
          },
          {
            type: "checkbox",
            name: "otros_eventos",
            title: "Otro tipo de eventos culturales al cual le gusta asistir:",
            choices: ["Conciertos", "Exposiciones", "Cine", "Danza", "Festivales", "Conferencias"]
          }
        ]
      }
    ]
  };

  const survey = new Model(surveyData);

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
    data.aceptacion_politica = data.aceptacion_politica.includes("true");
    data.comprension_datos = data.comprension_datos.includes("true");

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


