import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL_PROD : process.env.NEXT_PUBLIC_BASE_URL_DEV;


export const axiosInstance = axios.create({
    baseURL: BASE_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});