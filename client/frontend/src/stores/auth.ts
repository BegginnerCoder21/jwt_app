import { defineStore } from 'pinia'
import type typeUser from '@/types/user';
import type LoginData from '@/types/loginData';
import type RegisterData from '@/types/registerData';
import type State from '@/types/state';
import useApi from '@/composables/useApi';


export const useAuthStore = defineStore('Auth', ({
  state: () => ({
    user: {} as typeUser,
    accessToken: "" as string
  }),

  getters:{
    user: (state: State) => state.user,
    isAuthenticated: (state: State) => state?.user.id
  },

  actions:{
    async login(payload: LoginData) {
      try {
        const { data } = useApi.post(`api/auth/login`,payload)
        this.accessToken = data?.access_token;
        return data;
      } catch (error: Error | any) {
        throw error.response.message;
      }
    },
  
    async register(payload: RegisterData) { 
      try {
        const { data } = useApi.post(`api/auth/register`,payload)
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },
  
    async logout() {
      try {
        const { data } = useApi.post(`api/auth/logout`)
        this.accessToken = "";
        this.user = {} as typeUser
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },
  
    async getUser() {
      try {
        const { data } = useApi.get(`api/auth/getUser`)
        this.user = data
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },

    async refresh() {
      try {
        const { data } = useApi.post(`api/auth/refresh`)
        this.accessToken = data.access_token
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },

  }

}))
