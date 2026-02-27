<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <AppHeader />

        <main class="main">
          <div class="container">
            <div class="hero" aria-hidden="true">
              <div class="mail">
                <div class="mail-top"></div>
                <div class="mail-lock"></div>
              </div>
            </div>

            <h1 class="title">Forgot Password</h1>
            <p class="desc">please enter your email to reset your password</p>

            <div class="label">Your Email</div>
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
            />

            <ion-button
              expand="block"
              class="btn"
              :class="{ enabled: isEmailValid }"
              :disabled="!isEmailValid"
              @click="goReset"
            >
              Reset Password
            </ion-button>
          </div>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { IonButton, IonContent, IonPage } from "@ionic/vue";
import AppHeader from "@/components/layout/AppHeader.vue";

const router = useRouter();
const email = ref("");

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));

function goReset() {
  if (!isEmailValid.value) return;
  router.push({ name: "ResetPassword", query: { email: email.value.trim() } });
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: radial-gradient(circle, #f5e9d3 0%, #d8c2a7 100%);
}

.main {
  min-height: calc(100vh - (env(safe-area-inset-top) + 10px) - 44px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 28px;
}

.container {
  width: 100%;
  max-width: 360px;
}

.hero {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.mail {
  width: 170px;
  height: 120px;
  background: #fff;
  border-radius: 22px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.mail-top {
  position: absolute;
  left: 50%;
  top: -52px;
  width: 240px;
  height: 240px;
  transform: translateX(-50%) rotate(45deg);
  background: #e3e3e3;
}

.mail::before,
.mail::after {
  content: "";
  position: absolute;
  top: 45px;
  width: 120px;
  height: 120px;
  background: #fff;
  transform: rotate(45deg);
}

.mail::before {
  left: -62px;
}

.mail::after {
  right: -62px;
}

.mail-lock {
  position: absolute;
  left: 50%;
  top: 62px;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 62px;
  background: #0b0b0b;
  border-radius: 14px 14px 26px 26px;
}

.mail-lock::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -26px;
  transform: translateX(-50%);
  width: 54px;
  height: 44px;
  border: 10px solid #0b0b0b;
  border-bottom: 0;
  border-radius: 40px 40px 0 0;
}

.mail-lock::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 34px;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
}

.title {
  margin: 10px 0 6px;
  font-size: 26px;
  font-weight: 800;
  text-align: left;
}

.desc {
  margin: 0 0 18px;
  font-size: 12.5px;
  line-height: 1.35;
  opacity: 0.9;
  text-align: left;
}

.label {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 82, 82, 0.85);
  background: rgba(255, 255, 255, 0.85);
  padding: 0 14px;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(255, 82, 82, 0.18);
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