import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Container, Button, Box, Fab } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';
import RefreshIcon from '@mui/icons-material/Refresh';

import publicApiClient from "./axiosPublicConfig";

const TicketList = () => {
    const { eventDateId } = useParams();
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [eventDateInfo, setEventDateInfo] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);

    // Función para obtener los tickets y el estado del evento y fecha
    const fetchTickets = () => {
        publicApiClient.get(`/event_date/${eventDateId}/tickets`)
            .then(response => {
                setTickets(response.data);
            }).catch(error => {
                console.error('Error fetching tickets:', error);
            });
    };

    useEffect(() => {
        fetchTickets();
        fetchEventDateInfo();
    }, [eventDateId]);

    const fetchEventDateInfo = () => {
        publicApiClient.get(`/event_date/${eventDateId}`)
            .then(response => {
                setEventDateInfo(response.data);
                fetchEventInfo(response.data.event_id);
            }).catch(error => {
                console.error('Error fetching eventDateInfo:', error);
            });
    };

    const fetchEventInfo = (eventId) => {
        publicApiClient.get(`/event/${eventId}`)
            .then(response => {
                setEventInfo(response.data);
            }).catch(error => {
                console.error('Error fetching eventInfo:', error);
            });
    };

    // Actualización de CheckIn del usuario en BD
    const handleCheckIn = (ticketId) => {
        publicApiClient.patch(`/ticket/${ticketId}`, { check_in: true })
            .then(() => {
                setTickets(prevTickets => prevTickets.map(ticket => 
                    ticket.id === ticketId ? { ...ticket, check_in: true } : ticket
                ));
                setEventDateInfo(prevInfo => ({
                    ...prevInfo,
                    tickets_checkin: prevInfo.tickets_checkin + 1
                }));
            }).catch(error => {
                console.error('Error updating check_in status:', error);
            });
    };

    // Actualización de CheckOut del usuario en BD
    const handleCheckOut = (ticketId) => {
        publicApiClient.patch(`/ticket/${ticketId}`, { check_in: false })
            .then(() => {
                setTickets(prevTickets => prevTickets.map(ticket => 
                    ticket.id === ticketId ? { ...ticket, check_in: false } : ticket
                ));
                setEventDateInfo(prevInfo => ({
                    ...prevInfo,
                    tickets_checkin: prevInfo.tickets_checkin - 1
                }));
            }).catch(error => {
                console.error('Error updating check_out status:', error);
            });
    };
    

    // Búsqueda de ticket
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtro en Búsqueda de Ticket
    const filteredTickets = tickets.filter(ticket =>
        ticket.user.name && ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <Container sx={{ m: 0, p: 0, width: "100%" }}>
            <Box sx={{ display: 'block', backgroundColor: '#f0f0f0', padding: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ my: '10px' }}>
                    Tickets - {eventInfo.event_name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'middle', py: '5px' }}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: '5px' }} />
                    <Typography variant="h5">
                        Fecha: {new Date(eventDateInfo.date_time).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short', hour12: true })}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'middle', my: '5px' }}>
                    <ConfirmationNumberSharpIcon fontSize="small" sx={{ mr: '5px' }} />
                    <Typography variant="h5">
                        Tickets sin Check-In: {eventDateInfo.available_tickets - eventDateInfo.tickets_checkin}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'middle', my: '5px' }}>
                    <ConfirmationNumberSharpIcon fontSize="small" sx={{ mr: '5px' }} />
                    <Typography variant="h5">
                        Tickets Check-In: {eventDateInfo.tickets_checkin}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'middle', py: '5px' }}>
                    <LocalActivitySharpIcon fontSize="small" sx={{ mr: '5px' }} />
                    <Typography variant="h5">
                        Tickets reservados: {eventDateInfo.tickets_reserved}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ m: 3 }}>
                <TextField
                    label="Buscar tickets"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '20%', p: '10px' }}>TICKET</TableCell>
                                <TableCell sx={{ width: '55%', p: '10px' }}>NOMBRE</TableCell>
                                <TableCell sx={{ width: '25%', p: '10px', textAlign: 'right' }}>CHECK-IN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.ticket_number}</TableCell>
                                    <TableCell>{ticket.ticket_name}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        {ticket.check_in ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleCheckOut(ticket.id)}
                                            >
                                                <CheckCircleIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => handleCheckIn(ticket.id)}
                                            >
                                                <AccessTimeFilledIcon />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab color="primary" aria-label="refresh" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={fetchTickets}>
                    <RefreshIcon />
                </Fab>
            </Box>
        </Container>
    );
}

export default TicketList;
