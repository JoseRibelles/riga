<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <AppHeader :showBack="false" />

        <main class="main">
          <div class="container">
            <img class="logo" :src="logo" alt="RIGA" />

            <h2 class="success">Success</h2>

            <p class="desc">
              Your password has been reset successfully. Don’t forget the password again :)
            </p>

            <ion-button expand="block" class="btn" @click="goLogin">
              Go Log in Again
            </ion-button>
          </div>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonButton, IonContent, IonPage } from "@ionic/vue";
import AppHeader from "../components/layout/AppHeader.vue";
import logo from "../images/logo.png";

const router = useRouter();

function goLogin() {
  router.replace("/login");
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
  text-align: center;
}

.logo {
  width: min(160px, 46vw);
  height: auto;
  object-fit: contain;
  opacity: 0.98;
  margin: 0 auto 22px;
  filter: drop-shadow(0 18px 38px rgba(0, 0, 0, 0.14));
}

.success {
  margin: 0 0 12px;
  font-size: 26px; /* ⬆️ más grande */
  font-weight: 950;
  letter-spacing: 0.2px;
  color: #ff5252;
}

.desc {
  margin: 0 auto 22px;
  max-width: 320px;
  font-size: 15px; /* ⬆️ más grande */
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.72);
}

.btn {
  margin: 0 auto;
  width: 82%;
  --border-radius: 14px;
  --background: #ff6b6b;
  --color: #fff;
  font-weight: 900;
  height: 48px;
  font-size: 15px;
}
</style>