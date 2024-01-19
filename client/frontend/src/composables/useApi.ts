import { axiosInstance,axiosPrivateInstance } from "@/utils/axios";
import {useAuthStore} from "@/stores/auth";
import { watchEffect } from "vue";

export function useApiPrivate(){
    const authStore = useAuthStore();

    watchEffect(() => {
        axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if(!config.headers['Authorization']){
                    localStorage.setItem('access_token',authStore.accessToken)
                    config.headers['Authorization'] = `Bearer ${authStore.accessToken} `
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        );
    
        axiosPrivateInstance.interceptors.response.use(
            
            response => response,
    
            async (error) => {
                const prevRequest = error?.config;
                if((error?.response.status === 403 || error?.response.status === 401) && !prevRequest.sent){
                    prevRequest.sent = true;
                    await authStore.refresh();
                    prevRequest.headers['Authorization'] = authStore.accessToken;
                    return axiosPrivateInstance(prevRequest);
                }
                return Promise.reject(error)
            }
        );
    });
    return axiosPrivateInstance;
}

export default function useApi(){
    return axiosInstance;
}