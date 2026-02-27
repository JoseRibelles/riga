<template>
  <button class="google" type="button" @click="onClick">
    <span class="gicon" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="20" height="20">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.06 1.53 7.45 2.81l5.1-5.1C33.64 4.2 29.2 2 24 2 14.6 2 6.5 7.38 2.7 15.2l6.3 4.9C11.1 13.1 17 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.14-2.8-.44-4.1H24v7.8h12.7c-.26 2-1.66 5-4.76 7l7.3 5.7c4.3-4 6.86-9.9 6.86-16.4z"/>
        <path fill="#FBBC05" d="M9 28.1c-.5-1.5-.8-3.1-.8-4.6s.3-3.1.8-4.6l-6.3-4.9C1.1 17.2 0 20.5 0 23.5s1.1 6.3 2.7 9.1L9 28.1z"/>
        <path fill="#34A853" d="M24 46c6.2 0 11.4-2 15.2-5.5l-7.3-5.7c-2 1.4-4.7 2.4-7.9 2.4-7 0-12.9-3.6-15-10.6l-6.3 4.9C6.5 40.6 14.6 46 24 46z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
    </span>
    <span class="gtext">Continue with Google</span>
  </button>
</template>

<script setup lang="ts">
function onClick() {
  console.log("Google login click");
}
</script>

<style scoped>
.google {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.65);
  font-weight: 900;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.gicon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gtext {
  line-height: 1;
}

.google:active {
  filter: brightness(0.95);
}
</style>