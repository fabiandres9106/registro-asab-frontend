// src/components/EventList.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Container, Button } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import publicApiClient from "./axiosPublicConfig";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        publicApiClient.get('/events/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching Events: ', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEvents = events.filter(event =>
        event.nombre_evento && event.nombre_evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Eventos
            </Typography>
            <TextField
                label="Buscar eventos"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del evento</TableCell>
                            <TableCell>Teatro</TableCell>
                            <TableCell>Producción</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Cantidad de Funciones</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEvents.map(event => (
                            <TableRow key={event.id}>
                                <TableCell>{event.nombre_evento}</TableCell>
                                <TableCell>{event.teatro}</TableCell>
                                <TableCell>{event.produccion}</TableCell>
                                <TableCell>{event.direccion}</TableCell>
                                <TableCell>{event.event_dates_count}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={RouterLink}
                                        to={`/admin/events/${event.id}/event_dates_list`}
                                    >
                                        Ver evento
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EventList;