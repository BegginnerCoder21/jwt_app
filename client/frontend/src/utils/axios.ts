import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_URI  ,
    withCredentials : true,
    headers :  {
        'Content-Type': 'application/json'
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_URI  ,
    withCredentials : true,
    headers :  {
        'Content-Type': 'application/json'
    }
});