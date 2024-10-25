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
      v-for="galgame in galgames"
      :key="galgame.gid"
      :to="`/galgame/${galgame.gid}`"
    >
      <div class="banner">
        <NuxtImg
          :src="galgame.banner.replace(/\.webp$/, '-mini.webp')"
          loading="lazy"
          :alt="getPreferredLanguageText(galgame.name, locale as Language)"
          placeholder="/placeholder.webp"
        />
        <div class="platform">
          <template v-if="galgame.platform.length">
            <span v-for="(platform, i) in galgame.platform" :key="i">
              <Icon class="icon" :name="platformIconMap[platform]" />
            </span>
          </template>
          <span v-if="!galgame.platform.length" class="preparing">
            {{ $t('galgame.preparing') }}
          </span>
        </div>
        <div class="overlay">
          <div class="data">
            <span class="stat">
              <Icon class="icon" name="lucide:mouse-pointer-click" />
              <span>{{ galgame.views }}</span>
            </span>

            <span class="stat">
              <Icon class="icon" name="lucide:thumbs-up" />
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

      <div class="card-content">
        <h3 class="title">
          {{ getPreferredLanguageText(galgame.name, locale as Language) }}
        </h3>

        <div class="publisher">
          <KunAvatar :user="galgame.user" size="30px" />
          <span class="name">{{ galgame.user.name }}</span>
          <span class="time">
            {{ formatTimeDifference(galgame.time, locale) }}
          </span>
        </div>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.grid-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  @include kun-blur;
}

.banner {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    transition: transform 0.5s ease;
  }

  .platform {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
    color: var(--kungalgame-font-color-0);
    background-color: var(--kungalgame-trans-white-5);
    border-radius: 10px;
    padding: 5px 7px;
    @include kun-center;

    span {
      display: flex;
      margin-right: 3px;

      &:last-child {
        margin-right: 0;
      }
    }

    .preparing {
      color: var(--kungalgame-pink-4);
      font-weight: bold;
      font-size: small;
    }
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 8px;
    background: linear-gradient(transparent, var(--kungalgame-mask-color-0));
    color: var(--kungalgame-white-solid);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: small;

    .data {
      display: flex;
      gap: 8px;

      .stat {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }

    .language {
      display: flex;
      gap: 8px;

      span {
        padding: 2px 4px;
        background: var(rgba(255, 255, 255, 0.2));
        border-radius: 4px;
      }
    }
  }
}

.card:hover .banner img {
  transform: scale(1.1);
}

.card-content {
  padding: 7px;
}

.title {
  color: var(--kungalgame-blue-5);
  font-weight: bold;
  margin: 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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

@media (max-width: 700px) {
  .grid-card {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    gap: 7px;
  }
}
</style>
