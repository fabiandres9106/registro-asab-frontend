import React, {useState, useEffect} from "react";
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/events/') // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/api/functions/
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching Events: ', error)
            });
    }, []);

    return (
        <div>
            <h1>Funciones</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}> 
                        <a href={`/admin/events/${event.id}/event_dates_list`}>{`Nombre evento: ${event.nombre_evento} - Lugar: ${event.teatro} - produccion: ${event.produccion} - direccion: ${event.direccion} - cantidad de fechas: ${event.event_dates_count}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;