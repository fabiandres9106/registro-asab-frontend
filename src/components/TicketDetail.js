import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TicketDetail = () => {
    const { ticketDetailId } = useParams();
    const [ ticketDetail, setTicketDetail] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/events/1/tickets/${ticketDetailId}`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
            .then(response => {
                setTicketDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching response detail: ', error)
            });
    }, [ticketDetailId]);

    if (!ticketDetail) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Detalle del Ticket</h1>
            <p>Número del Ticket: {ticketDetail.ticket_number}</p>
            <p>Persona: {ticketDetail.person.nombre}</p>
            <p>Check In: {ticketDetail.check_in ? "Si" : "No"}</p>
            <p>Fecha de creación: {ticketDetail.created_at}</p>
        </div>
    );
};

export default TicketDetail;