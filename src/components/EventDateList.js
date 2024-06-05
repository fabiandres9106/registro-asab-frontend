import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Container, Button } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';


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
        <Container>
            <Typography variant="h4" gutterBottom> 
                Fechas para el evento {eventId}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha del evento</TableCell>
                            <TableCell>Total Tickets</TableCell>
                            <TableCell>Tickets Disponibles</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {event_dates.map( response => (
                    <TableRow key={response.id}>
                        <TableCell>{new Date(response.date_time).toLocaleString('es-ES', {dateStyle: 'medium', timeStyle: 'short', hour12: true})}</TableCell>
                        <TableCell>{response.available_tickets}</TableCell>
                        <TableCell>{response.tickets_not_reserved}</TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to={`/admin/events/${response.id}/ticket_list`}
                            >
                                Ver Tickets
                            </Button>
                        </TableCell>
                    </TableRow>
                    ) )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default EventDateList;