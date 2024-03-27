<template>
  <q-page
    class="row items-center justify-evenly"
    style="background-color: #eee"
  >
    <RegisterComponent />
  </q-page>
</template>

<script setup lang="ts">
import RegisterComponent from 'components/RegisterComponent.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
