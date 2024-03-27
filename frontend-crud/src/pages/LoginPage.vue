<template>
  <q-page
    class="row items-center justify-evenly"
    style="background-color: #eee"
  >
    <LoginComponent />
  </q-page>
</template>
<script setup lang="ts">
import LoginComponent from 'components/LoginComponent.vue';

defineOptions({
  name: 'LoginPage',
});
</script>
