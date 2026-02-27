<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <div class="container">
          <img class="logo" :src="logo" alt="RIGA" />

          <h2 class="success">Success</h2>

          <p class="desc">
            Your password has been reset successfully. Don’t forget the password again :)
          </p>

          <button class="primary" type="button" @click="goLogin">
            Go Log in Again
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonContent, IonPage } from "@ionic/vue";
import logo from "../images/logo.png";

const router = useRouter();

function goLogin() {
  router.replace("/login");
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

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
  text-align: center;
}

.logo {
  width: min(160px, 46vw);
  height: auto;
  object-fit: contain;
  opacity: 0.98;
  margin: 10px auto 22px;
  filter: drop-shadow(0 18px 38px rgba(0, 0, 0, 0.14));
}

.success {
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 950;
  letter-spacing: 0.2px;
  color: #ff5252;
}

.desc {
  margin: 0 auto 22px;
  max-width: 320px;
  font-size: 15px;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.72);
}

.primary {
  display: block;
  width: min(280px, 86%);
  margin-left: auto;
  margin-right: auto;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: #ff6b6b;
  color: #fff;
  font-weight: 900;
}

.primary:active {
  filter: brightness(0.92);
}

@media (max-height: 700px) {
  .logo {
    margin-bottom: 16px;
    width: min(150px, 44vw);
  }
  .success {
    font-size: 24px;
  }
  .desc {
    font-size: 14px;
    margin-bottom: 18px;
  }
  .primary {
    height: 42px;
  }
}
</style>