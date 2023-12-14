<script setup lang="ts">
import { hamburgerItem } from './hamburgerItem'

defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="root" @click="$emit('close')">
    <Transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      appear
    >
      <div class="container" @click.stop>
        <div class="kungalgame">
          <img src="/favicon.webp" alt="KUNGalgame" />
          <span>{{ $t('header.name') }}</span>
        </div>

        <div class="item" style="font-size: 17px">
          <span v-for="kun in hamburgerItem" :key="kun.index">
            <NuxtLink :to="kun.router">
              {{ $t(`header.hamburger.${kun.name}`) }}
            </NuxtLink>
          </span>
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
  color: var(--kungalgame-font-color-3);
  font-size: 25px;
  background-color: var(--kungalgame-mask-color-0);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.container {
  height: 100vh;
  position: absolute;
  width: 247px;
  padding: 10px;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
  border-left: none;
  border-top: none;
  border-radius: 0 5px 5px 5px;
}

.item {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  margin-top: 50px;

  a {
    padding: 5px 10px;
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
