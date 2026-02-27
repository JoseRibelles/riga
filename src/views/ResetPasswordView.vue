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

            <div class="card">
              <h1 class="title">Change your password</h1>
              <div class="divider" aria-hidden="true"></div>

              <label class="label" for="newPass">New Password</label>
              <div class="field">
                <input
                  id="newPass"
                  class="input"
                  :type="showNew ? 'text' : 'password'"
                  v-model="newPassword"
                  placeholder="Enter new password"
                />
                <button class="eye" type="button" @click="showNew = !showNew" aria-label="Toggle password visibility">
                  <span v-if="showNew">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>

              <label class="label" for="confirmPass">Confirm Password</label>
              <div class="field">
                <input
                  id="confirmPass"
                  class="input"
                  :type="showConfirm ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Confirm password"
                />
                <button
                  class="eye"
                  type="button"
                  @click="showConfirm = !showConfirm"
                  aria-label="Toggle password visibility"
                >
                  <span v-if="showConfirm">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>

              <ion-button
                expand="block"
                class="btn"
                :class="{ enabled: isValid }"
                :disabled="!isValid"
                @click="setPassword"
              >
                Set Password
              </ion-button>
            </div>
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

const newPassword = ref("");
const confirmPassword = ref("");
const showNew = ref(false);
const showConfirm = ref(false);

const isValid = computed(() => {
  const a = newPassword.value.trim();
  const b = confirmPassword.value.trim();
  return a.length > 0 && b.length > 0 && a === b;
});

function setPassword() {
  if (!isValid.value) return;
  router.push("/password-reset-success");
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
  padding: 18px 16px 28px;
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
  margin-bottom: 6px;
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

.card {
  background: rgba(255, 255, 255, 0.55);
  border-radius: 14px;
  padding: 18px 16px 16px;
  backdrop-filter: blur(6px);
}

.title {
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.35);
  margin: 10px 0 16px;
}

.label {
  display: block;
  font-size: 11.5px;
  opacity: 0.75;
  margin: 10px 0 6px;
}

.field {
  position: relative;
}

.input {
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.7);
  padding: 0 60px 0 12px;
  outline: none;
  font-size: 14px;
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