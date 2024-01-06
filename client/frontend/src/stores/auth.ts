import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type typeUser from '@/types/user';

export const useAuthStore = defineStore('Auth', () => {
  const user = ref<typeUser>();

  const users = computed(() => user.value);

  const isAuthenticated = user.value?.id ? true : false;

  async function login() {
    
  }

  async function register() {
    
  }

  async function logout() {
    
  }

  async function getUser() {
    
  }

  async function refresh() {
    
  }

  return { user, users, login, register, logout, getUser, refresh, isAuthenticated }
})
