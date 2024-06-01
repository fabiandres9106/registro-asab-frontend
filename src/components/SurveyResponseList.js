import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SurveyResponseList = () => {
    const { functionId } = useParams(); 
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/functions/${functionId}/responses/`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
            .then(response => {
                setResponses(response.data);
            })
            .catch(error => {
                console.error('Error fetching responses: ', error);
            });
    }, [functionId]);

    return (
        <div>
            <h1>Respuestas para la función {functionId}</h1>
            <ul>
                {responses.map( response => (
                    <li key={response.id}>
                        <a href={`/admin/responses/${response.id}`}>{response.nombre} - {response.ticket_number}</a>
                    </li>
                ) )}
            </ul>
        </div>
    );
};

export default SurveyResponseList;