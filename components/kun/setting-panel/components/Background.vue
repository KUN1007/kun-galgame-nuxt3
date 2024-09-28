<script setup lang="ts">
import { ref, computed } from 'vue'
import { backgroundImages } from './backgroundImage'

const { locale } = useI18n()

const itemsPerPage = 15
const totalPages = Math.ceil(backgroundImages.length / itemsPerPage)
const currentPage = ref(1)

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return backgroundImages.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const restoreBackground = async () => {
  await usePersistSettingsStore().setSystemBackground(0)
}

const handleChangeImage = async (index: number) => {
  await usePersistSettingsStore().setSystemBackground(index)
}
</script>

<template>
  <div class="background">
    <div class="bg-settings">
      {{ $t('header.settings.background') }}
    </div>

    <ul class="container">
      <li class="options">
        <div>
          <span class="prev" @click="prevPage">
            <Icon class="icon" name="lucide:chevron-left" />
          </span>
        </div>
        <div>
          <span class="next" @click="nextPage">
            <Icon class="icon" name="lucide:chevron-right" />
          </span>
        </div>
        <div>
          <span @click="restoreBackground">
            {{ $t('header.settings.restore') }}
          </span>
        </div>
        <KunSettingPanelComponentsCustomBackground />
      </li>

      <li>
        <ul class="kungalgame-restore-bg">
          <li
            v-for="kun in paginatedImages"
            :key="kun.index"
            v-tooltip="{
              message: kun.message[locale as Language],
              position: 'bottom'
            }"
          >
            <NuxtImg
              v-if="kun"
              :src="`bg/bg${kun.index}-m.webp`"
              @click="handleChangeImage(kun.index)"
              loading="lazy"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  display: block;
  height: 100%;
  font-size: 15px;
  font-weight: normal;
  color: var(--kungalgame-font-color-3);

  .options {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;

    span {
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 10px;
      box-shadow: var(--shadow);
      color: var(--kungalgame-font-color-3);
      transition: all 0.2s;

      @include kun-center;

      &:hover {
        color: var(--kungalgame-blue-5);
        background-color: var(--kungalgame-trans-blue-0);
      }
    }
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
  grid-template-rows: repeat(5, 50px);
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
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.7);
        z-index: 7;
      }
    }

    .image-detail {
      position: absolute;
    }
  }
}
</style>
