import React, { useState, useEffect } from 'react';
import { Survey, Model } from 'survey-react-ui';
import publicApiClient from './axiosPublicConfig';
import axios from 'axios';
import 'survey-core/defaultV2.min.css';
import '../css/SurveyComponent.css'
import { PlainLight } from "survey-core/themes/plain-light";
import { surveyData } from "../data/surveyConfig"

import showdown from 'showdown';

import "survey-core/i18n/spanish";
import { surveyLocalization } from 'survey-core';


const esLocale = surveyLocalization.locales['es'];
esLocale.invalidEmail = "Por favor ingresa un email válido.";


// Configurar Showdown
const converter = new showdown.Converter();

const SurveyComponent = () => {
  const [event_dates, setEventsDates] = useState([]);

  useEffect(() => {
    publicApiClient.get('/events/1/event_dates') // Hace falta actualizar esta url porque aún no está recibiendo el parámetro del id del evento, sino que se está llamando al evento piloto 1 Hedda Gabbler
      .then(response => setEventsDates(response.data))
      .catch(error => console.error('Error fetching functions: ', error));
  }, []);

  const survey = new Model(surveyData);

  survey.applyTheme(PlainLight);

  survey.locale = "es";

  // Actualizar las opciones del dropdown de funciones
  survey.getQuestionByName('event_date').choices = event_dates.map(event => ({
    value: event.id,
    text: `Función del ${new Date(event.date_time).toLocaleString('es-ES', {dateStyle: 'medium', timeStyle: 'short', hour12: true})} - Tickets disponibles: ${event.tickets_not_reserved}`
  }));

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

    data.politica_datos = data.politica_datos.includes("true");
    data.comprension_datos = data.comprension_datos.includes("true");

    //  Enviar datos de la persona
    axios.post('http://127.0.0.1:8000/api/persons/', {
      nombre: data.nombre,
      correo: data.correo,
      edad: data.edad,
      genero: data.genero,
      localidad: data.localidad,
      municipio_aledano: data.municipio_aledano,
      nivel_educativo: data.nivel_educativo,
      perfil_ocupacional: data.perfil_ocupacional,
      vinculacion_teatral: data.vinculacion_teatral,
      motivations: data.motivations,
      otras_motivaciones: data.otras_motivaciones,
      medio_informacion: data.medio_informacion,
      otros_eventos: data.otros_eventos,
      comprension_datos: data.comprension_datos,
      politica_datos: data.politica_datos
    })
    .then(response => {
      const personId = response.data.id;
      console.log(personId);
      // Enviar datos del ticket
      return axios.post('http://127.0.0.1:8000/api/tickets/', {
        event_date: data.event_date,
        person: personId,
      });
    })
    .then(response => {
      console.log('Ticket created: ', response.data);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation', error);
    });
  });

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
};

export default SurveyComponent;


