<template>
  <ion-page class="edit-profile-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="ep-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/settings')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="ep-title">Edit Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ep-content">
      <div class="ep-body animate__animated animate__fadeIn">

        <div class="avatar-section" ref="avatarSection">
          <div class="avatar-ring">
            <img :src="avatarSrc" alt="Profile Photo" class="avatar-img" />
          </div>
          <button class="camera-btn" @click="changePhoto">
            <img
              src="https://www.figma.com/api/mcp/asset/a65d49ac-0e6e-4245-86f2-b9d2564f1256"
              alt="Camera"
              class="camera-icon"
            />
          </button>
        </div>

        <div class="form-section">
          <div class="field-group">
            <label class="field-label">Name</label>
            <div class="field-wrapper">
              <ion-input
                v-model="form.name"
                placeholder="Your name"
                class="field-input"
                @ionFocus="animateFieldFocus('name')"
              />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Email</label>
            <div class="field-wrapper">
              <ion-input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="field-input"
                @ionFocus="animateFieldFocus('email')"
              />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <div class="field-wrapper">
              <ion-input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••••"
                class="field-input"
              >
                <ion-button slot="end" fill="clear" class="eye-btn" @click="showPassword = !showPassword">
                  <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
                </ion-button>
              </ion-input>
            </div>
          </div>

          <ion-button expand="block" class="save-btn animate__animated animate__fadeInUp" @click="saveChanges">
            Save changes
          </ion-button>
        </div>

      </div>
    </ion-content>

    <div class="bottom-nav">
      <div class="nav-item" :class="{ active: activeTab === 'menu' }" @click="navigateTo('menu')">
        <ion-icon :icon="homeOutline" />
        <span>Menu</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'gifts' }" @click="navigateTo('gifts')">
        <ion-icon :icon="giftOutline" />
        <span>Create</span>
      </div>
      <div class="nav-item center-item" @click="navigateTo('center')">
        <div class="center-btn">
          <ion-icon :icon="sendOutline" />
        </div>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'wallet' }" @click="navigateTo('wallet')">
        <ion-icon :icon="cartOutline" />
        <span>Cart</span>
      </div>
      <div class="nav-item active" @click="navigateTo('profile')">
        <ion-icon :icon="personOutline" />
        <span>Profile</span>
      </div>
      <div class="nav-item" @click="navigateTo('gifts')">
  <ion-icon :icon="giftOutline" /><span>Create</span>
</div>
    </div>

    <ion-toast
      :is-open="showToast"
      message="Profile updated successfully! ✓"
      :duration="2000"
      color="success"
      position="top"
      @didDismiss="showToast = false"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonInput, IonToast,
} from '@ionic/vue'
import {
  arrowBackOutline, homeOutline, giftOutline, sendOutline,
  cartOutline, personOutline, eyeOutline, eyeOffOutline,
} from 'ionicons/icons'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const showToast = ref(false)
const showPassword = ref(false)
const activeTab = ref('profile')
const avatarSection = ref<HTMLElement | null>(null)
const avatarSrc = ref('https://www.figma.com/api/mcp/asset/9d50b6a8-bdb0-4e90-93d6-2d796fd436f2')

const form = ref({
  name: 'Jose Ribelles Garcia',
  email: 'joseribellesgarcia@gmail.com',
  password: '************',
})

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
}

const animateFieldFocus = (field: string) => {
  gsap.to(`.field-group:nth-of-type(${field === 'name' ? 1 : field === 'email' ? 2 : 3}) .field-wrapper`, {
    scale: 1.01, duration: 0.2, ease: 'power1.out',
  })
}

const changePhoto = () => {
  gsap.fromTo('.avatar-img', { scale: 1 }, {
    scale: 0.9, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut',
  })
}

const saveChanges = () => {
  gsap.timeline()
    .to('.save-btn', { scale: 0.96, duration: 0.1 })
    .to('.save-btn', { scale: 1, duration: 0.1 })
    .then(() => {
      showToast.value = true
      gsap.timeline()
        .to('.ep-body', { opacity: 0.7, duration: 0.2 })
        .to('.ep-body', { opacity: 1, duration: 0.2 })
        .then(() => setTimeout(() => router.replace('/settings'), 2000))
    })
}

onMounted(() => {
  gsap.fromTo('.avatar-section', { y: -40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)',
  })
  gsap.fromTo('.field-group', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.3,
  })
  gsap.to('.avatar-ring', {
    boxShadow: '0 0 0 4px rgba(255, 82, 82, 0.4)',
    duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut',
  })
})
</script>

<style scoped>
.edit-profile-page {
  --background: linear-gradient(to bottom, #f5e9d3, #d8c2a7);
  background: linear-gradient(to bottom, #f5e9d3, #d8c2a7);
}

.ep-toolbar {
  --background: transparent;
  --border-width: 0;
}

.ep-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #000;
}

.back-btn {
  color: #000;
}

.ep-content {
  --background: transparent;
}

.ep-body {
  padding: 12px 24px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-section {
  position: relative;
  margin: 16px auto 32px;
}

.avatar-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid rgba(255, 82, 82, 0.5);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-btn {
  position: absolute;
  bottom: 4px;
  right: 0;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.camera-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.form-section {
  width: 100%;
}

.field-group {
  margin-bottom: 20px;
}

.field-label {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #000;
  display: block;
  margin-bottom: 8px;
}

.field-wrapper {
  background: rgba(255, 255, 255, 0.55);
  border-radius: 10px;
  border: 1px solid rgba(84, 76, 76, 0.12);
  padding: 0 4px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.field-input {
  --color: #544c4c;
  --placeholder-color: rgba(84, 76, 76, 0.5);
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 10px;
  --padding-bottom: 10px;
}

.eye-btn {
  --color: #544c4c;
  --padding-start: 4px;
  --padding-end: 4px;
  margin: 0;
}

.save-btn {
  --background: rgba(255, 82, 82, 0.75);
  --background-activated: rgba(255, 82, 82, 0.9);
  --border-radius: 14px;
  height: 52px;
  margin-top: 28px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  text-transform: none;
  letter-spacing: 0.2px;
}

.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  height: 100%;
  cursor: pointer;
  color: #5e5f60;
  font-family: 'Figtree', sans-serif;
  font-size: 11px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.nav-item ion-icon {
  font-size: 22px;
}

.nav-item.active {
  color: #00aa5b;
}

.center-item {
  flex: 1;
}

.center-btn {
  width: 52px;
  height: 52px;
  background: #00aa5b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 170, 91, 0.3);
  margin: 0 auto;
}

.center-btn ion-icon {
  color: white;
  font-size: 22px;
}
</style>