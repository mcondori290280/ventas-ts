import axios from 'axios';
import appConfig from '@/app.config';

const authApi = axios.create({
    baseURL: appConfig.API_REST
});

export default authApi;