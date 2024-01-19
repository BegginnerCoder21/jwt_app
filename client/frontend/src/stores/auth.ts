import { defineStore } from 'pinia'
import type typeUser from '@/types/user';
import type LoginData from '@/types/loginData';
import type RegisterData from '@/types/registerData';
import type State from '@/types/state';
import useApi, { useApiPrivate } from '@/composables/useApi';



export const useAuthStore = defineStore('Auth', ({
  state: () => ({
    user: {} as typeUser,
    accessToken: "" as string
  }),

  getters:{
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => state?.accessToken ? true : false
  },

  actions:{
    async attempt(){
      try {
        this.refresh();
        this.getUser()
      } catch (error) {
        return
      }
      return
    },
    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post(`http://localhost:2100/api/auth/login`,payload);
        this.accessToken = data?.access_token;
        this.getUser();
        return data;
      } catch (error: Error | any) {
        throw error.response.message;
      }
    },
  
    async register(payload: RegisterData) { 
      try {
        const { data } = await useApi().post(`http://localhost:2100/api/auth/register`,payload)
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },
  
    async logout() {
      try {
        const { data } = await useApiPrivate().post(`http://localhost:2100/api/auth/logout`)
        this.accessToken = "";
        this.user = {} as typeUser
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },
  
    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`http://localhost:2100/api/auth/user`)
        this.user = data
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`http://localhost:2100/api/auth/refresh`)
        this.accessToken = data?.access_token
        return data;
      } catch (error: Error | any) {
        throw error?.response.message
      }
    },

  }

}))
