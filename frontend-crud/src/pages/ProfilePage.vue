<template>
  <q-page
    class="row items-center justify-evenly"
    style="background-color: #eee"
  >
    <ProfileComponent />
  </q-page>
</template>

<script setup>
import ProfileComponent from 'components/ProfileComponent.vue';

defineOptions({
  name: 'ProfilePage',
});
</script>
