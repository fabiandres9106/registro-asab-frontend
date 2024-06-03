import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketList = () => {
    const { eventDateId } = useParams();
    const [ tickets, setTickets ] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/events/${eventDateId}/tickets`)
        .then(response => {
            setTickets(response.data);
        }).catch(error => {
            console.error('error fetching responses: ', error)
        });
    }, [eventDateId]);

    const handleCheckIn = (ticketId) => {
        axios.patch(`http://127.0.0.1:8000/api/ticket/${ticketId}/update`, { check_in: true })
            .then(response => {
                setTickets(prevTickets => prevTickets.map(ticket => 
                    ticket.id === ticketId ? { ...ticket, check_in: true } : ticket
                ));
            })
            .catch(error => {
                console.error('Error updating check_in status: ', error);
            });
    };

    return (
        <div>
            <h1>Tickets del Evento {eventDateId}</h1>
            <ul>
                {tickets.map( ticket => (
                    <li key={ticket.id}>
                        <a href={`/admin/events/${eventDateId}/tickets/${ticket.id}`}>
                            Número de ticket: {ticket.ticket_number} - Check in: {ticket.check_in ? "Si" : "No"}
                        </a>
                        {!ticket.check_in && (
                            <button onClick={() => handleCheckIn(ticket.id)}>Check In</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TicketList;
