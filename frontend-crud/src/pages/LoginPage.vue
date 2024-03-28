<template>
  <q-page
    class="row items-center justify-evenly"
    style="background-color: #eee"
  >
    <SignComponent
      :clickHandler="login"
      title="Login"
      leftButtonName="Register"
      leftButtonPath="/register/"
      :error="error"
    />
  </q-page>
</template>
<script setup lang="ts">
import SignComponent from 'components/SignComponent.vue';
import { useUserStore } from 'src/stores/user-store';
import { signIn } from 'src/api';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const error = ref('');

defineOptions({
  name: 'LoginPage',
});

async function login(email: string, password: string) {
  let { data, error: errorMessage } = await signIn(email, password);
  if (errorMessage) {
    error.value = errorMessage;
  } else {
    userStore.setTokens(data.accessToken, data.refreshToken);
    router.push('/profile/');
  }
}
</script>
