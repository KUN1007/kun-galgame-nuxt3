<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const handleRewriteGalgame = (galgame: GalgameDetail) => {
  const { gid, name, markdown, series, alias, official, engine, tags } = galgame
  galgamePR.value[0] = {
    gid,
    name,
    introduction: markdown,
    series: series.map((s) => s.toString()),
    alias,
    official,
    engine,
    tags
  }
  navigateTo('/edit/galgame/rewrite')
}
</script>

<template>
  <KunTooltip text="重新编辑">
    <KunButton
      :is-icon-only="true"
      variant="light"
      color="default"
      size="lg"
      @click="handleRewriteGalgame(galgame)"
    >
      <Icon name="lucide:pencil" />
    </KunButton>
  </KunTooltip>
</template>
