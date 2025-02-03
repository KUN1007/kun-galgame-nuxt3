<script setup lang="ts">
import 'animate.css'
import { hamburgerItem } from './hamburgerItem'
import type { Hamburger } from './hamburgerItem'

const { showKUNGalgameHamburger } = storeToRefs(useTempSettingStore())
const { showKUNGalgameBackLoli } = storeToRefs(usePersistSettingsStore())

const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const item = ref<Hamburger[]>(hamburgerItem.slice(0, 10))
const isShowSettings = computed(() => item.value.length > 10)

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
  if (item.value.length === 10) {
    item.value = hamburgerItem
  } else {
    item.value = hamburgerItem.slice(0, 10)
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
        <div>
          <div class="kungalgame" @click="navigateTo('/')">
            <NuxtImg src="/favicon.webp" :alt="kungal.titleShort" />
            <span>{{ kungal.titleShort }}</span>
          </div>

          <div class="item-container">
            <div v-for="(kun, index) in item" :key="index" class="item">
              <span class="icon-item">
                <Icon class="icon" :name="kun.icon" />
              </span>
              <NuxtLink
                :to="kun.router"
                :target="isValidURL(kun.router) ? '_blank' : ''"
              >
                {{ kun.label }}
              </NuxtLink>
              <span class="hint" v-if="kun.hint">
                {{ kun.hint }}
              </span>
            </div>
          </div>

          <KunSettingPanelComponentsMode v-if="isShowSettings" />

          <KunSettingPanelComponentsCustomBackground
            v-if="isShowSettings"
            :is-mobile="true"
          />

          <KunSettingPanelComponentsTransparency
            v-if="isShowSettings"
            style="margin-top: 17px"
          />

          <KunSettingPanelComponentsBlur
            v-if="isShowSettings"
            style="margin-top: 17px"
          />

          <KunSettingPanelComponentsFont
            v-if="isShowSettings"
            style="margin-top: 17px"
          />

          <KunSettingPanelComponentsReset v-if="isShowSettings" />

          <div class="loli" v-if="isShowSettings">
            <span>展示萌萌的琥珀</span>
            <KunSwitch v-model="showKUNGalgameBackLoli" />
          </div>

          <span class="more" @click="handleShowMore">
            <span>设置</span>
            <span :class="isShowSettings ? 'active' : ''">
              <Icon class="icon" name="lucide:chevron-down" />
            </span>
          </span>
        </div>

        <div class="links">
          <a
            aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
            :href="kungal.github"
            target="_blank"
          >
            <span><Icon class="icon" name="lucide:github" /></span>
            <span>GitHub</span>
          </a>

          <NuxtLink to="/rss">
            <span><Icon class="icon" name="lucide:rss" /></span>
            <span>RSS</span>
          </NuxtLink>

          <a
            aria-label="KUN Visual Novel Official Telegram Group"
            :href="kungal.domain.telegram_group"
            target="_blank"
          >
            <span><Icon class="icon" name="ph:telegram-logo" /></span>
            <span>Telegram</span>
          </a>
        </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include kun-blur;
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
    color: var(--kungalgame-font-color-3);
  }

  .hint {
    color: var(--kungalgame-red-5);
    margin-left: 17px;
    font-size: small;
  }
}

.loli {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.simple-mode {
  margin-top: 20px;
}

.more {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  span {
    display: flex;

    &:first-child {
      font-size: small;
      margin-right: 7px;
      color: var(--kungalgame-font-color-1);
    }
  }
}

.links {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  margin: 17px 0;

  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);

    & > span {
      &:first-child {
        cursor: pointer;
      }

      &:last-child {
        font-size: x-small;
      }
    }
  }
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
