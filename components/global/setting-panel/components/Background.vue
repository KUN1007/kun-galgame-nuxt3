<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CustomBackground from './CustomBackground.vue'
import BackgroundImageSkeleton from '@/components/skeleton/settings-panel/BackgroundImageSkeleton.vue'

import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

import { backgroundImages } from './background'
import { getBackgroundURL } from '@/hooks/useBackgroundPicture'
import { restoreBackground } from '@/hooks/useBackgroundPicture'

const imageArray = ref<string[]>([])
const { showKUNGalgameBackground } = storeToRefs(useKUNGalgameSettingsStore())

const getBackground = async (imageNumber: number) => {
  return await getBackgroundURL(`bg${imageNumber}-m`)
}

const handleChangeImage = (index: number) => {
  showKUNGalgameBackground.value = `bg${index}`
}

onMounted(async () => {
  for (const background of backgroundImages) {
    const backgroundURL = await getBackground(background.index)
    imageArray.value.push(backgroundURL)
  }
})
</script>

<template>
  <div class="kungalgame-background">
    <div class="bg-settings">
      {{ $tm('header.settings.background') }}
    </div>
    <ul class="kungalgame-background-container">
      <li>
        <span>{{ $tm('header.settings.preset') }}</span>
        <ul class="kungalgame-restore-bg">
          <li
            v-for="kun in backgroundImages"
            :key="kun.index"
            v-tooltip="{ message: kun.message, position: 'bottom' }"
          >
            <img
              v-if="kun"
              :src="imageArray[kun.index - 1]"
              @click="handleChangeImage(kun.index)"
            />

            <BackgroundImageSkeleton v-if="!imageArray[kun.index - 1]" />
          </li>
        </ul>
      </li>

      <li>
        <CustomBackground />

        <button class="restore-bg" @click="restoreBackground">
          {{ $tm('header.settings.restore') }}
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
  list-style: none;
  text-decoration: none;
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
  border: 1px solid var(--kungalgame-blue-4);
  background-color: var(--kungalgame-trans-white-9);
  transition: all 0.2s;
  color: var(--kungalgame-blue-4);

  &:hover {
    color: var(--kungalgame-white);
    background-color: var(--kungalgame-blue-4);
  }
}
</style>
