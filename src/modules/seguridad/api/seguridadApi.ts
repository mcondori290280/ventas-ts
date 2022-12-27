import axios from 'axios';
import appConfig from '@/app.config';

const seguridadApi = axios.create({
    baseURL: appConfig.API_REST
});

export default seguridadApi;