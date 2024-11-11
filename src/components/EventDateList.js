import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, Container, Button } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import IconButton from '@mui/material/IconButton';

import { Link as RouterLink } from 'react-router-dom';


import publicApiClient from "./axiosPublicConfig";
import axios from "axios";

import HomeIcon from '@mui/icons-material/Home';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PersonIcon from '@mui/icons-material/Person';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';

const EventDateList = () => {
    const { eventId } = useParams(); 
    const [event_dates, setEventDates] = useState([]);
    const [ eventInfo, setEventInfo ] = useState([]);
    const [stageID, setStageID] = useState([]);
    const [stageInfo, setStageInfo] = useState([]);

    useEffect(() => {
        publicApiClient.get(`/event/${eventId}/event_dates`)
            .then(response => {
                setEventDates(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching responses: ', error);
            });
    }, [eventId]);

    useEffect(() => {
        publicApiClient.get(`/event/${eventId}`)
            .then(response => {
                console.log('Event Info: ', response.data);
                setEventInfo(response.data);
                setStageID(response.data.stage_id)
            })
            .catch(error => {
                console.error('Error fetching eventInfo: ', error);
            });
    }, [eventId]);

    useEffect(() => {
        if (stageID) {
            publicApiClient.get(`/stage/${stageID}`)
                .then(response => {
                    setStageInfo(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching stageInfo: ', error);
                });
        }
    }, [stageID]);

    return (
        <Container sx={{ m: 0, p: 0, width:"100%"}}>
            <Box
                sx={{
                display: 'block',
                backgroundColor: '#f0f0f0',
                padding: 4,
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ my:'10px' }}>
                    {eventInfo.event_name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        py: '5px'
                    }}
                >
                    <HomeIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                    <b>Escenario:</b> {stageInfo.stage_name}
                    </Typography> 
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        my: '5px'
                    }}
                >
                    <PsychologyIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                        <b>Producción:</b> Facultad de Artes ASAB - Universidad Distrital Francisco José de Caldas 
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        py: '5px'
                    }}
                >
                    <PersonIcon fontSize="small" sx={{ mr:'5px' }} />
                    <Typography variant="h5">
                        <b>Equipo artístico:</b> 
                    </Typography>
                    
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'middle',
                        py: '5px'
                    }}
                >
                    <ul>
                        {eventInfo.artistic_team && Object.entries(eventInfo.artistic_team).map(([role, members], index) => (
                            <li key={index}>
                                <strong>{role}:</strong> {members}
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
            <Box
                sx={{
                    m: 3,
                }}
            >
                <Typography variant="h4" gutterBottom> 
                    Fechas del evento
                </Typography>
                <List sx={{ width: '100%', p:0, m:0, bgcolor: 'background.paper' }} disablePadding>
                {event_dates.map( (response, index) => (

                <ListItem 
                    key={response.id}
                    secondaryAction={
                        <Button 
                            edge="end" 
                            aria-label="comments"
                            component={RouterLink}
                            to={`/admin/events/${response.id}/ticket_list`}
                        >
                          <ArrowForwardIosIcon />
                        </Button>
                      }
                      disablePadding
                >
                    <ListItemButton
                        sx={{py:'10px', px:0}}
                        component={RouterLink}
                        to={`/admin/events/${response.id}/ticket_list`}
                    >
                        <ListItemAvatar>
                        <Avatar sx={{backgroundColor:'#1976d2'}}>
                            { index + 1}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={new Date(response.date_time).toLocaleString('es-ES', {dateStyle: 'medium', timeStyle: 'short', hour12: true})}
                            secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Tickets disponibles:  
                                  </Typography>
                                  {response.tickets_not_reserved}
                                </React.Fragment>
                              } 
                        />
                    </ListItemButton>
                </ListItem>
                ))}
                </List>
            </Box>
        </Container>
    );
}

export default EventDateList;