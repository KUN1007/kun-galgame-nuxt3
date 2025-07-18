<script setup lang="ts">
import { KUN_GALGAME_OFFICIAL_LANGUAGE_MAP } from '~/constants/galgameOfficial'
import type { GalgameEngineItem } from '~/types/api/galgame-engine'
import type { GalgameOfficialItem } from '~/types/api/galgame-official'

defineProps<{
  official: GalgameOfficialItem[]
  engine: GalgameEngineItem[]
  originalLanguage: string
  ageLimit: 'all' | 'r18'
}>()

const getOfficialCategoryInfo = (category: string) => {
  switch (category) {
    case 'company':
      return {
        text: '公司',
        class: 'bg-primary-100 text-primary-800'
      }
    case 'individual':
      return {
        text: '个人',
        class: 'bg-success-100 text-success-800'
      }
    case 'amateur':
      return {
        text: '同人',
        class: 'bg-secondary-100 text-secondary-800'
      }
    default:
      return {
        text: category,
        class: 'bg-default-100 text-default-800'
      }
  }
}

const getLanguageName = (langCode: string) => {
  // TODO:
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
      <div v-if="official && official.length > 0">
        <dt class="text-default-500 text-sm font-medium">制作方</dt>
        <dd class="mt-1.5 space-y-3">
          <div class="space-y-2" v-for="item in official" :key="item.id">
            <KunTooltip :text="`该会社制作了 ${item.galgameCount} 个 Galgame`">
              <KunLink
                :to="`/galgame-official/${item.id}`"
                underline="none"
                class-name="text-foreground hover:text-primary text-base font-semibold"
              >
                {{ item.name }}
                <KunBadge size="xs">
                  {{ `+ ${item.galgameCount}` }}
                </KunBadge>
              </KunLink>
            </KunTooltip>

            <div class="mt-1 flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <span
                  class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                  :class="getOfficialCategoryInfo(item.category).class"
                >
                  {{ getOfficialCategoryInfo(item.category).text }}
                </span>
                <span class="text-default-500 dark:text-default-400 text-xs">
                  {{
                    KUN_GALGAME_OFFICIAL_LANGUAGE_MAP[item.lang] || item.lang
                  }}
                </span>
              </div>

              <KunLink
                :is-show-anchor-icon="true"
                target="_blank"
                :to="item.link"
                size="sm"
                underline="hover"
                rel="noopener noreferrer"
              >
                官方网站
              </KunLink>
            </div>

            <div
              v-if="item.alias.length"
              class="text-default-500 flex flex-wrap gap-2"
            >
              <KunBadge
                size="xs"
                color="success"
                v-for="(a, index) in item.alias"
                :key="index"
              >
                {{ a }}
              </KunBadge>
            </div>
          </div>
        </dd>
      </div>

      <div
        v-if="engine && engine.length > 0"
        class="border-default-200 dark:border-default-700/50 border-t pt-5"
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
        <span class="text-default-500 text-sm font-medium">游戏原语言</span>
        <KunBadge color="warning">
          {{ getLanguageName(originalLanguage) }}
        </KunBadge>
      </div>

      <div class="flex items-center justify-between">
        <span
          class="text-default-500 dark:text-default-400 text-sm font-medium"
        >
          年龄限制
        </span>
        <KunBadge
          variant="flat"
          :color="ageLimit === 'all' ? 'success' : 'danger'"
        >
          {{ ageLimit === 'all' ? '全年龄' : 'R18' }}
        </KunBadge>
      </div>
    </dl>
  </KunCard>
</template>
