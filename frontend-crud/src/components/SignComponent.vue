<template>
  <div class="login-block">
    <div class="column wrap justify-center login-form">
      <div style="max-width: 480px">
        <div class="header">{{ title }}</div>
        <q-input label="E-mail" v-model="email" />
        <q-input label="Password" v-model="password" />
        <div class="row wrap justify-between login-form-buttons" style="">
          <q-btn @click="goToRegister">{{ leftButtonName }}</q-btn>
          <q-btn icon="login" :label="title" @click="sign" />
        </div>
      </div>
    </div>
    <q-banner
      v-if="error.length > 0"
      inline-actions
      class="text-white bg-red rounded absolute error-message"
      >{{ error }}</q-banner
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const email = ref('');
const password = ref('');

interface SignProps {
  title: string;
  clickHandler: (email: string, password: string) => void;
  leftButtonName: string;
  leftButtonPath: string;
  error: string;
}

const { clickHandler, leftButtonPath } = defineProps<SignProps>();

function goToRegister() {
  router.push(leftButtonPath);
}
function sign() {
  clickHandler(email.value, password.value);
}
</script>

<style>
.login-block {
  flex: 1;
  margin: 10px;
  max-width: 480px;
}
.login-form {
  border-radius: 30px;
  padding: 30px;
  background-color: white;
}
.login-form-buttons {
  margin-top: 20px;
}
.header {
  font-size: 28px;
  text-align: center;
}
.error-message {
  margin: auto;
  margin-top: 20px;
  width: 480px;
  left: 0;
  right: 0;
  border-radius: 15px;
}
</style>
