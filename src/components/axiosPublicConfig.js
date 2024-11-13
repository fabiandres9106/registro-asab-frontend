import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'http://estudiocajanegra.net:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default publicApiClient;