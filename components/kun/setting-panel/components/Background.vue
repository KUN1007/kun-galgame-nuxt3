<script setup lang="ts">
import { backgroundImages } from './backgroundImage'

const restoreBackground = async () => {
  await usePersistSettingsStore().setSystemBackground(0)
}

const handleChangeImage = async (index: number) => {
  await usePersistSettingsStore().setSystemBackground(index)
}
</script>

<template>
  <div class="kungalgame-background">
    <div class="bg-settings">
      {{ $t('header.settings.background') }}
    </div>

    <ul class="kungalgame-background-container">
      <span>{{ $t('header.settings.preset') }}</span>
      <li>
        <ul class="kungalgame-restore-bg">
          <li
            v-for="kun in backgroundImages"
            :key="kun.index"
            v-tooltip="{ message: kun.message, position: 'bottom' }"
          >
            <NuxtImg
              v-if="kun"
              :src="`bg/bg${kun.index}-m.webp`"
              @click="handleChangeImage(kun.index)"
            />
          </li>
        </ul>
      </li>

      <li>
        <KunSettingPanelComponentsCustomBackground />

        <button class="restore-bg" @click="restoreBackground">
          {{ $t('header.settings.restore') }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-background-container {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  display: block;
  height: 100%;
  font-size: 15px;
  font-weight: normal;
  color: var(--kungalgame-font-color-3);

  span {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.bg-settings {
  margin: 10px 0;
}

.kungalgame-restore-bg {
  margin: 0;
  padding: 0;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 50px);
  position: relative;
  margin-bottom: 10px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      cursor: pointer;
      width: 70px;
      position: relative;

      &:hover {
        transform: scale(3);
        transition: 0.2s;
        z-index: 7;
      }
    }

    .image-detail {
      position: absolute;
    }
  }
}

.restore-bg {
  font-size: 15px;
  cursor: pointer;
  height: 30px;
  width: 100%;
  margin-top: 10px;
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-blue-5);
  background-color: transparent;
  color: var(--kungalgame-blue-5);

  &:hover {
    color: var(--kungalgame-white);
    background-color: var(--kungalgame-blue-5);
  }
}
</style>
