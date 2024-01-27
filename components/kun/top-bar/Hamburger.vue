<script setup lang="ts">
import 'animate.css'
import { hamburgerItem } from './hamburgerItem'

const { showKUNGalgameHamburger } = storeToRefs(useTempSettingStore())

const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const item = computed(() => hamburgerItem)

const handleTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX
  startY.value = event.touches[0].clientY
  currentX.value = 0
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  const touchX = event.touches[0].clientX
  const touchY = event.touches[0].clientY
  const deltaX = touchX - startX.value
  const deltaY = touchY - startY.value

  if (deltaY < deltaX) {
    return
  }

  if (deltaX < 0) {
    requestAnimationFrame(() => {
      currentX.value = deltaX
    })
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
  const movedX = currentX.value
  if (Math.abs(movedX) > 30) {
    showKUNGalgameHamburger.value = false
  }
  currentX.value = 0
}
</script>

<template>
  <Transition :duration="550" name="slide">
    <div
      v-if="showKUNGalgameHamburger"
      class="mask"
      @click="showKUNGalgameHamburger = false"
    >
      <div
        class="container"
        @click.stop
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="kungalgame" @click="navigateTo('/')">
          <NuxtImg src="/favicon.webp" :alt="$t('head.title')" />
          <span>{{ $t('header.name') }}</span>
        </div>

        <div class="item-container">
          <p v-for="kun in item" :key="kun.index" class="item">
            <span class="icon-item">
              <Icon :name="kun.icon"></Icon>
            </span>
            <NuxtLink :to="kun.router">
              {{ $t(`header.hamburger.${kun.name}`) }}
            </NuxtLink>
          </p>
        </div>

        <KunSettingPanelComponentsMode style="font-size: 15px" />

        <KunSettingPanelComponentsSwitchLanguage style="font-size: 15px" />

        <KunSettingPanelComponentsCustomBackground :is-mobile="true" />

        <div class="home">
          <NuxtLink to="/">{{ $t('header.hamburger.home') }}</NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.mask {
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
  transition: opacity 0.3s;
  z-index: 1;
}

.container {
  position: absolute;
  width: 250px;
  padding: 10px;
  background-color: var(--kungalgame-trans-white-2);
  border-right: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
  border-radius: 0 5px 5px 0;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-leave-active {
  transition-delay: 0.25s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .container,
.slide-leave-active .container {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from .container,
.slide-leave-to .container {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
