<template>
  <ion-page class="detail-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="detail-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-left" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="detail-content" :scroll-y="true">
      <div class="hero-bg">
        <img
          src="https://www.figma.com/api/mcp/asset/04fbe198-39fc-4c8e-b104-7ee590b17cd7"
          alt="4 Cheese Pizza"
          class="hero-pizza animate__animated animate__zoomIn"
        />
      </div>

      <div class="info-section animate__animated animate__fadeInUp">
        <div class="title-row">
          <h1 class="pizza-title">4 Cheese</h1>
          <ion-button fill="clear" class="fav-btn" @click="toggleFav">
            <ion-icon :icon="isFav ? heart : heartOutline" :color="isFav ? 'danger' : 'dark'" />
          </ion-button>
        </div>

        <p class="pizza-desc">Catupiry, mozzarella, cream cheese, and parmesan.</p>

        <div class="meta-row">
          <div class="meta-item">
            <ion-icon :icon="star" color="warning" />
            <span>4.5</span>
          </div>
          <div class="meta-item">
            <ion-icon :icon="timeOutline" color="medium" />
            <span>10min</span>
          </div>
        </div>

        <h3 class="section-title">Choose the size</h3>
        <div class="size-selector">
          <swiper :slides-per-view="3" :space-between="8" class="size-swiper">
            <swiper-slide v-for="size in sizes" :key="size.name">
              <div
                class="size-card"
                :class="{ active: selectedSize === size.name }"
                @click="selectSize(size.name)"
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/590a2639-a396-437d-973f-866a48f18327"
                  class="size-pizza-img"
                  :style="{ transform: `scale(${size.scale})` }"
                  :alt="size.name"
                />
                <span class="size-name">{{ size.name }}</span>
                <span class="size-slices">{{ size.slices }}</span>
                <span class="size-price">{{ size.price }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="quantity-row">
          <div class="qty-group">
            <button class="qty-btn minus" type="button" @click="decreaseSelectedQty">-</button>
            <span class="qty-value">{{ selectedQty }}</span>
            <button class="qty-btn plus" type="button" @click="increaseSelectedQty">+</button>
          </div>
        </div>

        <h3 class="section-title">Add more</h3>
        <div class="addon-row">
          <div class="addon-img-wrapper">
            <img
              src="https://www.figma.com/api/mcp/asset/16995343-b9dc-4831-82b2-0558e476921b"
              alt="Parmesan"
              class="addon-img"
            />
          </div>
          <div class="addon-info">
            <span class="addon-name">Parmesan cheese</span>
            <span class="addon-price">+1$</span>
          </div>
          <ion-checkbox v-model="parmesanSelected" class="addon-check" color="danger" />
        </div>

        <button class="add-cart-btn" @click="addToCart">
          <span class="btn-label">Add to Cart</span>
          <span class="btn-price">{{ totalPrice }}</span>
        </button>

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
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="navigateTo('profile')">
        <ion-icon :icon="personOutline" />
        <span>Profile</span>
      </div>
    </div>

    <transition name="cart-toast">
      <div v-if="showCartToast" class="cart-toast">
        <div class="cart-toast-inner">
          <div class="cart-toast-icon-wrap">
            <ion-icon :icon="cartOutline" class="cart-toast-icon" />
          </div>
          <div class="cart-toast-text">
            <span class="cart-toast-title">Added to cart</span>
            <span class="cart-toast-sub">4 Cheese · {{ selectedSize }} · {{ selectedQty }} item{{ selectedQty > 1 ? 's' : '' }} · {{ totalPrice }}</span>
          </div>
          <div class="cart-toast-check">
            <ion-icon :icon="checkmarkOutline" />
          </div>
        </div>
        <div class="cart-toast-progress">
          <div class="cart-toast-progress-bar" ref="progressBar"></div>
        </div>
      </div>
    </transition>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonContent,
  IonButton, IonButtons, IonIcon,
  IonCheckbox,
} from '@ionic/vue'
import {
  arrowBackOutline, heartOutline, heart, star, timeOutline,
  homeOutline, giftOutline, sendOutline, cartOutline, personOutline, checkmarkOutline,
} from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()

const isFav = ref(false)
const parmesanSelected = ref(false)
const selectedSize = ref('SMALL')
const quantities = ref([1, 1, 1])
const activeTab = ref('')
const showCartToast = ref(false)
const progressBar = ref<HTMLElement | null>(null)

const sizes = ref([
  { name: 'SMALL',  slices: '4 Slices', price: '5$',  priceNum: 5,  scale: 0.7  },
  { name: 'MEDIUM', slices: '6 Slices', price: '10$', priceNum: 10, scale: 0.85 },
  { name: 'LARGE',  slices: '8 Slices', price: '15$', priceNum: 15, scale: 1.0  },
])

const selectedIdx = computed(() => {
  const idx = sizes.value.findIndex(s => s.name === selectedSize.value)
  return idx === -1 ? 0 : idx
})

const selectedQty = computed(() => quantities.value[selectedIdx.value] ?? 1)

const totalPrice = computed(() => {
  const base = sizes.value[selectedIdx.value].priceNum * selectedQty.value
  const extras = parmesanSelected.value ? 1 : 0
  return `$${base + extras}`
})

const goBack = () => {
  router.replace('/menu')
}

