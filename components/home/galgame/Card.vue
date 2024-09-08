<script setup lang="ts">
import { platformIconMap } from '~/components/galgame/utils/iconMap'
import type { HomeGalgame } from '~/types/api/home'

const { locale } = useI18n()

const galgame = defineProps<HomeGalgame>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://image.kungal.com/avatar/user_552/avatar-100.webp'
}
</script>

<template>
  <NuxtLinkLocale
    class="galgame"
    :to="`/galgame/${galgame.gid}`"
    v-kun-gradient
  >
    <div class="title">
      <span>
        {{ getPreferredLanguageText(galgame.name, locale as Language) }}
      </span>
      <span class="time">
        {{ formatTimeDifferenceHint(galgame.time, locale) }}
      </span>
    </div>

    <div class="info">
      <div class="contributors">
        <img
          height="30"
          width="30"
          v-for="(uid, index) in galgame.contributors"
          :key="index"
          :src="`https://image.kungal.com/avatar/user_${uid}/avatar-100.webp`"
          @error="handleImageError"
          alt="Moe loli galgamer"
          loading="lazy"
        />

        <span class="views">
          <span><Icon name="lucide:mouse-pointer-click" /></span>
          <span>{{ views }}</span>
        </span>
      </div>

      <div class="status">
        <div class="platform">
          <span v-for="(platform, i) in galgame.platforms" :key="i">
            <Icon :name="platformIconMap[platform]" />
          </span>
        </div>

        <div class="language">
          <span v-for="(lang, i) in galgame.languages" :key="i">
            {{ lang.substring(0, 2).toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.galgame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  padding: 10px;
  padding-bottom: 0;
  border-radius: 10px;
}

.title {
  width: 100%;
  font-size: 18px;
  margin-bottom: 7px;

  .time {
    color: var(--kungalgame-font-color-0);
    font-size: small;
    font-weight: initial;
    margin-left: 17px;
    white-space: nowrap;
  }
}

.info {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: small;

  .contributors {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      display: inline-block;
    }

    .views {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      user-select: none;

      span {
        display: flex;
        margin-right: 3px;
      }
    }
  }
}

.section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .username {
    color: var(--kungalgame-font-color-0);
    font-size: 15px;

    &::after {
      content: '|';
      color: var(--kungalgame-gray-4);
      margin-left: 10px;
    }
  }
}

.status {
  display: flex;
  align-items: center;

  .icon {
    font-size: 16px;
    color: var(--kungalgame-font-color-2);
  }

  .platform {
    margin-left: 5px;
  }

  .language {
    margin-left: 17px;

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
</style>
