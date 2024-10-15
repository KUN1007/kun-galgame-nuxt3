<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()

const localePath = useLocalePath()

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
  navigateTo(localePath(`/edit/galgame?type=pr&gid=${galgame.gid}`))
}
</script>

<template>
  <span class="rewrite" @click="handleRewriteGalgame(galgame)">
    <Icon class="icon" name="lucide:pencil" />
  </span>
</template>

<style lang="scss" scoped>
.rewrite {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
  display: flex;

  .icon {
    font-size: 24px;
  }
}
</style>
