<script setup lang="ts">
import { hamburgerItem } from './hamburgerItem'

const emits = defineEmits<{
  close: []
}>()

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

const handleTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX
  currentX.value = 0
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  const touchX = event.touches[0].clientX
  const deltaX = touchX - startX.value

  if (deltaX < 0) {
    currentX.value = deltaX
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
  const movedX = currentX.value
  if (Math.abs(movedX) > 100) {
    emits('close')
  }
  currentX.value = 0 // 重置位置
}

const handleClickTitle = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="root" @click="$emit('close')">
    <Transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      appear
    >
      <div
        class="container"
        @click.stop
        :class="{ 'is-dragging': isDragging }"
        :style="{ transform: `translateX(${currentX}px)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="kungalgame" @click="handleClickTitle">
          <NuxtImg src="/favicon.webp" :alt="$t('head.title')" />
          <span>{{ $t('header.name') }}</span>
        </div>

        <div class="item-container">
          <div v-for="kun in hamburgerItem" :key="kun.index" class="item">
            <span class="icon-item">
              <Icon :name="kun.icon"></Icon>
            </span>
            <NuxtLink :to="kun.router">
              {{ $t(`header.hamburger.${kun.name}`) }}
            </NuxtLink>
          </div>
        </div>

        <KunSettingPanelComponentsMode style="font-size: 15px" />

        <KunSettingPanelComponentsSwitchLanguage style="font-size: 15px" />

        <KunSettingPanelComponentsCustomBackground :is-mobile="true" />

        <div class="home">
          <NuxtLink to="/">{{ $t('header.hamburger.home') }}</NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-mask-color-0);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.container {
  transition: transform 0.3s;
  position: absolute;
  width: 247px;
  padding: 10px;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
  border-left: none;
  border-top: none;
  border-radius: 0 5px 5px 5px;
  min-height: 100vh;
}

.item-container {
  border-top: 1px solid var(--kungalgame-trans-blue-4);
  border-bottom: 1px solid var(--kungalgame-trans-blue-4);
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 17px;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px 0;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    padding-bottom: 20px;
  }

  .icon-item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--kungalgame-blue-4);
    margin-right: 10px;
  }

  a {
    color: var(--kungalgame-blue-4);
  }
}

.kungalgame {
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  span {
    font-size: 20px;
  }
}

.home {
  width: 100%;
  margin-top: 20px;

  a {
    padding: 3px 7px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    font-size: 17px;
    border: 1px solid var(--kungalgame-blue-4);
    color: var(--kungalgame-blue-4);
  }
}
</style>
