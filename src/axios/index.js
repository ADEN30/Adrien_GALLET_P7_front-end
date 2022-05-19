import axios from 'axios';

const axiosCLI = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
});




export default axiosCLI;