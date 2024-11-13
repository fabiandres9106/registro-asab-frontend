import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.estudiocajanegra.net',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;