import React from 'react';
import { Survey, Model } from 'survey-react-ui';
import 'survey-core/modern.min.css';

const SurveyComponent = () => {
  const surveyData = {
    title: "Encuesta de Motivaciones",
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
        type: "text",
        name: "nombre",
        title: "Nombre:",
        isRequired: true
      },
      {
        type: "dropdown",
        name: "edad",
        title: "Edad:",
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
      }
    ]
  };

  const survey = new Model(surveyData);

  survey.onComplete.add((result) => {
    fetch('http://localhost:8000/api/survey/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result.data)
    }).then(response => response.json())
      .then(data => console.log(data));
  });

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
};

export default SurveyComponent;
