<template>
    <div class="container">
        <h2>Connexion</h2>
        <div class="card mt-4 card-body">
            <form @submit.prevent="submitLoginData">
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse email</label>
                    <input v-model="loginData.email" type="email" class="form-control" id="email" >
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="loginData.password" type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Connexion</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
import type LoginData from '@/types/loginData';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const errorMessage = ref<string>("");
const authStore = useAuthStore()
const router = useRouter();
const loginData = reactive<LoginData>({
    email : "",
    password : "",
});

const submitLoginData = async() => {
    
    authStore.login(loginData).then(() => {
        router.push('/user');
   
    }).catch((error) => {

        errorMessage.value = error.message;
    });
}

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