<script setup lang="ts">
import { platformIconMap } from './utils/iconMap'
import { KUN_GALGAME_RESOURCE_PLATFORM_MAP } from '~/constants/galgame'
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <div class="flex flex-col space-y-3">
    <div>
      <h4>标签</h4>
      <GalgameNull v-if="!galgame.tags.length" />
      <div class="space-y-1 space-x-1">
        <KunBadge
          v-for="(tag, index) in galgame.tags"
          :key="index"
          color="primary"
        >
          {{ tag }}
        </KunBadge>
      </div>
    </div>

    <div>
      <h4>别名</h4>
      <GalgameNull v-if="!galgame.alias.length" />
      <div class="space-y-1 space-x-1">
        <KunBadge
          v-for="(alias, index) in galgame.alias"
          :key="index"
          color="secondary"
        >
          {{ alias }}
        </KunBadge>
      </div>
    </div>

    <div>
      <h4>官网</h4>
      <GalgameNull v-if="!galgame.official.length" />
      <template v-if="galgame.official.length">
        <KunLink
          v-for="(kun, index) in galgame.official"
          :key="index"
          :to="kun"
          :is-show-anchor-icon="true"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ kun }}
        </KunLink>
      </template>
    </div>

    <div>
      <h4>平台</h4>
      <GalgameNull v-if="!galgame.platform.length" />
      <div class="space-y-1 space-x-1">
        <KunBadge
          v-for="(platform, index) in galgame.platform"
          :key="index"
          color="success"
        >
          <KunIcon class="icon" :name="platformIconMap[platform]" />
          {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform] }}
        </KunBadge>
      </div>
    </div>

    <div>
      <h4>引擎</h4>
      <GalgameNull v-if="!galgame.engine.length" />
      <div class="space-y-1 space-x-1">
        <KunBadge
          color="warning"
          v-for="(engine, index) in galgame.engine"
          :key="index"
        >
          {{ engine }}
        </KunBadge>
      </div>
    </div>
  </div>
</template>
