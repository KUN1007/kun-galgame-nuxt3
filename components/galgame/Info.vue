<script setup lang="ts">
import { platformIconMap } from './utils/iconMap'
import { KUN_GALGAME_RESOURCE_PLATFORM_MAP } from '~/constants/galgame'
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <KunHeader :size="2">
    <template #header>信息</template>
  </KunHeader>

  <div class="name">
    <h4>标题</h4>
    <KunCopy v-if="galgame.name['en-us']" :text="galgame.name['en-us']" />
    <KunCopy v-if="galgame.name['ja-jp']" :text="galgame.name['ja-jp']" />
    <KunCopy v-if="galgame.name['zh-cn']" :text="galgame.name['zh-cn']" />
    <KunCopy v-if="galgame.name['zh-tw']" :text="galgame.name['zh-tw']" />
  </div>

  <div>
    <h4>标签</h4>
    <GalgameNull v-if="!galgame.tags.length" />
    <TopicTags :tags="galgame.tags" :is-show-icon="false" />
  </div>

  <div>
    <h4>别名</h4>
    <GalgameNull v-if="!galgame.alias.length" />
    <TopicTags :tags="galgame.alias" :is-show-icon="false" />
  </div>

  <div class="official">
    <h4>官网</h4>
    <GalgameNull v-if="!galgame.official.length" />
    <template v-if="galgame.official.length">
      <span class="link" v-for="(kun, index) in galgame.official" :key="index">
        <KunCopy :text="kun" />
        <a :href="kun" target="_blank" rel="noopener noreferrer">
          <Icon class="icon" name="lucide:external-link" />
        </a>
      </span>
    </template>
  </div>

  <div class="platform">
    <h4>平台</h4>
    <span
      v-for="(platform, index) in galgame.platform"
      :key="index"
      v-tooltip="{
        message: KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform],
        position: 'bottom'
      }"
    >
      <Icon class="icon" :name="platformIconMap[platform]" />
    </span>
  </div>

  <div class="engine" v-if="galgame.engine.length">
    <h4>引擎</h4>
    <span v-for="(engine, index) in galgame.engine" :key="index">
      {{ engine }}
    </span>
  </div>

  <div class="index">
    <h4>序号</h4>
    <span>{{ galgame.gid }}</span>
  </div>
</template>

<style lang="scss" scoped>
div {
  margin-bottom: 17px;
}

h4 {
  margin-right: 17px;
}

.name {
  .kun-copy {
    font-size: large;
  }
}

.official {
  .link {
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 17px;
    display: inline-block;

    & > a {
      margin-left: 10px;
      font-size: 20px;
      color: var(--kungalgame-font-color-0);

      &:hover {
        color: var(--kungalgame-blue-5);
      }
    }
  }
}

.platform {
  display: flex;

  span {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: var(--kungalgame-font-color-2);
    margin-right: 10px;
  }
}

.engine {
  display: flex;

  span {
    display: flex;
    align-items: center;
    color: var(--kungalgame-font-color-2);
    margin-right: 10px;
  }
}

.index {
  display: flex;
}
</style>
