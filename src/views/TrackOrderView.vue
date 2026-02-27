<template>
  <ion-page class="track-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="track-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/order-confirmed')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="track-title">Track Order</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="chat-icon-btn" @click="router.push('/chat')">
            <ion-icon :icon="chatbubbleOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="track-content" :scroll-y="true">

      <div class="map-container" ref="mapContainer" id="leaflet-map"></div>

      <div class="driver-card animate__animated animate__fadeInUp">
        <div class="driver-left">
          <div class="driver-avatar-wrap">
            <img
              src="https://www.figma.com/api/mcp/asset/9d50b6a8-bdb0-4e90-93d6-2d796fd436f2"
              class="driver-avatar"
              alt="Driver"
            />
            <span class="driver-online-dot"></span>
          </div>
          <div class="driver-info">
            <span class="driver-name">Pablo Martínez</span>
            <span class="driver-role">Your delivery driver</span>
            <div class="driver-rating">
              <ion-icon :icon="star" class="star-icon" />
              <span>4.9 · 243 deliveries</span>
            </div>
          </div>
        </div>
        <div class="driver-actions">
          <button class="action-btn" @click="callDriver">
            <ion-icon :icon="callOutline" />
          </button>
          <button class="action-btn" @click="router.push('/chat')">
            <ion-icon :icon="chatbubbleOutline" />
          </button>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-title">Order Status</span>
          <span class="eta-badge">ETA: ~15 min</span>
        </div>

        <div class="steps">
          <div v-for="(step, idx) in steps" :key="idx" class="step-row">
            <div class="step-left">
              <div class="step-dot" :class="step.status"></div>
              <div class="step-line" v-if="idx < steps.length - 1" :class="{ done: steps[idx + 1].status !== 'pending' }"></div>
            </div>
            <div class="step-body">
              <span class="step-label" :class="step.status">{{ step.label }}</span>
              <span class="step-time">{{ step.time }}</span>
            </div>
            <div class="step-icon-wrap" :class="step.status">
              <ion-icon :icon="step.icon" />
            </div>
          </div>
        </div>
      </div>

      <div class="order-mini-card">
        <div class="order-mini-row">
          <span class="om-label">Order #1042</span>
          <span class="om-badge">On its way</span>
        </div>
        <div class="order-mini-row">
          <span class="om-sub">4 Cheese · Large · Pepperoni · Medium</span>
        </div>
      </div>

      <div style="height: 90px;"></div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import {
  arrowBackOutline, homeOutline, giftOutline, sendOutline, cartOutline,
  personOutline, chatbubbleOutline, callOutline, star,
  checkmarkCircle, radioButtonOn, ellipseOutline, bicycleOutline, storefrontOutline,
} from 'ionicons/icons'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const activeTab = ref('wallet')
const mapContainer = ref<HTMLElement | null>(null)
let leafletMap: any = null

const steps = ref([
  { label: 'Order confirmed',   time: '10:05', status: 'done',   icon: checkmarkCircle },
  { label: 'Preparing your food', time: '10:10', status: 'done', icon: storefrontOutline },
  { label: 'On the way',        time: '10:18', status: 'active', icon: bicycleOutline },
  { label: 'Delivered',         time: '~10:35', status: 'pending', icon: radioButtonOn },
])

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
}

const callDriver = () => {
  gsap.fromTo('.action-btn:first-child',
    { scale: 1 },
    { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }
  )
}

let riderMarker: any = null
let animInterval: ReturnType<typeof setInterval> | null = null

const animateRider = (L: any) => {
  const route = [
    [41.3970, 2.1700],
    [41.3965, 2.1720],
    [41.3960, 2.1740],
    [41.3955, 2.1760],
    [41.3950, 2.1780],
  ]
  let idx = 0

  const riderIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;background:#E8501A;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;box-shadow:0 3px 10px rgba(232,80,26,0.5);
      border:2px solid white;">🛵</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

  riderMarker = L.marker(route[0], { icon: riderIcon }).addTo(leafletMap)

  animInterval = setInterval(() => {
    idx = (idx + 1) % route.length
    riderMarker.setLatLng(route[idx])
  }, 2000)
}

