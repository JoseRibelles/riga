<template>
  <ion-page class="confirmed-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="confirmed-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/menu')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="confirmed-content" :scroll-y="false">
      <div class="confirmed-body">

        <div class="circle-wrap" ref="circleWrap">
          <svg class="circle-svg" viewBox="0 0 200 200">
            <circle class="circle-track" cx="100" cy="100" r="80" />
            <circle class="circle-stroke" ref="circleStroke" cx="100" cy="100" r="80" />
          </svg>
          <div class="circle-dot" ref="circleDot"></div>
        </div>

        <h1 class="confirmed-title" ref="titleEl">¡Order Confirmed!</h1>
        <p class="confirmed-sub" ref="subEl">
          Your order has been placed<br>successfully
        </p>
        <p class="confirmed-delivery" ref="deliveryEl">
          Delivery by <strong>Thu, 29th, 4:00 PM</strong>
        </p>

        <button class="track-link" ref="trackBtn" @click="router.push('/track-order')">
          Track my order
        </button>

        <div class="spacer" />

        <p class="support-text" ref="supportEl">
          If you have any questions, please reach out<br>directly to our customer support
        </p>

      </div>
    </ion-content>

    <div class="bottom-nav">
      <div class="nav-item" :class="{ active: activeTab === 'menu' }" @click="navigateTo('menu')">
        <ion-icon :icon="homeOutline" /><span>Menu</span>
      </div>
      <div class="nav-item" @click="navigateTo('gifts')">
        <ion-icon :icon="giftOutline" /><span>Create</span>
      </div>
      <div class="nav-item center-item" @click="navigateTo('center')">
        <div class="center-btn"><ion-icon :icon="sendOutline" /></div>
      </div>
      <div class="nav-item active" @click="navigateTo('wallet')">
        <ion-icon :icon="cartOutline" /><span>Cart</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="navigateTo('profile')">
        <ion-icon :icon="personOutline" /><span>Profile</span>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import { arrowBackOutline, homeOutline, giftOutline, sendOutline, cartOutline, personOutline } from 'ionicons/icons'
import gsap from 'gsap'

const router = useRouter()
const activeTab = ref('wallet')
const circleWrap  = ref<HTMLElement | null>(null)
const circleStroke = ref<SVGCircleElement | null>(null)
const circleDot   = ref<HTMLElement | null>(null)
const titleEl     = ref<HTMLElement | null>(null)
const subEl       = ref<HTMLElement | null>(null)
const deliveryEl  = ref<HTMLElement | null>(null)
const trackBtn    = ref<HTMLElement | null>(null)
const supportEl   = ref<HTMLElement | null>(null)

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')   router.replace('/menu')
  if (tab === 'wallet') router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
  
}

onMounted(() => {
  const circumference = 2 * Math.PI * 80 

  if (circleStroke.value) {
    circleStroke.value.style.strokeDasharray  = `${circumference}`
    circleStroke.value.style.strokeDashoffset = `${circumference}`
  }

  const tl = gsap.timeline()

  tl.fromTo(circleWrap.value, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
    .to(circleStroke.value,   { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, '-=0.2')
    .fromTo(circleDot.value,  { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, '-=0.3')
    .fromTo(titleEl.value,    { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.1')
    .fromTo(subEl.value,      { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.2')
    .fromTo(deliveryEl.value, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 },  '-=0.2')
    .fromTo(trackBtn.value,   { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 },  '-=0.15')
    .fromTo(supportEl.value,  { opacity: 0 },        { opacity: 1, duration: 0.4 },         '-=0.1')

  gsap.to(circleWrap.value, {
    scale: 1.04, duration: 1.6, yoyo: true, repeat: -1,
    ease: 'sine.inOut', delay: 1.8,
  })
})
</script>

<style scoped>
.confirmed-page { --background: #f5edd8; background: #f5edd8; }
.confirmed-toolbar { --background: transparent; --border-width: 0; }
.back-btn { color: #000; }
.confirmed-content { --background: transparent; }

.confirmed-body {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 0 32px 100px;
  min-height: calc(100vh - 120px); justify-content: center;
  gap: 0;
}

.circle-wrap {
  position: relative;
  width: clamp(150px, 42vw, 200px);
  height: clamp(150px, 42vw, 200px);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 28px;
}
.circle-svg {
  position: absolute; inset: 0; width: 100%; height: 100%;
  transform: rotate(-90deg);
}
.circle-track  { fill: none; stroke: rgba(232,80,26,0.15); stroke-width: 5; }
.circle-stroke { fill: none; stroke: #E8501A; stroke-width: 5; stroke-linecap: round; }
.circle-dot {
  width: clamp(16px, 5vw, 24px); height: clamp(16px, 5vw, 24px);
  background: #E8501A; border-radius: 50%;
  position: relative; z-index: 1;
}

.confirmed-title {
  font-family: 'Archivo', sans-serif; font-weight: 900;
  font-size: clamp(22px, 6.5vw, 32px); color: #000;
  margin: 0 0 12px; letter-spacing: -0.3px;
}
.confirmed-sub {
  font-family: 'Archivo', sans-serif; font-size: clamp(13px, 3.5vw, 15px);
  color: rgba(0,0,0,0.55); line-height: 1.65; margin: 0 0 10px;
}
.confirmed-delivery {
  font-family: 'Archivo', sans-serif; font-size: clamp(13px, 3.5vw, 15px);
  color: #000; margin: 0 0 22px;
}
.confirmed-delivery strong { font-weight: 700; }

.track-link {
  background: none; border: none; padding: 0;
  font-family: 'Archivo', sans-serif; font-weight: 600;
  font-size: clamp(15px, 4vw, 18px); color: #E8501A;
  font-style: italic; cursor: pointer;
  text-decoration: underline; text-underline-offset: 4px;
}

.spacer { flex: 1; min-height: 40px; }

.support-text {
  font-family: 'Archivo', sans-serif; font-size: clamp(12px, 3vw, 14px);
  color: rgba(0,0,0,0.4); line-height: 1.7; margin: 0;
}

.bottom-nav { position: absolute; bottom: 0; left: 0; right: 0; height: 64px; background: white; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: space-around; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex: 1; height: 100%; cursor: pointer; color: #5e5f60; font-family: 'Figtree', sans-serif; font-size: 11px; -webkit-tap-highlight-color: transparent; user-select: none; }
.nav-item ion-icon { font-size: 22px; }
.nav-item.active { color: #00aa5b; }
.center-item { flex: 1; }
.center-btn { width: 52px; height: 52px; background: #00aa5b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,170,91,0.3); margin: 0 auto; }
.center-btn ion-icon { color: white; font-size: 22px; }
</style>