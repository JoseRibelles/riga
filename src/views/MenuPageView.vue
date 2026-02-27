<template>
  <ion-page class="menu-page">
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent" class="menu-toolbar">
        <ion-title class="menu-title">MENÚ</ion-title>
      </ion-toolbar>
    </ion-header>

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

    <ion-content class="menu-content" :scroll-events="true" @ionScroll="onScroll">
      <div class="pizza-list">
        <div
          v-for="(pizza, index) in pizzas"
          :key="pizza.name"
          class="pizza-card animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${index * 0.08}s` }"
          @click="goToDetail(pizza)"
        >
          <div class="pizza-image-wrapper">
            <img :src="pizza.image" :alt="pizza.name" class="pizza-image" />
          </div>
          <div class="pizza-info">
            <h3 class="pizza-name">{{ pizza.name }}</h3>
            <p class="pizza-desc">{{ pizza.description }}</p>
            <!-- FIX 3: @click.stop para no propagar al card, y llama addToCart con la pizza -->
            <ion-button
              class="order-btn"
              expand="block"
              color="danger"
              size="small"
              @click.stop="addToCart(pizza)"
            >
              ORDER NOW
            </ion-button>
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
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="navigateTo('profile')">
        <ion-icon :icon="personOutline" />
        <span>Profile</span>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonIcon,
} from '@ionic/vue'
import {
  homeOutline, giftOutline, sendOutline,
  cartOutline, personOutline
} from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const selectedSize = ref('SMALL')

const activeTab = ref('menu')

const sizes = ref([
  { name: 'SMALL', slices: '4 Slices', price: '5$', icon: 'https://www.figma.com/api/mcp/asset/590a2639-a396-437d-973f-866a48f18327' },
  { name: 'MEDIUM', slices: '6 Slices', price: '10$', icon: 'https://www.figma.com/api/mcp/asset/590a2639-a396-437d-973f-866a48f18327' },
  { name: 'LARGE', slices: '8 Slices', price: '15$', icon: 'https://www.figma.com/api/mcp/asset/590a2639-a396-437d-973f-866a48f18327' },
])

const pizzas = ref([
  {
    name: '4 Cheese',
    description: 'Catupiry, mozzarella, cream cheese, and parmesan.',
    image: 'https://www.figma.com/api/mcp/asset/04fbe198-39fc-4c8e-b104-7ee590b17cd7',
    route: '/4-cheese',
  },
  {
    name: 'Chicken with cheese',
    description: 'Chicken and cream cheese.',
    image: 'https://www.figma.com/api/mcp/asset/722f0672-01d6-4d2a-8e34-a0841ec7cc59',
    route: '/4-cheese', 
  },
  {
    name: 'Pepperoni',
    description: 'Calabrese sausage and mozzarella.',
    image: 'https://www.figma.com/api/mcp/asset/2ee5101b-0f53-41b4-911d-c4a8a4501b0f',
    route: '/4-cheese',
  },
  {
    name: 'Napolitana',
    description: 'Cheese, tomato, and Parmesan.',
    image: 'https://www.figma.com/api/mcp/asset/57266105-99b5-4f65-a1fa-bcfd8566de5a',
    route: '/4-cheese',
  },
  {
    name: 'Peperoni oilves',
    description: 'Cheese, pepperoni, black olives, grated Parmesan, oregano, garlic, and cream cheese.',
    image: 'https://www.figma.com/api/mcp/asset/ef2f8859-0380-4a62-b698-5c3807a122dd',
    route: '/4-cheese',
  },
  {
    name: 'Margherita',
    description: 'Cheese, tomato, and basil.',
    image: 'https://www.figma.com/api/mcp/asset/3a872393-7cd4-4699-bcd5-14a5de14897f',
    route: '/4-cheese',
  },
  {
    name: 'Vegetariana',
    description: 'Cheese, mushrooms, black olives, onion, oregano, and green bell pepper.',
    image: 'https://www.figma.com/api/mcp/asset/09ce283c-55a6-47ac-9d2d-21958a601ab7',
    route: '/4-cheese',
  },
  {
    name: 'Bacon',
    description: 'Bacon, tomato, and pepperoni.',
    image: 'https://www.figma.com/api/mcp/asset/94ca6f2d-7106-427d-a2b2-dd12f249dd6f',
    route: '/4-cheese',
  },
  {
    name: '3 Chesse',
    description: 'Catupiry, mozzarella, and cream cheese.',
    image: 'https://www.figma.com/api/mcp/asset/478c43e4-4810-415d-922d-ddd2702e38b6',
    route: '/4-cheese',
  },
])

const selectSize = (name: string) => {
  selectedSize.value = name
  gsap.fromTo(`.size-option.active`, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
}

const addToCart = (pizza: any) => {
  gsap.to('.order-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
  router.push(pizza.route)
}

const goToDetail = (pizza: any) => {
  router.push(pizza.route)
}

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.push('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
}

const onScroll = (e: any) => {}

onMounted(() => {
  gsap.fromTo('.menu-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
  gsap.fromTo('.size-selector-wrapper', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
})
</script>

<style scoped>
.menu-page {
  --background: #d8c2a7;
  background: #d8c2a7;
}

.menu-toolbar {
  --background: transparent;
  --border-width: 0;
}

.menu-title {
  color: #ea4335;
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}

.size-selector-wrapper {
  background: #d8c2a7;
  padding: 8px 16px 4px;
}

.size-swiper {
  padding: 4px 0 8px;
}

.size-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 6px;
  border-radius: 10px;
  transition: background 0.2s;
}

.size-option.active {
  background: rgba(255, 99, 71, 0.12);
}

.size-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.size-label {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #ff6347;
}

.size-slices {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 11px;
  color: #534c4c;
}

.size-price {
  font-size: 10px;
  color: rgba(83, 76, 76, 0.8);
  font-weight: 700;
  font-family: 'Archivo', sans-serif;
}

.menu-content {
  --background: #d8c2a7;
}

.pizza-list {
  padding: 8px 16px 90px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pizza-card {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(83, 76, 76, 0.1);
  cursor: pointer;
}

.pizza-image-wrapper {
  width: 155px;
  height: 124px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
}

.pizza-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.pizza-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2px;
}

.pizza-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 19px;
  color: #433a3a;
  margin: 0 0 4px;
}

.pizza-desc {
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  color: rgba(83, 76, 76, 0.9);
  margin: 0 0 8px;
  line-height: 1.4;
  flex: 1;
}

.order-btn {
  --background: #ff5252;
  --border-radius: 6px;
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 13px;
  height: 29px;
  letter-spacing: 0.5px;
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