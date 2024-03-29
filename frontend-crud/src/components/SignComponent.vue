<template>
  <div class="container-block">
    <div class="column wrap justify-center container-form">
      <div style="max-width: 480px">
        <div class="header">{{ title }}</div>
        <q-input label="E-mail" v-model="email" />
        <q-input
          label="Password"
          type="password"
          :rules="
            title === 'Register'
              ? [
                  (val) => val.length >= 8 || 'Please use minimum 8 characters',
                  (val) =>
                    val.length <= 20 || 'Please use maximum 20 characters',
                ]
              : [() => true]
          "
          v-model="password"
        />
        <div class="row wrap justify-between container-form-buttons">
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
