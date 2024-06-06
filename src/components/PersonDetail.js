import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import publicApiClient from "./axiosPublicConfig";

const PersonDetail = () => {
    const { personId } = useParams();
    const [ personDetail, setPersonDetail] = useState(null);

    useEffect(() => {
        publicApiClient.get(`/person/${personId}`) // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/...
            .then(response => {
                setPersonDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching response detail: ', error)
            });
    }, [personId]);

    if (!personDetail) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Detalle de Persona</h1>
            <p>Nombre: {personDetail.nombre}</p>
            <p>Correo: {personDetail.correo}</p>
        </div>
    );
};

export default PersonDetail;