<template>
  <div class="header">
    <button v-if="showBack" class="back" type="button" @click="onBack" aria-label="Go back">
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M15.5 19.5L8 12l7.5-7.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="slot">
      <slot />
    </div>

    <div v-if="showBack" class="spacer" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    showBack?: boolean;
    backTo?: string;
  }>(),
  { showBack: true }
);

const router = useRouter();

function onBack() {
  if (props.backTo) router.replace(props.backTo);
  else router.back();
}
</script>

<style scoped>
.header {
  padding-top: calc(env(safe-area-inset-top) + 10px);
  padding-left: 16px;
  padding-right: 16px;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
}

.back {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.back:active {
  transform: scale(0.98);
}

.icon {
  width: 22px;
  height: 22px;
  color: rgba(0, 0, 0, 0.75);
}

.slot {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
}

.spacer {
  width: 44px;
  height: 44px;
}
</style>