<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name : 'home'}">Navbar</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="appNavbar">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{name : 'home'}" class="nav-link active" aria-current="page" href="#">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="isAuthenticated" class="nav-item dropdown mr-4">
            <router-link  :to="{name : ''}" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" :to="{name : 'user'}">{{ user.username }}</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li @click="logout"><a class="dropdown-item" href="#">Déconnexion</a></li>
            </ul>
          </li>
        <template v-else>
          <li class="nav-item">
            <router-link :to="{name : 'login'}" class="nav-link active" aria-current="page" href="#">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name : 'register'}" class="nav-link active" aria-current="page" href="#">Incription</router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup lang="ts">

import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStores = useAuthStore();

const user = computed(() => {
    return authStores.userDetail;
});

const isAuthenticated = computed(() => {
    console.log(user.value);
    
    return authStores.isAuthenticated;
});

const logout = async() => {
  authStores.logout().then(() => {
    router.push('/')
  }).catch((error) => {
      console.log(error);
      
  });
}

</script>

<style scoped>

</style>