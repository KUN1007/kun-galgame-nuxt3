<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const handleRewriteGalgame = async (galgame: GalgameDetail) => {
  const { introduction, markdown, series, ...rest } = galgame
  galgamePR.value[0] = {
    introduction: markdown,
    ...rest
  }
  await navigateTo('/edit/galgame/rewrite')
}
</script>

<template>
  <KunTooltip text="编辑">
    <KunButton
      :is-icon-only="true"
      variant="light"
      color="default"
      size="lg"
      @click="handleRewriteGalgame(galgame)"
    >
      <KunIcon name="lucide:pencil" />
    </KunButton>
  </KunTooltip>
</template>
