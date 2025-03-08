<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

const props = defineProps<{
  content: string
}>()

const content = computed(() => props.content)
</script>

<template>
  <div class="kungalgame-topic-content">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownReadOnly :is-readonly="true" :value-markdown="content" />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-topic-content {
  width: 100%;
  font-size: 15px;
  padding: 17px;
  color: var(--kungalgame-font-color-3);
  border: none !important;
  padding: 0 10px;
  overflow-x: auto;
}

@media (max-width: 700px) {
  .kungalgame-topic-content {
    margin-top: 0;
    padding: 0 7px;
  }
}
</style>
