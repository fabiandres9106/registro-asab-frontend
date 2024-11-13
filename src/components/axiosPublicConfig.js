import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'https://api.estudiocajanegra.net',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default publicApiClient;