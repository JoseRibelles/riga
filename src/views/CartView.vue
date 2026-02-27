<template>
  <ion-page class="cart-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="cart-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/menu')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="cart-title">My Cart</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" v-if="cartItems.length > 0" @click="clearCart">
            <span class="clear-label">Clear all</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="cart-content">
      <div v-if="cartItems.length === 0" class="empty-state animate__animated animate__fadeIn">
        <div class="empty-icon">🛒</div>
        <h2 class="empty-title">Your cart is empty</h2>
        <p class="empty-sub">Add some delicious pizzas to get started</p>
        <button class="btn-primary" @click="router.replace('/menu')">Browse Menu</button>
      </div>

      <div v-else class="cart-body">
        <div
          v-for="(item, idx) in cartItems"
          :key="item.id"
          class="cart-item animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${idx * 0.07}s` }"
          :ref="el => setItemRef(el, idx)"
        >
          <div class="item-img-wrap">
            <img :src="item.image" :alt="item.name" class="item-img" />
          </div>
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-meta">{{ item.size }} · {{ item.slices }}</span>
            <span class="item-price">{{ formatPrice(item.price * item.qty) }}</span>
          </div>
          <div class="item-qty-wrap">
            <button class="qty-btn minus" @click="decrease(idx)">
              <ion-icon :icon="removeOutline" />
            </button>
            <span class="qty-val" :ref="el => setQtyRef(el, idx)">{{ item.qty }}</span>
            <button class="qty-btn plus" @click="increase(idx)">
              <ion-icon :icon="addOutline" />
            </button>
          </div>
        </div>

        <div class="promo-row">
          <input v-model="promoCode" class="promo-input" placeholder="Promo code" @keyup.enter="applyPromo" />
          <button class="promo-btn" ref="promoBtnRef" @click="applyPromo">Apply</button>
        </div>
        <p v-if="promoMsg" class="promo-msg" :class="{ success: promoOk }">{{ promoMsg }}</p>

        <div class="summary-card">
          <div class="summary-row">
            <span class="s-label">Subtotal</span>
            <span class="s-val">{{ formatPrice(subtotal) }}</span>
          </div>
          <div class="summary-row">
            <span class="s-label">Delivery fee</span>
            <span class="s-val">$2.50</span>
          </div>
          <div class="summary-row" v-if="discount > 0">
            <span class="s-label green">Discount ({{ appliedPromo }})</span>
            <span class="s-val green">-{{ formatPrice(discount) }}</span>
          </div>
          <div class="summary-divider" />
          <div class="summary-row">
            <span class="s-label bold">Total</span>
            <span class="s-val bold red">{{ formatPrice(total) }}</span>
          </div>
        </div>

        <button class="btn-primary checkout-btn" ref="checkoutBtnRef" @click="checkout">
          Proceed to Checkout · {{ formatPrice(total) }}
        </button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonButton, IonIcon
} from '@ionic/vue'
import {
  arrowBackOutline, homeOutline, giftOutline,
  sendOutline, cartOutline, personOutline,
  addOutline, removeOutline
} from 'ionicons/icons'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const activeTab = ref('wallet')
const promoCode = ref('')
const promoMsg = ref('')
const promoOk = ref(false)
const appliedPromo = ref('')
const discountRate = ref(0)

const itemRefs = ref<(HTMLElement | null)[]>([])
const qtyRefs  = ref<(Element | null)[]>([])
const promoBtnRef    = ref<HTMLElement | null>(null)
const checkoutBtnRef = ref<HTMLElement | null>(null)

const setItemRef = (el: unknown, idx: number) => {
  itemRefs.value[idx] = el as HTMLElement | null
}
const setQtyRef = (el: unknown, idx: number) => {
  qtyRefs.value[idx] = el as Element | null
}

const cartItems = ref([
  {
    id: 1, name: '4 Cheese', size: 'Large', slices: '8 slices', price: 15, qty: 1,
    image: 'https://www.figma.com/api/mcp/asset/04fbe198-39fc-4c8e-b104-7ee590b17cd7'
  },
  {
    id: 2, name: 'Pepperoni', size: 'Medium', slices: '6 slices', price: 10, qty: 2,
    image: 'https://www.figma.com/api/mcp/asset/2ee5101b-0f53-41b4-911d-c4a8a4501b0f'
  },
])

const subtotal = computed(() =>
  cartItems.value.reduce((s, i) => s + i.price * i.qty, 0)
)
const discount = computed(() => subtotal.value * discountRate.value)
const total    = computed(() => Math.max(0, subtotal.value + 2.5 - discount.value))
const formatPrice = (n: number) => `$${n.toFixed(2)}`

const increase = (idx: number) => {
  cartItems.value[idx].qty++
  const el = qtyRefs.value[idx]
  if (el) gsap.fromTo(el, { scale: 1.5, color: '#E8501A' }, { scale: 1, color: '#000', duration: 0.25 })
}

const decrease = (idx: number) => {
  if (cartItems.value[idx].qty > 1) {
    cartItems.value[idx].qty--
    const el = qtyRefs.value[idx]
    if (el) gsap.fromTo(el, { scale: 0.7, color: '#E8501A' }, { scale: 1, color: '#000', duration: 0.25 })
  } else {
    const el = itemRefs.value[idx]
    if (el) {
      gsap.to(el, {
        x: -100, opacity: 0, height: 0,
        marginBottom: 0, paddingTop: 0, paddingBottom: 0,
        duration: 0.3,
        onComplete: () => {
          cartItems.value.splice(idx, 1)
          itemRefs.value.splice(idx, 1)
          qtyRefs.value.splice(idx, 1)
        }
      })
    } else {
      cartItems.value.splice(idx, 1)
    }
  }
}

