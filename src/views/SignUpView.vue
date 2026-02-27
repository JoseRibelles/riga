<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <div class="container">
          <div class="brand">
            <img class="brand-icon" :src="logo" alt="RIGA" />
          </div>

          <h1 class="title">Sign up</h1>

          <form class="form" @submit.prevent="submit">
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
                autocomplete="new-password"
                placeholder="Create a password"
              />
              <button class="eye" type="button" @click="showPass = !showPass">
                <span v-if="showPass">Hide</span>
                <span v-else>Show</span>
              </button>
            </div>

            <div class="label">Confirm password</div>
            <div class="field">
              <input
                v-model="confirm"
                class="input"
                :type="showPass2 ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Repeat your password"
              />
              <button class="eye" type="button" @click="showPass2 = !showPass2">
                <span v-if="showPass2">Hide</span>
                <span v-else>Show</span>
              </button>
            </div>

            <button class="primary" type="submit" :disabled="!canSubmit">
              Create account
            </button>
          </form>

          <button class="forgot" type="button" @click="$router.push('/login')">
            Back to Log in
          </button>

          <div class="or-row" aria-hidden="true">
            <span class="line"></span>
            <span class="or">OR</span>
            <span class="line"></span>
          </div>

          <GoogleButton />

        
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import GoogleButton from "../components/auth/GoogleButton.vue";
import logo from "../images/logo.png";

const email = ref("");
const password = ref("");
const confirm = ref("");
const showPass = ref(false);
const showPass2 = ref(false);

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
const passwordsMatch = computed(() => password.value.length > 0 && password.value === confirm.value);
const canSubmit = computed(() => isEmailValid.value && passwordsMatch.value);

function submit() {
  if (!canSubmit.value) return;
  window.location.href = "/verify-code";
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: calc(env(safe-area-inset-top) + 10px) 16px calc(env(safe-area-inset-bottom) + 24px);
  background: radial-gradient(circle, #f5e9d3 0%, #d8c2a7 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 100%;
  max-width: 360px;
}

.brand {
  display: flex;
  justify-content: center;
  margin-top: 6px;
  margin-bottom: 10px;
}

.brand-icon {
  width: clamp(120px, 38vw, 170px);
  height: auto;
  object-fit: contain;
}

.title {
  margin: 8px 0 12px;
  font-size: clamp(20px, 4.6vw, 24px);
  font-weight: 800;
  text-align: center;
}

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

.primary {
  margin-top: 16px;
  width: 100%;
  height: 46px;
  border: 0;
  border-radius: 12px;
  background: #ff6b6b;
  color: #fff;
  font-weight: 900;
}

.primary:disabled {
  opacity: 0.55;
}

.forgot {
  margin-top: 12px;
  width: 100%;
  background: transparent;
  border: 0;
  text-decoration: underline;
  font-size: 13px;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  padding: 8px 0;
}

.or-row {
  width: 100%;
  margin: 16px 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.line {
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.45);
}

.or {
  font-size: 13px;
  font-weight: 800;
  opacity: 0.9;
}

.signup-outline {
  margin-top: 16px;
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid #ff5252;
  background: transparent;
  color: #ff5252;
  font-weight: 800;
}

.signup-outline:active {
  filter: brightness(0.92);
}

@media (max-height: 700px) {
  .brand {
    margin-top: 4px;
    margin-bottom: 8px;
  }
  .brand-icon {
    width: clamp(110px, 34vw, 150px);
  }
}
</style>