<template>
    <div class="container">
        <h2>INSCRIPTION</h2>
        <div class="card mt-4 card-body">
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Nom utilisateur</label>
                    <input type="text" class="form-control" id="username" >
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse email</label>
                    <input type="email" class="form-control" id="email" >
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="password-confirm" class="form-label">Confirmer mot de passe</label>
                    <input type="password-confirm" class="form-control" id="password-confirm">
                </div>
                <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

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