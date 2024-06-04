import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import publicApiClient from "./axiosPublicConfig";

const EventDateList = () => {
    const { eventId } = useParams(); 
    const [event_dates, setEventDates] = useState([]);

    useEffect(() => {
        publicApiClient.get(`/events/${eventId}/event_dates`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
            .then(response => {
                setEventDates(response.data);
            })
            .catch(error => {
                console.error('Error fetching responses: ', error);
            });
    }, [eventId]);

    return (
        <div>
            <h1>Fechas para el evento {eventId}</h1>
            <ul>
                {event_dates.map( response => (
                    <li key={response.id}>
                        <a href={`/admin/event_date/${response.id}`}>Fecha del evento: {new Date(response.date_time).toLocaleString('es-ES', {dateStyle: 'medium', timeStyle: 'short', hour12: true})} - Total Tickets: {response.available_tickets} - Tickets disponibles: {response.tickets_not_reserved}</a>
                    </li>
                ) )}
            </ul>
        </div>
    );
}

export default EventDateList;