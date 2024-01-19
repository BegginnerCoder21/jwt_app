<template>
    <div class="container">
        <h2>INSCRIPTION</h2>
        <div class="card mt-4 card-body">
            <form @submit.prevent="submitRegisterData">
                <div class="mb-3">
                    <label for="username" class="form-label">Nom utilisateur</label>
                    <input v-model="registerData.username" type="text" class="form-control" id="username" >
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse email</label>
                    <input v-model="registerData.email" type="email" class="form-control" id="email" >
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">Nom de famille</label>
                    <input v-model="registerData.firstname" type="text" class="form-control" name="firstname" id="fisrtname" >
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Prenom</label>
                    <input v-model="registerData.lastname" type="text" name="lastname" class="form-control" id="lastname" >
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="registerData.password" type="password" name="password" class="form-control" id="password">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="password-confirm" class="form-label">Confirmer mot de passe</label>
                    <input  v-model="registerData.password_confirm" name="password_confirm" type="password" class="form-control" id="password-confirm">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                </div>
                <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import type RegisterData from '@/types/registerData';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const errorMessage = ref<string>("");
const authStore = useAuthStore()
const router = useRouter();
const registerData = reactive<RegisterData>({
    username :"",
    email : "",
    firstname : "",
    lastname : "",
    password : "",
    password_confirm : "",
});

const submitRegisterData = async() => {
    
    authStore.register(registerData).then(() => {
        router.push('/login');
   
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