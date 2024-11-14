import React, { useState, useEffect } from 'react';
import { Survey, Model } from 'survey-react-ui';
import publicApiClient from './axiosPublicConfig';
import axios from 'axios';
import 'survey-core/defaultV2.min.css';
import '../css/SurveyComponent.css'
import { DefaultDark } from "survey-core/themes/default-dark";
import { surveyData } from "../data/surveyConfig"
import { surveyTheme } from "../data/surveyTheme.js"

import showdown from 'showdown';

import "survey-core/i18n/spanish";
import { surveyLocalization } from 'survey-core';
import { Password } from '@mui/icons-material';


const esLocale = surveyLocalization.locales['es'];
esLocale.invalidEmail = "Por favor ingresa un email válido.";


// Configurar Showdown
const converter = new showdown.Converter();



const SurveyComponent = () => {
  const [event_dates, setEventsDates] = useState([]);

  useEffect(() => {
    publicApiClient.get('/event/1/event_dates') // Hace falta actualizar esta url porque aún no está recibiendo el parámetro del id del evento, sino que se está llamando al evento piloto 2 BWitches
      .then(response => setEventsDates(response.data))
      .catch(error => console.error('Error fetching functions: ', error));
  }, []);

  const survey = new Model(surveyData);

  survey.applyTheme(DefaultDark);
  survey.applyTheme(surveyTheme)

  survey.locale = "es";

  // Actualizar las opciones del dropdown de funciones
  const availableEvents = event_dates.filter(event => event.tickets_not_reserved > 0);
  survey.getQuestionByName('event_date').choices = availableEvents.map(event => ({
    value: event.id,
    text: `${new Date(event.date_time).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short', hour12: true })} - Tickets disponibles: ${event.tickets_not_reserved}`
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

    let userId, surveyId;

    // Verificar si el email ya existe
    publicApiClient.get(`/users/email_exists/${data.correo}`)
      .then(response => {
        if (response.data.exists) {
          // El email existe, continuar con survey y ticket
          userId = response.data.user_id;
          return Promise.resolve(); // Pasar a la siguiente promesa en la cadena
        } else {
          // Crear usuario
          return publicApiClient.post('/users/create', {
            email: data.correo,
            password: data.correo,
            name: data.nombre,
            localidad: data.localidad,
            municipio_aledano: data.municipio_aledano,
            policy_agreed: data.comprension_datos,
            roles: [4]
          }).then(response => {
            userId = response.data.id;
            console.log('User created with ID:', userId);
          });
        }
      })
      .then(() => {
        // Crear encuesta
        return publicApiClient.post('/survey', {
          user_id: userId,
          age: data.edad,
          genere: data.genero,
          education: data.nivel_educativo,
          occupation: data.perfil_ocupacional,
          relationship_theatre: data.vinculacion_teatral,
          motivations: data.motivations,
          others_motivations: data.otras_motivaciones,
          information_medium: data.medio_informacion,
          other_events: data.otros_eventos,
          permision_research: data.comprension_datos,
        });
      })
      .then(response => {
        surveyId = response.data.id;
        console.log('Survey created with ID:', surveyId);
        // Crear ticket
        return publicApiClient.post('/ticket', {
          event_date_id: data.event_date,
          user_id: userId,
          ticket_name: data.nombre,
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


