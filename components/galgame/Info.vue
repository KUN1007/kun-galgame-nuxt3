<script setup lang="ts">
import { KUN_GALGAME_AGE_LIMIT_MAP } from '~/constants/galgame'
import type { GalgameEngineItem } from '~/types/api/galgame-engine'
import type { GalgameOfficialItem } from '~/types/api/galgame-official'

defineProps<{
  official: GalgameOfficialItem[]
  engine: GalgameEngineItem[]
  originalLanguage: string
  ageLimit: 'all' | 'r18'
}>()

const getLanguageName = (langCode: string) => {
  // TODO: support more language names
  const map: Record<string, string> = {
    'ja-jp': '日本語',
    'en-us': 'English',
    'zh-cn': '简体中文',
    'zh-tw': '繁体中文'
  }
  return map[langCode.toLowerCase()] || langCode
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    class-name="overflow-visible"
    content-class="space-y-3"
  >
    <dl class="space-y-5">
      <GalgameDetailOfficial :official="official" />

      <div
        v-if="engine && engine.length > 0"
        class="border-default-200 dark:border-default-700/50"
      >
        <dt class="text-default-500 dark:text-default-400 text-sm font-medium">
          游戏引擎
        </dt>
        <dd
          class="text-default-900 mt-1.5 text-base font-medium dark:text-white"
        >
          <KunTooltip
            v-for="item in engine"
            :key="item.id"
            :text="`${item.galgameCount} 个 Galgame 使用此引擎制作`"
          >
            <KunLink
              :to="`/galgame-engine/${item.id}`"
              underline="none"
              class-name="text-foreground hover:text-primary text-base font-semibold"
            >
              {{ item.name }}
              <KunBadge size="xs">
                {{ `+ ${item.galgameCount}` }}
              </KunBadge>
            </KunLink>
          </KunTooltip>
        </dd>
      </div>

      <div class="flex items-center justify-between">
        <dt class="text-default-500 text-sm font-medium">游戏原语言</dt>
        <dd>
          <KunBadge color="warning">
            {{ getLanguageName(originalLanguage) }}
          </KunBadge>
        </dd>
      </div>

      <div class="flex items-center justify-between">
        <dt class="text-default-500 dark:text-default-400 text-sm font-medium">
          年龄限制
        </dt>
        <dd>
          <KunTooltip
            position="left"
            :text="KUN_GALGAME_AGE_LIMIT_MAP[ageLimit]"
          >
            <KunBadge
              variant="flat"
              :color="ageLimit === 'all' ? 'success' : 'danger'"
            >
              {{ ageLimit === 'all' ? '全年龄' : 'R18' }}
            </KunBadge>
          </KunTooltip>
        </dd>
      </div>
    </dl>
  </KunCard>
</template>
