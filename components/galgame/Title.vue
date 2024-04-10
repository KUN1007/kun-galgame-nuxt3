<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const { locale } = useI18n()

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <h1>{{ getPreferredLanguageText(galgame.name, locale as Language) }}</h1>
  <div class="banner">
    <NuxtImg :src="galgame.banner" />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 17px;
}

.banner {
  width: 100%;
  display: flex;

  img {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
