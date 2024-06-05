import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Container, Button, Box } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';

const TicketList = () => {
    const { eventDateId } = useParams();
    const [ tickets, setTickets ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ eventInfo, setEventInfo ] = useState([]);

    

    useEffect(() => {

        // Búsqueda de tickets por evento
        axios.get(`http://127.0.0.1:8000/api/events/${eventDateId}/tickets`)
        .then(response => {
            setTickets(response.data);
        }).catch(error => {
            console.error('error fetching responses: ', error)
        });

        // Búsqueda de Información del evento
        axios.get(`http://127.0.0.1:8000/api/event_dates/${eventDateId}`)
        .then(response => {
            setEventInfo(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error('error fetching eventInfo: ', error)
        });
    }, [eventDateId]);

    
    const refreshEventInfo = () => {
        axios.get(`http://127.0.0.1:8000/api/event_dates/${eventDateId}`)
            .then(response => {
                setEventInfo(response.data);
            })
            .catch(error => {
                console.error('Error refreshing event info: ', error);
            });
    };

    // Actualización de CheckIn del usuario en BD

    const handleCheckIn = (ticketId) => {
        axios.patch(`http://127.0.0.1:8000/api/ticket/${ticketId}/update`, { check_in: true })
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
        axios.patch(`http://127.0.0.1:8000/api/ticket/${ticketId}/update`, { check_in: false })
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
        <Container  sx={{ m: 0, p: 0, width:"100%" }}>
            <Box
                sx={{
                display: 'block',
                backgroundColor: '#f0f0f0',
                padding: 4,
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ my:'10px' }}>
                    Tickets - Hedda Gabler
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
                                <TableCell  sx={{ width: '20%' }}>TICKET</TableCell>
                                <TableCell sx={{ width: '50%' }}>NOMBRE</TableCell>
                                <TableCell sx={{ width: '30%' }}>CHECK-IN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell sx={{ width: '20%', p: '10px' }}>{ticket.ticket_number}</TableCell>
                                    <TableCell sx={{ width: '50%', p: '10px'  }}>{ticket.person.nombre}</TableCell>
                                    <TableCell sx={{ width: '30%', p: '10px' }}>
                                    {ticket.check_in && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{
                                                minWidth: '48px',
                                                width: '48px',
                                                height: '48px',
                                                padding: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
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
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
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
            </Box>
        </Container>
    );

}

export default TicketList;
