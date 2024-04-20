<script setup lang="ts">
import { platformIconMap } from '../utils/iconMap'
import type { GalgameCard } from '~/types/api/galgame'

const { locale } = useI18n()

defineProps<{
  galgames: GalgameCard[]
}>()
</script>

<template>
  <div class="grid-card">
    <NuxtLinkLocale
      class="card"
      v-for="(galgame, index) in galgames"
      :key="index"
      :to="`/galgame/${galgame.gid}`"
    >
      <div class="banner">
        <NuxtImg
          placeholder
          :src="galgame.banner.replace(/\.webp$/, '-mini.webp')"
        />
        <div class="platform">
          <span v-for="(platform, i) in galgame.platform" :key="i">
            <Icon :name="platformIconMap[platform]" />
          </span>
        </div>
        <div class="mask">
          <div class="data">
            <span>
              <Icon name="lucide:mouse-pointer-click" />
              <span>{{ galgame.views }}</span>
            </span>

            <span>
              <Icon name="lucide:thumbs-up" />
              <span>{{ galgame.likes }}</span>
            </span>
          </div>

          <div class="language">
            <span v-for="(lang, i) in galgame.language" :key="i">
              {{ lang.substring(0, 2).toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <div class="title">
        {{ getPreferredLanguageText(galgame.name, locale as Language) }}
      </div>

      <div class="publisher">
        <KunAvatar :user="galgame.user" size="30px" />
        <span class="name">{{ galgame.user.name }}</span>
        <span class="time">
          {{ formatTimeDifference(galgame.time, locale) }}
        </span>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.grid-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);
}

.banner {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    transition: transform 0.5s;
  }

  .platform {
    position: absolute;
    top: 0;
    z-index: 1;
    color: var(--kungalgame-font-color-0);
    margin-left: 5px;
  }

  .mask {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    background: linear-gradient(transparent, var(--kungalgame-font-color-3));
    color: var(--kungalgame-white);
    padding: 0 7px;
    padding-bottom: 3px;
    display: flex;
    justify-content: space-between;

    .data {
      display: flex;

      & > span {
        display: flex;
        align-items: center;
        margin-right: 7px;

        .icon {
          margin-right: 3px;
        }
      }
    }

    .language {
      & > span {
        &::after {
          content: '|';
          margin: 0 3px;
        }

        &:last-child {
          &::after {
            content: '';
            margin: 0;
          }
        }
      }
    }
  }
}

.card:hover .banner {
  img {
    transform: scale(1.07);
  }
}

.title {
  color: var(--kungalgame-blue-5);
  font-weight: bold;
  margin: 7px 0;
}

.publisher {
  display: flex;
  align-items: center;

  .name {
    margin: 0 7px;
  }

  .time {
    color: var(--kungalgame-font-color-0);
    font-size: small;
  }
}
</style>
