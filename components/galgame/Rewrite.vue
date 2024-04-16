<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()

const localePath = useLocalePath()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const handleRewriteGalgame = (galgame: GalgameDetail) => {
  const { gid, name, introduction, alias, official } = galgame
  galgamePR.value[0] = {
    gid,
    name,
    introduction,
    alias,
    official
  }
  navigateTo(localePath(`/edit/galgame?type=pr&gid=${galgame.gid}`))
}
</script>

<template>
  <span class="rewrite" @click="handleRewriteGalgame(galgame)">
    <Icon name="lucide:pencil" />
  </span>
</template>

<style lang="scss" scoped>
.rewrite {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;

  .icon {
    font-size: 24px;
  }
}
</style>
