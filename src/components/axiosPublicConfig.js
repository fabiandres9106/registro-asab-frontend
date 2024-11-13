import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'https://api.estudiocajanegra.net:8443',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default publicApiClient;