<script setup lang="ts">
import { platformIconMap } from './utils/iconMap'
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <h2>游戏信息</h2>
  <div class="name">
    <h3>游戏名</h3>
    <KunCopy v-if="galgame.name['en-us']" :text="galgame.name['en-us']" />
    <KunCopy v-if="galgame.name['ja-jp']" :text="galgame.name['ja-jp']" />
    <KunCopy v-if="galgame.name['zh-cn']" :text="galgame.name['zh-cn']" />
  </div>

  <div class="alias">
    <h3>别名</h3>
    <GalgameNull v-if="!galgame.alias.length" />
    <TopicTags :tags="galgame.alias" :is-show-icon="false" />
  </div>

  <div class="official">
    <h3>官网</h3>
    <GalgameNull v-if="!galgame.official" />
    <a
      v-if="galgame.official"
      :href="galgame.official"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ galgame.official }}
    </a>
  </div>

  <div class="platform">
    <h3>平台</h3>
    <span
      v-for="(platform, index) in galgame.platform"
      :key="index"
      v-tooltip="{
        message: $t(`edit.galgame.platform.${platform}`),
        position: 'bottom'
      }"
    >
      <Icon :name="platformIconMap[platform]" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

h3 {
  margin-bottom: 7px;
}

.name {
  margin-bottom: 17px;

  .kun-copy {
    font-size: large;
  }
}

.alias {
  margin-bottom: 17px;
}

.official {
  margin-bottom: 17px;
}

.platform {
  display: flex;
  margin-bottom: 17px;

  h3 {
    margin-right: 17px;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: var(--kungalgame-font-color-2);
    margin-right: 10px;
  }
}
</style>
