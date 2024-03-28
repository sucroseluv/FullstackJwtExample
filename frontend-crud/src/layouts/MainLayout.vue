<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Testovoe1 </q-toolbar-title>
        <q-btn v-if="isLogged" icon="logout" label="Log out " />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { computed } from 'vue';
const user = useUserStore();
const isLogged = computed(() => user.isLogged);
defineOptions({
  name: 'MainLayout',
});
</script>
