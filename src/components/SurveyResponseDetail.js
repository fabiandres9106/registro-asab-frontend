import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import publicApiClient from "./axiosPublicConfig";

const SurveyResponseDetail = () => {
    const { responseId } = useParams();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        publicApiClient.get(`/api/responses/${responseId}`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                console.error('Error fetching response detail: ', error)
            });
    }, [responseId]);

    if (!response) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Detalle de la respuesta</h1>
            <p>Nombre: {response.nombre}</p>
            <p>Correo: {response.correo}</p>
            <p>Edad: {response.edad}</p>
            <p>Género: {response.genero}</p>
            <p>Localidad: {response.localidad}</p>
        </div>
    );
};

export default SurveyResponseDetail;