<template>
  <ion-page class="chat-page">
    <ion-header class="ion-no-border">
      <ion-toolbar class="chat-toolbar">
        <ion-buttons slot="start">
          <ion-button fill="clear" class="back-btn" @click="router.replace('/track-order')">
            <ion-icon :icon="arrowBackOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="chat-title">Chat</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="more-btn">
            <ion-icon :icon="ellipsisHorizontal" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="contact-bar animate__animated animate__fadeInDown">
      <img
        src="https://www.figma.com/api/mcp/asset/9d50b6a8-bdb0-4e90-93d6-2d796fd436f2"
        class="contact-avatar"
        alt="Pablo"
      />
      <div class="contact-info">
        <span class="contact-name">Pablo</span>
        <span class="contact-phone">(+44) 50 9285 3022</span>
      </div>
      <div class="contact-actions">
        <button class="contact-action-btn" @click="startVideo">
          <ion-icon :icon="videocamOutline" />
        </button>
        <button class="contact-action-btn" @click="callContact">
          <ion-icon :icon="callOutline" />
        </button>
      </div>
    </div>

    <ion-content class="chat-content" ref="chatContent">
      <div class="messages-wrap" ref="messagesWrap">

        <div
          v-for="(msg, idx) in messages"
          :key="msg.id"
          class="msg-row"
          :class="msg.sent ? 'sent' : 'received'"
          :ref="el => { if (el) msgRefs[idx] = el as HTMLElement }"
        >
          <img
            v-if="!msg.sent"
            src="https://www.figma.com/api/mcp/asset/9d50b6a8-bdb0-4e90-93d6-2d796fd436f2"
            class="msg-avatar"
            alt="Pablo"
          />

          <div class="bubble-wrap">
            <div class="bubble" :class="msg.sent ? 'bubble-sent' : 'bubble-received'">
              <p class="bubble-text">{{ msg.text }}</p>
              <div class="bubble-meta">
                <span class="bubble-time">{{ msg.time }}</span>
                <ion-icon v-if="msg.sent" :icon="checkmarkDoneOutline" class="read-tick" :class="{ read: msg.read }" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="isTyping" class="msg-row received typing-row">
          <img
            src="https://www.figma.com/api/mcp/asset/9d50b6a8-bdb0-4e90-93d6-2d796fd436f2"
            class="msg-avatar" alt="Pablo"
          />
          <div class="bubble bubble-received typing-bubble">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>

        <div ref="bottomAnchor" style="height:8px;"></div>
      </div>
    </ion-content>

    <div class="input-bar" ref="inputBar">
      <input
        v-model="newMessage"
        class="msg-input"
        placeholder="Type a message ..."
        @keyup.enter="sendMessage"
        ref="msgInput"
      />
      <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim()">
        <ion-icon :icon="sendOutline" />
      </button>
    </div>

    <div class="bottom-nav">
      <div class="nav-item" :class="{ active: activeTab === 'menu' }" @click="navigateTo('menu')">
        <ion-icon :icon="homeOutline" /><span>Menu</span>
      </div>
      <div class="nav-item" @click="navigateTo('gifts')">
        <ion-icon :icon="giftOutline" /><span>Create</span>
      </div>
      <div class="nav-item center-item" @click="navigateTo('center')">
        <div class="center-btn"><ion-icon :icon="sendNavOutline" /></div>
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
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue'
import {
  arrowBackOutline, homeOutline, giftOutline, sendOutline as sendNavOutline,
  cartOutline, personOutline, ellipsisHorizontal,
  videocamOutline, callOutline, checkmarkDoneOutline,
} from 'ionicons/icons'

import { sendOutline } from 'ionicons/icons'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const activeTab = ref('wallet')
const newMessage = ref('')
const isTyping   = ref(false)
const chatContent = ref<any>(null)
const messagesWrap = ref<HTMLElement | null>(null)
const bottomAnchor = ref<HTMLElement | null>(null)
const msgInput     = ref<HTMLInputElement | null>(null)
const msgRefs      = ref<HTMLElement[]>([])
let msgIdCounter   = 100

const messages = ref([
  { id: 1,  sent: true,  text: 'Hi!',                                                time: '10:10', read: true  },
  { id: 2,  sent: true,  text: "How much longer will my order take? I've been waiting longer than expected...", time: '10:11', read: true  },
  { id: 3,  sent: false, text: "I'm on my way!! There's been a problem with the order", time: '10:11', read: false },
  { id: 4,  sent: false, text: 'Sorry',                                               time: '10:11', read: false },
  { id: 5,  sent: true,  text: 'Great!',                                              time: '10:12', read: true  },
])

const scrollToBottom = async (smooth = true) => {
  await nextTick()
  bottomAnchor.value?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
}

const animateNewBubble = (el: HTMLElement) => {
  gsap.fromTo(el,
    { opacity: 0, y: 16, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'back.out(1.5)' }
  )
}

