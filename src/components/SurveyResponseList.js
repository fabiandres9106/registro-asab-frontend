import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import publicApiClient from "./axiosPublicConfig";

const SurveyResponseList = () => {
    const { functionId } = useParams(); 
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        publicApiClient.get(`/api/functions/${functionId}/responses/`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
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