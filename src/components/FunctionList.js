import React, {useState, useEffect} from "react";
import axios from 'axios';

const FunctionList = () => {
    const [functions, setFunctions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/functions/') // Debe actualizarse por https://api.cajanegrateatro.com.co:8443/api/functions/
            .then(response => {
                setFunctions(response.data);
            })
            .catch(error => {
                console.error('Error fetching functions: ', error)
            });
    }, []);

    return (
        <div>
            <h1>Funciones</h1>
            <ul>
                {functions.map(func => (
                    <li key={func.id}> 
                        <a href={`/admin/functions/${func.id}/responses`}>{`Función del ${new Date(func.date_time).toLocaleDateString()} - Total Boletos: ${func.total_tickets} - Boletos separados: ${func.tickets_used} - Boletos disponibles: ${func.available_tickets}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FunctionList;