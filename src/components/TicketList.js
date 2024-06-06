import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Container, Button, Box, Fab } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';
import RefreshIcon from '@mui/icons-material/Refresh';

import publicApiClient from "./axiosPublicConfig";

const TicketList = () => {
    const { eventDateId } = useParams();
    const [ tickets, setTickets ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ eventInfo, setEventInfo ] = useState([]);

    // Función para obtener los tickets
    const fetchTickets = () => {
        publicApiClient.get(`/events/${eventDateId}/tickets`)
        .then(response => {
            setTickets(response.data);
        }).catch(error => {
            console.error('error fetching responses: ', error)
        });
        refreshEventInfo();
    };

    useEffect(() => {
        fetchTickets();
    }, [eventDateId])

    useEffect(() => {

        // Búsqueda de Información del evento
        publicApiClient.get(`/event_dates/${eventDateId}`)
        .then(response => {
            setEventInfo(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error('error fetching eventInfo: ', error)
        });
    }, [eventDateId]);


    
    const refreshEventInfo = () => {
        publicApiClient.get(`/event_dates/${eventDateId}`)
            .then(response => {
                setEventInfo(response.data);
            })
            .catch(error => {
                console.error('Error refreshing event info: ', error);
            });
    };

    // Actualización de CheckIn del usuario en BD

    const handleCheckIn = (ticketId) => {
        publicApiClient.patch(`/ticket/${ticketId}/update`, { check_in: true })
            .then(response => {
                setTickets(prevTickets => prevTickets.map(ticket => 
                    ticket.id === ticketId ? { ...ticket, check_in: true } : ticket
                ));
                refreshEventInfo();
            })
            .catch(error => {
                console.error('Error updating check_in status: ', error);
            });

    };

    // Actualización de CheckOut del usuario en BD

    const handleCheckOut = (ticketId) => {
        publicApiClient.patch(`/ticket/${ticketId}/update`, { check_in: false })
            .then(response => {
                setTickets(prevTickets => prevTickets.map(ticket => 
                    ticket.id === ticketId ? { ...ticket, check_in: false } : ticket
                ));
                refreshEventInfo();
            })
            .catch(error => {
                console.error('Error updating check_in status: ', error);
            });
    };

    // Búsqueda de ticket

    const handleSearchChange = (ticket) => {
        setSearchTerm(ticket.target.value);
    };

    // Filtro en Búsqueda de Ticket

    const filteredTickets = tickets.filter(ticket =>
        ticket.person.nombre && ticket.person.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <Container  sx={{ m: 0, p: 0, width:"100%"}}>
            <Box
                sx={{
                display: 'block',
                backgroundColor: '#f0f0f0',
                padding: 4,
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ my:'10px' }}>
                    Tickets - Yo, Hedda Gabler
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        py: '5px'
                    }}
                >
                    <CalendarTodayIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                    Fecha: {new Date(eventInfo.date_time).toLocaleString('es-ES', {dateStyle: 'medium', timeStyle: 'short', hour12: true})}
                    </Typography> 
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        my: '5px'
                    }}
                >
                    <ConfirmationNumberSharpIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                        Tickets disponibles: { eventInfo.available_tickets - eventInfo.tickets_checkin }
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        py: '5px'
                    }}
                >
                    <LocalActivitySharpIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                        Tickets reservados: { eventInfo.tickets_reserved }
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    m: 3,
                }}
            >
                <TextField
                    label="Buscar tickets"
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
                                <TableCell  sx={{ width: '20%', p:'10px' }}>TICKET</TableCell>
                                <TableCell sx={{ width: '55%', p:'10px' }}>NOMBRE</TableCell>
                                <TableCell sx={{ width: '25%', p:'10px', textAlign: 'right', fontSize:'0.7rem' }}>CHECK-IN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell sx={{ width: '20%', p: '10px' }}>{ticket.ticket_number}</TableCell>
                                    <TableCell sx={{ width: '55%', p: '10px'  }}>{ticket.person.nombre}</TableCell>
                                    <TableCell sx={{ width: '25%', p: '10px', textAlign: 'right' }}>
                                    {ticket.check_in && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{
                                                minWidth: '48px',
                                                width: '48px',
                                                height: '48px',
                                                padding: 0,
                                            }}
                                            onClick={() => handleCheckOut(ticket.id)}
                                        >
                                            <CheckCircleIcon />
                                        </Button>
                                    )}
                                    {!ticket.check_in && (
                                        <Button
                                        variant="contained"
                                        color="warning"
                                        sx={{
                                            minWidth: '48px',
                                            width: '48px',
                                            height: '48px',
                                            padding: 0,
                                        }}
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
                <Fab 
                    color="primary" 
                    aria-label="refresh" 
                    sx={{ position: 'fixed', bottom: 16, right: 16 }} 
                    onClick={fetchTickets}
                >
                    <RefreshIcon />
                </Fab>
            </Box>
        </Container>
    );
}

export default TicketList;
