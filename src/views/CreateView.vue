<template>
  <ion-page class="create-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="create-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/menu')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="create-title">CREATE MENÚ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="create-content">
      <div class="create-body">

        <p class="create-subtitle">
          Create your own pizza! Select the size you want, choose how many slices you want, and add toppings!
        </p>

        <div class="size-selector-wrapper">
          <swiper :slides-per-view="3" :space-between="10" class="size-swiper">
            <swiper-slide v-for="size in sizes" :key="size.name">
              <div
                class="size-option"
                :class="{ active: selectedSize === size.name }"
                @click="selectSize(size.name)"
              >
                <img :src="size.icon" class="size-icon" />
                <span class="size-label">{{ size.name }}</span>
                <span class="size-slices">{{ size.slices }}</span>
                <span class="size-price">{{ size.price }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="carousel-wrap">
          <swiper
            :slides-per-view="1.15"
            :space-between="12"
            :centered-slides="true"
            :loop="true"
            class="pizza-swiper"
          >
            <swiper-slide v-for="img in carouselImages" :key="img">
              <div class="slide-img-wrap">
                <img :src="img" alt="pizza" class="slide-img" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="cta-row" @click="goToMenu">
          <span class="cta-arrow">→</span>
          <span class="cta-text">TO VIEW ALL THE PIZZAS</span>
        </div>

      </div>
    </ion-content>

    <div class="bottom-nav">
      <div class="nav-item" :class="{ active: activeTab === 'menu' }" @click="navigateTo('menu')">
        <ion-icon :icon="homeOutline" /><span>Menu</span>
      </div>
      <div class="nav-item active">
        <ion-icon :icon="giftOutline" /><span>Create</span>
      </div>
      <div class="nav-item center-item" @click="navigateTo('center')">
        <div class="center-btn"><ion-icon :icon="sendOutline" /></div>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'wallet' }" @click="navigateTo('wallet')">
        <ion-icon :icon="cartOutline" /><span>Cart</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="navigateTo('profile')">
        <ion-icon :icon="personOutline" /><span>Profile</span>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import { arrowBackOutline, homeOutline, giftOutline, sendOutline, cartOutline, personOutline } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import gsap from 'gsap'

const router = useRouter()
const activeTab = ref('gifts')
const selectedSize = ref('SMALL')

const pizzaIcon = 'https://www.figma.com/api/mcp/asset/590a2639-a396-437d-973f-866a48f18327'

const sizes = [
  { name: 'SMALL',  slices: '4 Slices', price: '5$',  icon: pizzaIcon, route: '/small-menu'  },
  { name: 'MEDIUM', slices: '6 Slices', price: '10$', icon: pizzaIcon, route: '/medium-menu' },
  { name: 'LARGE',  slices: '8 Slices', price: '15$', icon: pizzaIcon, route: '/large-menu'  },
]

const carouselImages = [
  'https://www.figma.com/api/mcp/asset/320269e8-2353-4cb3-bcee-891b8775324d',
  'https://www.figma.com/api/mcp/asset/7f2dcb2e-4f8d-4820-9c2c-a9598c2e7955',
  'https://www.figma.com/api/mcp/asset/2ad6218a-b0f7-4a51-8560-5360c67b1a12',
  'https://www.figma.com/api/mcp/asset/a7d2817e-5861-41d8-8aed-e5610c7361df',
  'https://www.figma.com/api/mcp/asset/d533e5a7-7788-40c8-8c82-08fa86c18089',
  'https://www.figma.com/api/mcp/asset/4be42b3e-95ad-45bd-bbe3-b2e5fb1386c7',
  'https://www.figma.com/api/mcp/asset/982b6025-2558-46c3-a70a-229e82b86c5e',
  'https://www.figma.com/api/mcp/asset/9bdb665d-bef6-4aa0-bef5-091e5b6da202',
]

const selectSize = (name: string) => {
  selectedSize.value = name
  gsap.fromTo('.size-option.active', { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
}

const goToMenu = () => {
  const size = sizes.find(s => s.name === selectedSize.value)
  if (size) router.push(size.route)
}

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
}
</script>

<style scoped>
.create-page    { --background: #f5edd8; background: #f5edd8; }
.create-toolbar { --background: transparent; --border-width: 0; }
.create-title   {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: 18px; color: #ea4335; text-transform: uppercase;
}
.back-btn     { color: #000; }
.create-content { --background: transparent; }

.create-body {
  padding: 8px 16px 110px;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}

.create-subtitle {
  font-family: 'Archivo', sans-serif; font-weight: 300;
  font-size: clamp(14px, 4vw, 18px); color: #000;
  text-align: center; line-height: 1.5; margin: 0;
  max-width: 300px;
}

.size-selector-wrapper { width: 100%; }
.size-swiper { padding: 4px 0 8px; }

.size-option {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  cursor: pointer; padding: 6px; border-radius: 10px; transition: background 0.2s;
}
.size-option.active { background: rgba(255, 99, 71, 0.12); }

.size-icon   { width: 64px; height: 64px; object-fit: contain; }
.size-label  { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 13px; color: #ff6347; }
.size-slices { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 11px; color: #534c4c; }
.size-price  { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 10px; color: rgba(83,76,76,0.8); }

.carousel-wrap { width: 100%; }
.pizza-swiper  { width: 100%; padding: 8px 0; }
.slide-img-wrap {
  border-radius: 10px; overflow: hidden;
  aspect-ratio: 1; width: clamp(200px, 65vw, 260px); margin: 0 auto;
}
.slide-img { width: 100%; height: 100%; object-fit: cover; display: block; }

.cta-row {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
}
.cta-arrow { font-size: 18px; color: #000; }
.cta-text  {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: clamp(12px, 3.5vw, 15px); color: #000;
  text-transform: uppercase; letter-spacing: 0.5px;
}

.bottom-nav {
  position: absolute; bottom: 0; left: 0; right: 0; height: 64px;
  background: white; border-top: 1px solid rgba(0,0,0,0.08);
  display: flex; align-items: center; justify-content: space-around;
  z-index: 100; padding-bottom: env(safe-area-inset-bottom, 0px);
}
.nav-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; flex: 1; height: 100%; cursor: pointer;
  color: #5e5f60; font-family: 'Figtree', sans-serif; font-size: 11px;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.nav-item ion-icon { font-size: 22px; }
.nav-item.active   { color: #00aa5b; }
.center-item       { flex: 1; }
.center-btn {
  width: 52px; height: 52px; background: #00aa5b; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,170,91,0.3); margin: 0 auto;
}
.center-btn ion-icon { color: white; font-size: 22px; }
</style>