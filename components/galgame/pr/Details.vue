<script setup lang="ts">
import DOMPurify from 'dompurify'
import { diffGalgame } from './compare'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  details: Partial<GalgamePRDetails>
}>()
const galgame = inject<GalgameDetail>('galgame')

const diff = computed(() => {
  if (!galgame || !props.details.galgame) {
    return ''
  }
  return DOMPurify.sanitize(diffGalgame(galgame, props.details.galgame))
})
</script>

<template>
  <div class="details">
    <div class="diff">
      <div v-html="diff"></div>
    </div>

    <div class="btn">
      <KunButton type="danger">拒绝合并</KunButton>
      <KunButton>合并请求</KunButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diff {
  :deep(h2) {
    margin-bottom: 10px;
  }

  :deep(strong) {
    color: var(--kungalgame-red-5);
    background-color: var(--kungalgame-trans-pink-1);
  }

  :deep(b) {
    color: var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-1);
  }
}

.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 17px;
  margin-left: auto;

  .kun-button {
    margin-right: 17px;
  }
}
</style>