onMounted(async () => {
  if (!(window as any).L) {
    await new Promise<void>((resolve) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }

  const L = (window as any).L

  leafletMap = L.map('leaflet-map', {
    zoomControl: false,
    attributionControl: false,
  }).setView([41.3851, 2.1734], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(leafletMap)

  const restaurantIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;background:#f5edd8;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;box-shadow:0 3px 10px rgba(0,0,0,0.2);
      border:2px solid #E8501A;">🍕</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  })

  L.marker([41.3951, 2.1641], { icon: restaurantIcon })
    .addTo(leafletMap)
    .bindPopup('Riga Pizza')

  const homeIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;background:#00aa5b;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;box-shadow:0 3px 10px rgba(0,170,91,0.4);
      border:2px solid white;">🏠</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  })

  L.marker([41.3950, 2.1780], { icon: homeIcon })
    .addTo(leafletMap)
    .bindPopup('Your location')

  const routeCoords: [number, number][] = [
    [41.3951, 2.1641],
    [41.3960, 2.1680],
    [41.3965, 2.1720],
    [41.3960, 2.1750],
    [41.3950, 2.1780],
  ]
  L.polyline(routeCoords, { color: '#E8501A', weight: 3, dashArray: '6,8', opacity: 0.7 }).addTo(leafletMap)

  animateRider(L)

  gsap.fromTo('.driver-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 })
  gsap.fromTo('.step-row', { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.5 })
})

onUnmounted(() => {
  if (animInterval) clearInterval(animInterval)
  if (leafletMap)   leafletMap.remove()
})
</script>

<style scoped>
.track-page { --background: #f5edd8; background: #f5edd8; }
.track-toolbar { --background: #f5edd8; --border-width: 0; }
.track-title { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px; color: #000; }
.back-btn, .chat-icon-btn { color: #000; }
.track-content { --background: #f5edd8; }

.map-container {
  width: 100%; height: clamp(220px, 45vw, 300px);
  background: #e8e0d0;
}

.driver-card {
  margin: -1px 16px 0;
  background: white; border-radius: 20px;
  padding: 16px; display: flex; align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative; z-index: 10;
}
.driver-left { display: flex; align-items: center; gap: 12px; }
.driver-avatar-wrap { position: relative; }
.driver-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid #f5edd8; }
.driver-online-dot {
  position: absolute; bottom: 2px; right: 2px;
  width: 11px; height: 11px; background: #00aa5b;
  border-radius: 50%; border: 2px solid white;
}
.driver-info { display: flex; flex-direction: column; gap: 2px; }
.driver-name { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 15px; color: #000; }
.driver-role { font-family: 'Archivo', sans-serif; font-size: 11px; color: rgba(0,0,0,0.4); }
.driver-rating { display: flex; align-items: center; gap: 4px; font-family: 'Archivo', sans-serif; font-size: 11px; color: rgba(0,0,0,0.5); }
.star-icon { color: #fbbf24; font-size: 12px; }
.driver-actions { display: flex; gap: 8px; }
.action-btn {
  width: 40px; height: 40px; border-radius: 12px; border: none;
  background: #f5edd8; display: flex; align-items: center; justify-content: center;
  font-size: 18px; cursor: pointer; color: #E8501A;
}

.progress-section { padding: 20px 16px 0; }
.progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.progress-title { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 17px; color: #000; }
.eta-badge {
  background: rgba(232,80,26,0.1); color: #E8501A;
  font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 12px;
  border-radius: 20px; padding: 4px 12px;
}

.steps { display: flex; flex-direction: column; }
.step-row { display: flex; align-items: flex-start; gap: 12px; }
.step-left { display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0; }
.step-dot {
  width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
  border: 2px solid #ddd;
}
.step-dot.done   { background: #00aa5b; border-color: #00aa5b; }
.step-dot.active { background: #E8501A; border-color: #E8501A; box-shadow: 0 0 0 4px rgba(232,80,26,0.2); }
.step-dot.pending{ background: white; border-color: #ddd; }
.step-line { width: 2px; flex: 1; min-height: 28px; background: #ddd; margin: 3px 0; }
.step-line.done { background: #00aa5b; }

.step-body { flex: 1; padding-bottom: 20px; }
.step-label { font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 14px; color: #ccc; display: block; }
.step-label.done   { color: #000; }
.step-label.active { color: #E8501A; font-weight: 700; }
.step-time { font-family: 'Archivo', sans-serif; font-size: 11px; color: rgba(0,0,0,0.35); margin-top: 2px; display: block; }

.step-icon-wrap {
  width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; background: #ede8df; color: #bbb; margin-top: 0;
}
.step-icon-wrap.done   { background: rgba(0,170,91,0.12); color: #00aa5b; }
.step-icon-wrap.active { background: rgba(232,80,26,0.12); color: #E8501A; }

.order-mini-card {
  margin: 16px 16px 0; background: rgba(255,255,255,0.65);
  border-radius: 16px; padding: 14px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.order-mini-row { display: flex; align-items: center; justify-content: space-between; }
.order-mini-row + .order-mini-row { margin-top: 6px; }
.om-label { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px; color: #000; }
.om-badge {
  background: rgba(0,170,91,0.12); color: #00aa5b;
  font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 11px;
  border-radius: 20px; padding: 3px 10px;
}
.om-sub { font-family: 'Archivo', sans-serif; font-size: 12px; color: rgba(0,0,0,0.4); }

.bottom-nav { position: absolute; bottom: 0; left: 0; right: 0; height: 64px; background: white; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: space-around; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex: 1; height: 100%; cursor: pointer; color: #5e5f60; font-family: 'Figtree', sans-serif; font-size: 11px; -webkit-tap-highlight-color: transparent; user-select: none; }
.nav-item ion-icon { font-size: 22px; }
.nav-item.active { color: #00aa5b; }
.center-item { flex: 1; }
.center-btn { width: 52px; height: 52px; background: #00aa5b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,170,91,0.3); margin: 0 auto; }
.center-btn ion-icon { color: white; font-size: 22px; }
</style>