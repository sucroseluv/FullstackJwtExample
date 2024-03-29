<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Testovoe1 </q-toolbar-title>
        <q-btn v-if="isLogged" @click="logout" icon="logout" label="Log out " />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const isLogged = computed(() => userStore.isLogged);
function logout() {
  userStore.clearTokens();
  router.push('/login/');
}
defineOptions({
  name: 'MainLayout',
});
</script>
