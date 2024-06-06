import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'https://api.cajanegrateatro.com.co:8443/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default publicApiClient;