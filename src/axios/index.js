import axios from 'axios';

const axiosCLI = axios.create({
    baseURL: 'http://localhost:3030/api',
    withCredentials: true
});




export default axiosCLI;