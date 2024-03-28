<template>
  <div class="login-block">
    <div class="column wrap justify-center login-form">
      <div style="max-width: 480px">
        <div class="header q-mb-md">My Account</div>
        <q-input
          class="q-mb-md"
          label="Name"
          v-model="inputs.name.value"
          outlined
        />
        <q-input
          class="q-mb-md"
          label="Phone"
          v-model="inputs.phone.value"
          outlined
        />
        <q-input
          class="q-mb-md"
          label="Address"
          v-model="inputs.address.value"
          outlined
        />
        <q-input
          class="q-mb-md"
          type="textarea"
          label="Info About Me"
          v-model="inputs.info.value"
          outlined
        />

        <div class="row wrap justify-between login-form-buttons" style="">
          <q-btn
            v-show="!textsChanged"
            @click="confirmDelete = true"
            icon="delete"
            label="Delete Account"
          />
          <q-dialog v-model="confirmDelete">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="delete_forever"
                  color="primary"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >Are you sure you want to delete your account?</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="No" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Yes"
                  color="primary"
                  @click="deleteMyAccount"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-btn
            v-show="textsChanged"
            @click="resetChanges"
            icon="close"
            label="Cancel"
          />
          <q-btn
            v-if="textsChanged"
            @click="saveInfo"
            icon="done"
            label="Save"
          />
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
import { getUserInfo, updateUserInfo, deleteAccount } from 'src/api';
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user-store';

const router = useRouter();
const userStore = useUserStore();
const error = ref('');
const confirmDelete = ref(false);

const { userInfo: realInfo } = storeToRefs(userStore);
const inputs = {
  name: ref(''),
  phone: ref(''),
  address: ref(''),
  info: ref(''),
};

onMounted(() => {
  getInfo();
});

const textsChanged = computed(() => {
  return Object.entries(inputs).some(
    ([key, value]) => (realInfo?.value?.[key] ?? '') !== value.value
  );
});
function resetChanges() {
  Object.keys(inputs).forEach((key) => (inputs[key].value = ''));
  Object.entries(realInfo?.value).forEach(([key, value]) => {
    if (inputs[key]) inputs[key].value = value ?? '';
  });
}

const handleRequest = async (callback: () => any) => {
  const { data, error: errorMessage, status } = await callback();
  if (errorMessage) {
    error.value = errorMessage;
    if (status === 401) {
      userStore.clearTokens();
      router.push('/login/');
    }
  } else if (data) {
    userStore.setUserInfo(data);
    resetChanges();
  }
};

async function getInfo() {
  handleRequest(() => getUserInfo());
}
async function saveInfo() {
  const extractedChanges = Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => [key, value.value])
  );
  handleRequest(() => updateUserInfo(extractedChanges));
}
async function deleteMyAccount() {
  const { error: errorMessage, status } = await deleteAccount();
  if (errorMessage && status !== 401) {
    error.value = errorMessage;
  } else {
    userStore.clearTokens();
    router.push('/login/');
  }
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
