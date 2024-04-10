<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <h2>游戏信息</h2>
  <div class="name">
    <h3>游戏名</h3>
    <KunCopy :text="galgame.name['en-us']" />
    <KunCopy :text="galgame.name['ja-jp']" />
    <KunCopy :text="galgame.name['zh-cn']" />
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
</style>
