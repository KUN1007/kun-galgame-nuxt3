<script setup lang="ts">
import { GALGAME_RESOURCE_PLATFORM_ICON_MAP } from '~/constants/galgameResource'
import { KUN_GALGAME_RESOURCE_PLATFORM_MAP } from '~/constants/galgame'
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false">
    <KunHeader
      name="游戏信息"
      description="Galgame 的标签, 引擎 等必要信息"
      scale="h3"
    />

    <KunNull description="TODO:" />
  </KunCard>
</template>
