<template>
    <div class="container">
        <h2>PROFIL</h2>
        <div class="card mt-4 card-body">
          <h5 class="card-title">Nom utilisateur: {{ user.username }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Nom de famille: {{ user.firstname }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Prenom: {{ user.lastname }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">nom complet: {{ user.fullName }}</h6>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();

const user = computed(() => {
    return authStore.user;
});

const getUser = async() => {
    await authStore.getUser();
}

onMounted(async() => {
    await getUser();

})


</script>

<style scoped>
.container h2{
    text-align: center;
    margin-top: 10px;
}
.container .card{
    max-width: 40vw;
    margin: auto;
}
</style>