<template>
  <div class="form">
    <div class="label">Email</div>
    <input
      v-model="email"
      class="input"
      type="email"
      inputmode="email"
      autocomplete="email"
      placeholder="Enter your email"
    />

    <div class="label">Password</div>
    <div class="field">
      <input
        v-model="password"
        class="input"
        :type="showPass ? 'text' : 'password'"
        autocomplete="current-password"
        placeholder="Enter your password"
      />
      <button class="eye" type="button" @click="showPass = !showPass">
        <span v-if="showPass">Hide</span>
        <span v-else>Show</span>
      </button>
    </div>

    <ion-button
      expand="block"
      class="btn"
      :class="{ enabled: canSubmit }"
      :disabled="!canSubmit"
      @click="submit"
    >
      Log In
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { IonButton } from "@ionic/vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPass = ref(false);

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
const canSubmit = computed(() => isEmailValid.value && password.value.trim().length > 0);

function submit() {
  if (!canSubmit.value) return;

  router.push("/menu");
}
</script>

<style scoped>
.form {
  width: 100%;
}

.label {
  font-size: 13px;
  font-weight: 800;
  margin: 12px 0 8px;
}

.field {
  position: relative;
}

.input {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.85);
  padding: 0 14px;
  outline: none;
}

.field .input {
  padding-right: 70px;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(255, 82, 82, 0.18);
  border-color: rgba(255, 82, 82, 0.55);
}

.eye {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  font-size: 12px;
  opacity: 0.85;
}

.btn {
  margin-top: 16px;
  height: 46px;
  --border-radius: 12px;
  --background: rgba(255, 82, 82, 0.7);
  --color: #fff;
  opacity: 0.7;
}

.btn.enabled {
  --background: #ff6b6b;
  opacity: 1;
}
</style>