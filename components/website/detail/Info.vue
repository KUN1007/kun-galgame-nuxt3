<script setup lang="ts">
import {
  KUN_WEBSITE_LANGUAGE_MAP,
  KUN_WEBSITE_ACG_LIMIT_MAP
} from '~/constants/galgameWebsite'

import type { WebsiteDetail } from '~/types/api/website'

defineProps<{
  data: WebsiteDetail
}>()
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    class-name="p-6"
  >
    <h3 class="text-default-900 mb-4 text-lg font-semibold">网站信息</h3>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-default-500 text-sm">分类</span>
        <KunLink
          :to="`/website-category/${data.category.name}`"
          underline="none"
        >
          <KunBadge class-name="cursor-pointer" color="primary">
            {{ data.category.label }}
          </KunBadge>
        </KunLink>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-default-500 text-sm">语言</span>
        <KunBadge color="secondary">
          {{ KUN_WEBSITE_LANGUAGE_MAP[data.language] }}
        </KunBadge>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-default-500 text-sm">年龄限制</span>
        <KunBadge
          :variant="data.ageLimit === 'all' ? 'flat' : 'solid'"
          :color="data.ageLimit === 'all' ? 'success' : 'danger'"
        >
          {{ KUN_WEBSITE_ACG_LIMIT_MAP[data.ageLimit] }}
        </KunBadge>
      </div>

      <div>
        <span class="text-default-500 text-sm">域名列表</span>
        <div
          v-for="(dom, index) in data.domain"
          :key="index"
          class="mt-1 space-x-1"
        >
          <KunLink :to="dom" class-name="font-mono">
            {{ dom }}
          </KunLink>
          <KunButton
            :is-icon-only="true"
            variant="light"
            @click="useKunCopy(dom)"
          >
            <KunIcon name="lucide:copy" />
          </KunButton>
        </div>
      </div>
    </div>
  </KunCard>
</template>
