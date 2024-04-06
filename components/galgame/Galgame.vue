<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  gid: number
  galgame: GalgameDetail
}>()
</script>

<template>
  <div>
    <h1>{{ galgame.name['en-us'] }}</h1>
    <NuxtImg :src="galgame.banner" />
  </div>
</template>

<style lang="scss" scoped></style>
