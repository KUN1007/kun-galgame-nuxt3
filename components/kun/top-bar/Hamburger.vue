<script setup lang="ts">
import 'animate.css'
import { hamburgerItem } from './hamburgerItem'
import type { Hamburger } from './hamburgerItem'

const localePath = useLocalePath()

const { showKUNGalgameHamburger } = storeToRefs(useTempSettingStore())

const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const item = ref<Hamburger[]>(hamburgerItem.slice(0, 8))
const isShowSettings = computed(() => item.value.length > 8)

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

const handleShowMore = () => {
  if (item.value.length === 8) {
    item.value = hamburgerItem
  } else {
    item.value = hamburgerItem.slice(0, 8)
  }
}
</script>

<template>
  <Transition :duration="550" name="slide">
    <div
      v-if="showKUNGalgameHamburger"
      class="mask"
      @click.stop
      @click="showKUNGalgameHamburger = false"
    >
      <div
        class="container"
        @click.stop
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="kungalgame" @click="navigateTo(localePath('/'))">
          <NuxtImg src="/favicon.webp" :alt="$t('head.title')" />
          <span>{{ $t('header.name') }}</span>
        </div>

        <div class="item-container">
          <div v-for="(kun, index) in item" :key="index" class="item">
            <span class="icon-item">
              <Icon :name="kun.icon"></Icon>
            </span>
            <NuxtLinkLocale :to="kun.router">
              {{ $t(`header.hamburger.${kun.name}`) }}
            </NuxtLinkLocale>
            <span class="new" v-if="kun.isNew">
              {{ $t('header.hamburger.new') }}
            </span>
          </div>
        </div>

        <KunSettingPanelComponentsMode v-if="isShowSettings" />

        <KunSettingPanelComponentsSwitchLanguage v-if="isShowSettings" />

        <KunSettingPanelComponentsCustomBackground
          v-if="isShowSettings"
          :is-mobile="true"
        />

        <KunSettingPanelComponentsTransparency
          v-if="isShowSettings"
          style="margin-top: 17px"
        />

        <KunSettingPanelComponentsFont
          v-if="isShowSettings"
          style="margin-top: 17px"
        />

        <KunSettingPanelComponentsReset v-if="isShowSettings" />

        <span class="more" :class="isShowSettings ? 'active' : ''">
          <Icon @click="handleShowMore" name="lucide:chevron-down"></Icon>
        </span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.mask {
  height: 100dvh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-mask-color-0);
  transition: opacity 0.3s;
  z-index: 1;
  overflow: hidden;
}

.container {
  height: 100%;
  position: absolute;
  width: 250px;
  overflow-y: scroll;
  padding: 10px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--kungalgame-blue-2);
  box-shadow: var(--shadow);
  border-radius: 0 5px 5px 0;
}

.item-container {
  border-top: 1px solid var(--kungalgame-trans-blue-4);
  border-bottom: 1px solid var(--kungalgame-trans-blue-4);
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
    color: var(--kungalgame-blue-5);
    margin-right: 10px;
  }

  a {
    color: var(--kungalgame-blue-5);
  }

  .new {
    color: var(--kungalgame-red-5);
    margin-left: 17px;
    font-size: small;
  }
}

.more {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.active {
  transform: rotate(180deg);
  transition: transform 0.2s;
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
