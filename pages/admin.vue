<script setup lang="ts">
import {
  KUN_ADMIN_PAGE_ASIDE_NAV_ITEM,
  type KUN_ADMIN_PAGE_ROUTE_TYPE
} from '~/constants/admin'

useKunSeoMeta({
  title: '管理系统',
  description: '世界上最强大美观的 Galgame 网站管理系统, 专为 Galgame 网站定制'
})

const route = useRoute()
const pageType = computed(() => {
  const routeType = route.fullPath.split('/').pop()
  return routeType as KUN_ADMIN_PAGE_ROUTE_TYPE
})
</script>

<template>
  <div class="flex gap-3">
    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      :is-pressable="false"
      class-name="w-48 shrink-0 hidden sm:flex"
    >
      <div class="flex flex-col gap-1">
        <KunButton
          v-for="item in KUN_ADMIN_PAGE_ASIDE_NAV_ITEM"
          :key="item.name"
          size="lg"
          full-width
          :variant="item.router === pageType ? 'flat' : 'light'"
          :class-name="cn(item.router === pageType ? '' : 'text-default-900')"
          :href="`/admin/${item.router}`"
        >
          <KunIcon v-if="item.icon" :name="item.icon" />
          {{ item.label }}
        </KunButton>
      </div>
    </KunCard>

    <NuxtPage />
  </div>
</template>
