<template>
  <ion-page class="menu-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="menu-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/create')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="menu-title">SMALL MENÚ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="menu-content">
      <div class="menu-body">

        <p class="menu-subtitle">The maximum number of slices for this menu is {{ maxSlices }}</p>

        <div
          v-for="(pizza, idx) in pizzas"
          :key="pizza.name"
          class="pizza-row animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${idx * 0.06}s` }"
        >
          <img :src="pizza.image" :alt="pizza.name" class="pizza-img" />
          <div class="pizza-info">
            <span class="pizza-name">{{ pizza.name }}</span>
            <span class="pizza-desc">{{ pizza.desc }}</span>
            <div class="qty-ctrl">
              <button class="qty-btn minus" @click="decrease(idx)">-</button>
              <span class="qty-val">{{ pizza.qty }}</span>
              <button class="qty-btn plus" @click="increase(idx)">+</button>
            </div>
          </div>
        </div>

      </div>
    </ion-content>

    <div class="add-to-cart-bar">
      <button class="add-btn" @click="addToCart">Add To Car</button>
    </div>

    <div class="bottom-nav">
      <div class="nav-item" @click="navigateTo('menu')">
        <ion-icon :icon="homeOutline" /><span>Menu</span>
      </div>
      <div class="nav-item active">
        <ion-icon :icon="giftOutline" /><span>Create</span>
      </div>
      <div class="nav-item center-item" @click="navigateTo('center')">
        <div class="center-btn"><ion-icon :icon="sendOutline" /></div>
      </div>
      <div class="nav-item" @click="navigateTo('cart')">
        <ion-icon :icon="cartOutline" /><span>Cart</span>
      </div>
      <div class="nav-item" @click="navigateTo('profile')">
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
import 'animate.css'

const router = useRouter()
const maxSlices = 4

const pizzas = ref([
  { name: '4 Cheese',          desc: 'Catupiry, mozzarella, cream cheese, and parmesan.',                                                           image: 'https://www.figma.com/api/mcp/asset/af0db52f-0d6c-48ec-84ff-a980c06efa7f', qty: 0 },
  { name: 'Chicken with cheese',desc: 'Chicken and cream cheese.',                                                                                    image: 'https://www.figma.com/api/mcp/asset/eb1459b0-f775-4096-b9c5-0e555a0dacc9', qty: 0 },
  { name: 'Pepperoni',          desc: 'Calabrese sausage and mozzarella.',                                                                            image: 'https://www.figma.com/api/mcp/asset/a3b4e4f7-ce03-44cc-8b9b-4aae33827262', qty: 0 },
  { name: 'Napolitana',         desc: 'Cheese, tomato, and Parmesan.',                                                                               image: 'https://www.figma.com/api/mcp/asset/c91c9f34-a0c7-4712-8bc1-db76ff4df3f1', qty: 0 },
  { name: 'Pepperoni olives',   desc: 'Cheese, pepperoni, black olives, grated Parmesan, oregano, granulated garlic, and cream cheese.',              image: 'https://www.figma.com/api/mcp/asset/d43a0878-206a-43be-9128-a38c2e9d4e94', qty: 0 },
  { name: 'Margherita',         desc: 'Cheese, tomato, and basil.',                                                                                  image: 'https://www.figma.com/api/mcp/asset/b048d28f-3ace-481f-ae3d-6c5ccf2dddb0', qty: 0 },
  { name: 'Vegetariana',        desc: 'Cheese, mushrooms, black olives, onion, oregano, and green bell pepper.',                                     image: 'https://www.figma.com/api/mcp/asset/dfd6ef9f-7ea3-4958-a334-8e81f90487d1', qty: 0 },
  { name: 'Bacon',              desc: 'Bacon, tomato, and pepperoni.',                                                                               image: 'https://www.figma.com/api/mcp/asset/c4ba8911-7db5-4821-b373-358f777e8d0e', qty: 0 },
  { name: '3 Cheese',           desc: 'Catupiry, mozzarella, and cream cheese.',                                                                     image: 'https://www.figma.com/api/mcp/asset/4ab6bc7f-c537-405f-8e0f-0b83722eb457', qty: 0 },
])

const totalSlices = () => pizzas.value.reduce((s, p) => s + p.qty, 0)

const increase = (idx: number) => {
  if (totalSlices() < maxSlices) pizzas.value[idx].qty++
}
const decrease = (idx: number) => {
  if (pizzas.value[idx].qty > 0) pizzas.value[idx].qty--
}

const addToCart = () => {
  router.push('/cart')
}

const navigateTo = (tab: string) => {
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'cart')    router.push('/cart')
  if (tab === 'profile') router.push('/settings')
}
</script>

<style scoped>
.menu-page    { --background: #d8c2a7; background: #d8c2a7; }
.menu-toolbar { --background: transparent; --border-width: 0; }
.menu-title   {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: 18px; color: #ea4335; text-transform: uppercase;
}
.back-btn     { color: #000; }
.menu-content { --background: transparent; }

.menu-body { padding: 8px 16px 160px; display: flex; flex-direction: column; gap: 4px; }

.menu-subtitle {
  font-family: 'Archivo', sans-serif; font-weight: 300;
  font-size: clamp(14px, 4vw, 18px); color: #000;
  text-align: center; line-height: 1.4; margin: 0 0 12px;
}

.pizza-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
}
.pizza-img {
  width: clamp(100px, 38vw, 155px); height: clamp(80px, 28vw, 124px);
  object-fit: cover; border-radius: 8px; flex-shrink: 0;
}
.pizza-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.pizza-name {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: clamp(14px, 4vw, 20px); color: #433a3a;
}
.pizza-desc {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: clamp(11px, 3vw, 14px); color: rgba(83,76,76,0.9);
  line-height: 1.3;
}

.qty-ctrl { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.qty-btn {
  width: 30px; height: 30px; border: none; border-radius: 8px;
  font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 18px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  line-height: 1;
}
.qty-btn.minus { background: #e3e3e3; color: #000; }
.qty-btn.plus  { background: #ff5252; color: white; }
.qty-val {
  font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 22px;
  color: #000; min-width: 24px; text-align: center;
}

.add-to-cart-bar {
  position: absolute; bottom: 64px; left: 0; right: 0;
  padding: 12px 20px; background: #d8c2a7;
  z-index: 99;
}
.add-btn {
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: #E8501A; color: white;
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: clamp(13px, 4vw, 16px); text-transform: capitalize;
  cursor: pointer; box-shadow: 0 4px 16px rgba(232,80,26,0.3);
  transition: transform 0.1s;
}
.add-btn:active { transform: scale(0.98); }

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
.nav-item.active   { color: #E8501A; }
.center-item       { flex: 1; }
.center-btn {
  width: 52px; height: 52px; background: #00aa5b; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,170,91,0.3); margin: 0 auto;
}
.center-btn ion-icon { color: white; font-size: 22px; }
</style>