const clearCart = () => {
  const elements = itemRefs.value.filter(Boolean)
  if (elements.length === 0) {
    cartItems.value = []
    return
  }
  gsap.to(elements, {
    x: -100, opacity: 0, stagger: 0.05, duration: 0.28,
    onComplete: () => {
      cartItems.value = []
      itemRefs.value = []
      qtyRefs.value = []
    }
  })
}

const applyPromo = () => {
  const code = promoCode.value.trim().toUpperCase()
  if (code.length === 0) return
  discountRate.value = 0.1
  appliedPromo.value = code
  promoMsg.value = '10% discount applied!'
  promoOk.value = true
  if (promoBtnRef.value) {
    gsap.fromTo(promoBtnRef.value, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' })
  }
}

const checkout = () => {
  const btn = checkoutBtnRef.value
  if (btn) {
    btn.style.transform = 'scale(0.97)'
    setTimeout(() => {
      btn.style.transform = 'scale(1)'
      setTimeout(() => router.push('/order-confirmed'), 100)
    }, 100)
  } else {
    router.push('/order-confirmed')
  }
}

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'profile') router.push('/settings')
}
</script>

<style scoped>
.cart-page    { --background: #f5edd8; background: #f5edd8; }
.cart-toolbar { --background: transparent; --border-width: 0; }
.cart-title   { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px; color: #000; }
.back-btn     { color: #000; }
.clear-label  { font-family: 'Archivo', sans-serif; font-size: 13px; font-weight: 600; color: #E8501A; }
.cart-content { --background: transparent; }

.empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; height: 65vh; gap: 14px;
  padding: 24px; text-align: center;
}
.empty-icon  { font-size: 72px; }
.empty-title { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: clamp(20px, 5vw, 26px); color: #000; margin: 0; }
.empty-sub   { font-family: 'Archivo', sans-serif; font-size: 14px; color: rgba(0,0,0,0.5); margin: 0; }

.cart-body { padding: 8px 16px 120px; }

.cart-item {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.65); border-radius: 18px;
  padding: 12px; margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  overflow: hidden; height: auto;
}
.item-img-wrap {
  width: clamp(60px, 18vw, 76px); height: clamp(60px, 18vw, 76px);
  border-radius: 12px; overflow: hidden; flex-shrink: 0; background: #f5edd8;
}
.item-img   { width: 100%; height: 100%; object-fit: cover; }
.item-info  { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.item-name  {
  font-family: 'Archivo', sans-serif; font-weight: 700;
  font-size: clamp(13px, 3.5vw, 15px); color: #000;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.item-meta  { font-family: 'Archivo', sans-serif; font-size: 11px; color: rgba(0,0,0,0.4); }
.item-price { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: clamp(13px, 3.5vw, 15px); color: #E8501A; }

.item-qty-wrap { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.qty-btn {
  width: 28px; height: 28px; border: none; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.qty-btn.minus { background: #ede8df; color: #333; }
.qty-btn.plus  { background: #E8501A; color: white; }
.qty-val {
  font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 15px;
  min-width: 20px; text-align: center; display: inline-block;
}

.promo-row { display: flex; gap: 10px; margin: 16px 0 4px; }
.promo-input {
  flex: 1; min-width: 0;
  background: rgba(255,255,255,0.7); border: 1.5px solid rgba(0,0,0,0.1);
  border-radius: 14px; padding: 12px 16px;
  font-family: 'Archivo', sans-serif; font-size: 14px;
  outline: none; color: #000;
}
.promo-input::placeholder { color: rgba(0,0,0,0.35); }
.promo-btn {
  background: #E8501A; color: white; border: none;
  border-radius: 14px; padding: 12px 20px;
  font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px;
  cursor: pointer; flex-shrink: 0;
}
.promo-msg         { font-family: 'Archivo', sans-serif; font-size: 12px; color: #E8501A; margin: 0 4px 12px; font-weight: 600; }
.promo-msg.success { color: #00aa5b; }

.summary-card {
  background: rgba(255,255,255,0.7); border-radius: 20px;
  padding: 18px 20px; margin: 16px 0 20px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.07);
}
.summary-row     { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
.s-label         { font-family: 'Archivo', sans-serif; font-size: 14px; color: rgba(0,0,0,0.5); }
.s-val           { font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 14px; color: #000; }
.s-label.bold    { font-weight: 700; font-size: 16px; color: #000; }
.s-val.bold      { font-weight: 800; font-size: 18px; }
.s-label.green,
.s-val.green     { color: #00aa5b; }
.s-val.red       { color: #E8501A; }
.summary-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 4px 0; }

.btn-primary {
  background: #E8501A; color: white; border: none; border-radius: 18px;
  width: 100%; padding: 16px;
  font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(14px, 4vw, 17px);
  cursor: pointer; box-shadow: 0 6px 20px rgba(232,80,26,0.35); transition: transform 0.1s;
}
.btn-primary:active { transform: scale(0.98); }

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