<template>
  <div class="column wrap justify-center login-form">
    <div style="max-width: 480px">
      <div class="header">Register</div>
      <q-input label="E-mail" v-model="email" />
      <q-input label="Password" v-model="password" />
      <div class="row wrap justify-between login-form-buttons" style="">
        <q-btn @click="goToLogin">Login</q-btn>
        <q-btn>Register</q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const email = new ref('');
const password = new ref('');
// function login() {

// }
function goToLogin() {
  router.push('/login/');
}
</script>
<style>
.login-form {
  flex: 1;
  margin: 10px;
  padding: 30px;
  max-width: 480px;
  border-radius: 30px;
  background-color: white;
}
.login-form-buttons {
  margin-top: 20px;
}
.header {
  font-size: 28px;
  text-align: center;
}
</style>