const sendMessage = async () => {
  const text = newMessage.value.trim()
  if (!text) return

  const id = ++msgIdCounter
  messages.value.push({ id, sent: true, text, time: nowTime(), read: false })
  newMessage.value = ''

  await nextTick()
  const idx = messages.value.length - 1
  if (msgRefs.value[idx]) animateNewBubble(msgRefs.value[idx])
  scrollToBottom()


  isTyping.value = true
  scrollToBottom()

  setTimeout(async () => {
    isTyping.value = false
    const responses = [
      "Almost there! 5 more minutes 🛵",
      "Sorry for the wait, traffic is heavy",
      "Your pizza is still hot, don't worry!",
      "I can see your building now!",
    ]
    const reply = responses[Math.floor(Math.random() * responses.length)]
    const rid = ++msgIdCounter
    messages.value.push({ id: rid, sent: false, text: reply, time: nowTime(), read: false })

    await nextTick()
    const ridx = messages.value.length - 1
    if (msgRefs.value[ridx]) animateNewBubble(msgRefs.value[ridx])
    scrollToBottom()
  }, 1800)
}

const nowTime = () => {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

const startVideo = () => gsap.fromTo('.contact-action-btn:first-child', { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
const callContact = () => gsap.fromTo('.contact-action-btn:last-child', { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })

const navigateTo = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu')    router.replace('/menu')
  if (tab === 'wallet')  router.push('/cart')
  if (tab === 'profile') router.push('/settings')
  if (tab === 'gifts') router.push('/create')
}

onMounted(() => {
  scrollToBottom(false)
  gsap.fromTo('.contact-bar', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
  gsap.fromTo('.msg-row', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.3, delay: 0.2 })
})
</script>

<style scoped>
.chat-page { --background: #f5edd8; background: #f5edd8; }
.chat-toolbar { --background: #f5edd8; --border-width: 0; }
.chat-title { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px; color: #000; }
.back-btn, .more-btn { color: #000; }

.contact-bar {
  background: #f5edd8; padding: 10px 20px 14px;
  display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.contact-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; }
.contact-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.contact-name  { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 15px; color: #000; }
.contact-phone { font-family: 'Archivo', sans-serif; font-size: 12px; color: rgba(0,0,0,0.45); }
.contact-actions { display: flex; gap: 8px; }
.contact-action-btn {
  width: 38px; height: 38px; border-radius: 50%; border: none;
  background: rgba(255,255,255,0.7); display: flex; align-items: center;
  justify-content: center; font-size: 18px; cursor: pointer; color: #444;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chat-content { --background: #f0ebe0; }

.messages-wrap { padding: 16px 14px 8px; display: flex; flex-direction: column; gap: 6px; }

.msg-row {
  display: flex; align-items: flex-end; gap: 8px;
  max-width: 100%;
}
.msg-row.sent     { flex-direction: row-reverse; }
.msg-row.received { flex-direction: row; }

.msg-avatar {
  width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
}
.msg-row.sent .msg-avatar { display: none; }

.bubble-wrap { max-width: 72%; }

.bubble {
  padding: 10px 14px; border-radius: 18px;
  word-break: break-word;
}
.bubble-sent {
  background: #2563eb; color: white;
  border-bottom-right-radius: 4px;
}
.bubble-received {
  background: white; color: #000;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.bubble-text {
  font-family: 'Archivo', sans-serif; font-size: 14px;
  line-height: 1.5; margin: 0; white-space: pre-wrap;
}
.bubble-meta {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 4px; margin-top: 4px;
}
.bubble-time {
  font-size: 10px; opacity: 0.55;
  font-family: 'Archivo', sans-serif;
}
.read-tick { font-size: 13px; opacity: 0.5; }
.read-tick.read { opacity: 1; color: #93c5fd; }

.typing-bubble {
  display: flex; align-items: center; gap: 5px;
  padding: 12px 16px; min-width: 60px;
}
.dot {
  width: 7px; height: 7px; background: #999; border-radius: 50%;
  animation: bounce 1s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.18s; }
.dot:nth-child(3) { animation-delay: 0.36s; }
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

.input-bar {
  background: #f5edd8;
  padding: 10px 16px;
  display: flex; align-items: center; gap: 10px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.msg-input {
  flex: 1; min-width: 0;
  background: rgba(255,255,255,0.75); border: 1.5px solid rgba(0,0,0,0.08);
  border-radius: 24px; padding: 12px 18px;
  font-family: 'Archivo', sans-serif; font-size: 14px;
  color: #000; outline: none;
}
.msg-input::placeholder { color: rgba(0,0,0,0.35); }
.send-btn {
  width: 44px; height: 44px; border-radius: 50%; border: none;
  background: #E8501A; color: white; display: flex;
  align-items: center; justify-content: center;
  font-size: 18px; cursor: pointer; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(232,80,26,0.4);
  transition: transform 0.1s, opacity 0.1s;
}
.send-btn:disabled { opacity: 0.4; cursor: default; }
.send-btn:not(:disabled):active { transform: scale(0.93); }

.bottom-nav { position: absolute; bottom: 0; left: 0; right: 0; height: 64px; background: white; border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: space-around; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; flex: 1; height: 100%; cursor: pointer; color: #5e5f60; font-family: 'Figtree', sans-serif; font-size: 11px; -webkit-tap-highlight-color: transparent; user-select: none; }
.nav-item ion-icon { font-size: 22px; }
.nav-item.active { color: #00aa5b; }
.center-item { flex: 1; }
.center-btn { width: 52px; height: 52px; background: #00aa5b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,170,91,0.3); margin: 0 auto; }
.center-btn ion-icon { color: white; font-size: 22px; }
</style>