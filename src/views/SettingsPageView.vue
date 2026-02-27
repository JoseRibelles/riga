<template>
  <ion-page class="settings-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="settings-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/menu')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="settings-title">Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="settings-content">
      <div class="settings-body animate__animated animate__fadeIn">

        <!-- Account Section -->
        <div class="section-label">Account</div>
        <div class="settings-group">

          <div class="settings-row interactive" @click="goToEditProfile" ref="editProfileRow">
            <img src="https://www.figma.com/api/mcp/asset/f372a197-03cc-41da-a26f-9f37d7859aa0" class="row-icon" alt="Profile" />
            <span class="row-label">Edit profile</span>
            <ion-icon :icon="chevronForwardOutline" class="row-arrow" />
          </div>

          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/0bb2d63b-8b05-4390-b3bd-e8520bb4529d" class="row-icon" alt="Security" />
            <span class="row-label">Security</span>
          </div>

          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/c4cd5799-cdd1-41b5-a24f-19b18680a973" class="row-icon" alt="Notifications" />
            <span class="row-label">Notifications</span>
          </div>

          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/7c1b5b8d-0de7-43ee-8dcf-a9b6c8419235" class="row-icon" alt="Privacy" />
            <span class="row-label">Privacy</span>
          </div>
        </div>

        <!-- Support & About Section -->
        <div class="section-label">Support & About</div>
        <div class="settings-group">
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/8675bd5e-700a-46c1-8ce9-a7b8be904ee4" class="row-icon" alt="Help" />
            <span class="row-label">Help & Support</span>
          </div>
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/109c5a9e-d3e1-4d55-b9f2-e4f4e85a7a80" class="row-icon" alt="Terms" />
            <span class="row-label">Terms and Policies</span>
          </div>
        </div>

        <!-- Delivery & Returns Section -->
        <div class="section-label">Delivery & Returns</div>
        <div class="settings-group">
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/779cd695-38ab-4fb9-be11-f0a9c543805f" class="row-icon" alt="Return" />
            <span class="row-label">Return policy</span>
          </div>
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/27d8386d-e2e9-4b4c-b276-fe8e3dbbf851" class="row-icon" alt="Delivery" />
            <span class="row-label">Delivery information</span>
          </div>
        </div>

        <!-- Actions Section -->
        <div class="section-label">Actions</div>
        <div class="settings-group">
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/c343ca18-1736-4cab-860b-798d61878ae9" class="row-icon" alt="Report" />
            <span class="row-label">Report a problem</span>
          </div>
          <div class="settings-row disabled">
            <img src="https://www.figma.com/api/mcp/asset/fa76a4dc-b024-42ad-bbc5-dc00343fdf14" class="row-icon" alt="Add account" />
            <span class="row-label">Add account</span>
          </div>

          <div class="settings-row interactive logout-row" @click="confirmLogout" ref="logoutRow">
            <img src="https://www.figma.com/api/mcp/asset/7547c2ef-a493-4921-977e-14c49ed7fdac" class="row-icon" alt="Logout" />
            <span class="row-label logout-label">Log out</span>
          </div>
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
    </div>

    <ion-alert
      :is-open="showLogoutAlert"
      header="Log out"
      message="Are you sure you want to log out?"
      :buttons="alertButtons"
      @didDismiss="showLogoutAlert = false"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonAlert,
} from '@ionic/vue'
import {
  arrowBackOutline, homeOutline, giftOutline, sendOutline,
  cartOutline, personOutline, chevronForwardOutline,
} from 'ionicons/icons'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const showLogoutAlert = ref(false)
const activeTab = ref('profile')
const editProfileRow = ref<HTMLElement | null>(null)
const logoutRow = ref<HTMLElement | null>(null)

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
}

const handleLogout = () => {
  gsap.timeline()
    .to('.settings-body', { opacity: 0, y: -30, duration: 0.4 })
    .then(() => router.replace('/login'))
}

const alertButtons = [
  { text: 'Cancel', role: 'cancel' },
  { text: 'Log out', role: 'confirm', handler: () => handleLogout() },
]

const goToEditProfile = () => {
  gsap.timeline()
    .to(editProfileRow.value, { backgroundColor: 'rgba(255,82,82,0.08)', duration: 0.15 })
    .to(editProfileRow.value, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.15 })
    .then(() => router.push('/edit-profile'))
}

const confirmLogout = () => {
  gsap.fromTo(logoutRow.value,
    { x: 0 },
    { x: 8, duration: 0.1, yoyo: true, repeat: 3, ease: 'power1.inOut',
      onComplete: () => { showLogoutAlert.value = true }
    }
  )
}

onMounted(() => {
  gsap.fromTo('.settings-row', { opacity: 0, x: -20 }, {
    opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.2,
  })
  gsap.fromTo('.section-label', { opacity: 0 }, {
    opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1,
  })
})
</script>

<style scoped>
.settings-page {
  --background: linear-gradient(to bottom, #f5e9d3, #d8c2a7);
  background: linear-gradient(to bottom, #f5e9d3, #d8c2a7);
}

.settings-toolbar {
  --background: transparent;
  --border-width: 0;
}

.settings-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #000;
}

.back-btn {
  color: #000;
}

.settings-content {
  --background: transparent;
}

.settings-body {
  padding: 8px 20px 100px;
}

.section-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin: 24px 0 8px 8px;
}

.settings-group {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 4px;
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(83, 76, 76, 0.08);
  transition: background 0.15s;
}

.settings-row:last-child {
  border-bottom: none;
}

.settings-row.interactive {
  cursor: pointer;
}

.settings-row.interactive:active {
  background: rgba(0, 0, 0, 0.05);
}

.settings-row.disabled {
  opacity: 0.85;
  cursor: default;
}

.row-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.row-label {
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #000;
  flex: 1;
}

.row-arrow {
  color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
}

.logout-row {
  background: rgba(255, 82, 82, 0.04);
}

.logout-label {
  color: #ff5252;
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