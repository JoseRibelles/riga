<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <div class="container">
          <div class="brand">
            <img class="brand-icon" :src="logo" alt="RIGA" />
          </div>

          <h1 class="title">Log in</h1>

          <LoginForm />

          <button class="forgot" type="button" @click="$router.push('/forgot-password')">
            Forgot Password?
          </button>

          <div class="or-row" aria-hidden="true">
            <span class="line"></span>
            <span class="or">OR</span>
            <span class="line"></span>
          </div>

          <GoogleButton />

          <button class="signup-outline" type="button" @click="$router.push('/sign-up')">
            Sign Up →
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import LoginForm from "../components/auth/LoginForm.vue";
import GoogleButton from "../components/auth/GoogleButton.vue";

import logo from "../images/logo.png";
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