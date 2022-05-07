import axios from 'axios';
import store from '../store';

const axiosCLI = axios.create({
    baseURL: 'http://localhost:5000/api'
});


axiosCLI.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Baerer '+ store.state.user.token;
    console.log(store.state.user.token);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axiosCLI;