const selectSize = (name: string) => {
  selectedSize.value = name
  gsap.fromTo('.size-card.active', { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
}

const toggleFav = () => {
  isFav.value = !isFav.value
  gsap.fromTo('.fav-btn', { scale: 1 }, { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' })
}

const increaseSelectedQty = () => {
  const idx = selectedIdx.value
  quantities.value[idx] = (quantities.value[idx] ?? 1) + 1
  gsap.fromTo('.qty-value', { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 })
}

const decreaseSelectedQty = () => {
  const idx = selectedIdx.value
  const current = quantities.value[idx] ?? 1
  if (current > 1) quantities.value[idx] = current - 1
}

const addToCart = () => {
  gsap.timeline()
    .to('.add-cart-btn', { scale: 0.96, duration: 0.08 })
    .to('.add-cart-btn', { scale: 1, duration: 0.14, ease: 'back.out(2)' })

  showCartToast.value = true

  nextTick(() => {
    gsap.fromTo('.cart-toast',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.38, ease: 'power3.out' }
    )
    gsap.fromTo('.cart-toast-icon-wrap',
      { scale: 0, rotation: -20 },
      { scale: 1, rotation: 0, duration: 0.45, delay: 0.15, ease: 'back.out(2)' }
    )
    gsap.fromTo('.cart-toast-check',
      { scale: 0 },
      { scale: 1, duration: 0.35, delay: 0.25, ease: 'back.out(2.5)' }
    )
    if (progressBar.value) {
      gsap.fromTo(progressBar.value,
        { scaleX: 1 },
        { scaleX: 0, duration: 2.6, delay: 0.3, ease: 'none',
          transformOrigin: 'left center' }
      )
    }
  })

  setTimeout(() => {
    gsap.to('.cart-toast', {
      y: 30, opacity: 0, duration: 0.28, ease: 'power2.in',
      onComplete: () => {
        showCartToast.value = false
        router.replace('/menu')
      }
    })
  }, 2900)
}

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'wallet') router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'menu')    router.replace('/menu')
}

onMounted(() => {
  gsap.fromTo('.hero-bg', { opacity: 0 }, { opacity: 1, duration: 0.7 })
  gsap.fromTo('.info-section', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
})
</script>

<style scoped>
.detail-page {
  --background: white;
}

.detail-toolbar {
  --background: transparent;
  --border-width: 0;
  position: absolute;
  top: 0;
  z-index: 10;
}

.back-left {
  --padding-start: 8px;
  --padding-end: 8px;
  color: #333;
}

.detail-content {
  --background: white;
}

.hero-bg {
  background: #f5e9d3;
  height: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-pizza {
  width: 225px;
  height: 225px;
  object-fit: cover;
  border-radius: 50%;
}

.info-section {
  padding: 20px 20px 100px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pizza-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 34px;
  color: #000;
  margin: 0;
}

.fav-btn {
  --padding-start: 8px;
  --padding-end: 8px;
}

.pizza-desc {
  font-family: 'Archivo', sans-serif;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.7);
  margin: 6px 0 12px;
  line-height: 1.4;
}

.meta-row {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.section-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #000;
  margin: 16px 0 10px;
}

.size-selector { margin-bottom: 8px; }
.size-swiper { padding: 4px 0; }

.size-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 4px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}

.size-card.active {
  border-color: #ff6347;
  background: rgba(255, 99, 71, 0.08);
}

.size-pizza-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  transform-origin: center;
  transition: transform 0.2s ease;
}

.size-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #ff6347;
}

.size-slices { font-size: 10px; color: #534c4c; font-weight: 700; }
.size-price  { font-size: 10px; color: rgba(83, 76, 76, 0.8); font-weight: 700; }

.quantity-row {
  display: flex;
  gap: 16px;
  margin: 8px 0 16px;
}

.qty-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn.minus { background: #e3e3e3; color: #000; }
.qty-btn.plus  { background: #ff5252; color: white; }

.qty-value {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 22px;
  min-width: 20px;
  text-align: center;
}

.addon-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.addon-img-wrapper { width: 64px; height: 64px; border-radius: 8px; overflow: hidden; }
.addon-img         { width: 100%; height: 100%; object-fit: cover; }

.addon-info { flex: 1; display: flex; flex-direction: column; }

.addon-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.7);
}

.addon-price {
  font-family: 'Archivo', sans-serif;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
}

.addon-check { --size: 20px; }

.add-cart-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 58px;
  margin-top: 24px;
  padding: 0;
  border: none;
  border-radius: 16px;
  background: #ff5252;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(255, 82, 82, 0.45);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.add-cart-btn:active {
  transform: scale(0.97);
  box-shadow: 0 3px 10px rgba(255, 82, 82, 0.3);
}

.btn-label {
  flex: 1;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: white;
  text-align: center;
  letter-spacing: 0.3px;
}

.btn-price {
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: 24px;
  color: white;
  background: rgba(0, 0, 0, 0.22);
  height: 100%;
  min-width: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  letter-spacing: -0.5px;
  border-left: 1.5px solid rgba(255, 255, 255, 0.3);
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

.cart-toast {
  position: absolute;
  bottom: 82px;
  left: 14px;
  right: 14px;
  z-index: 200;
  pointer-events: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0,0,0,0.1);
}

.cart-toast-inner {
  background: #111111;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 13px;
}

.cart-toast-icon-wrap {
  width: 42px;
  height: 42px;
  background: #ff5252;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cart-toast-icon {
  font-size: 20px;
  color: white;
}

.cart-toast-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3px;
}

.cart-toast-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0.1px;
}

.cart-toast-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.2px;
}

.cart-toast-check {
  width: 34px;
  height: 34px;
  background: #00aa5b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  color: white;
}

.cart-toast-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.07);
}

.cart-toast-progress-bar {
  height: 100%;
  background: #ff5252;
  transform-origin: left center;
}

.cart-toast-enter-active,
.cart-toast-leave-active { transition: none; }
</style>