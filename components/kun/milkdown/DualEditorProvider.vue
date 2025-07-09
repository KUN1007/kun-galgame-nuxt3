<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
import { activeTab } from './atom'

defineProps<{
  valueMarkdown: string
  language?: Language
}>()

const emits = defineEmits<{
  setMarkdown: [value: string]
}>()

const cmAPI = ref({
  update: (_: string) => {}
})

const saveMarkdown = (markdown: string) => {
  cmAPI.value.update(markdown)
  emits('setMarkdown', markdown)
}

const setCmAPI = (api: { update: (markdown: string) => void }) => {
  cmAPI.value = api
}
</script>

<template>
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <div class="space-y-3">
        <KunMilkdownEditor
          :value-markdown="valueMarkdown"
          @save-markdown="saveMarkdown"
          :language="language ?? 'zh-cn'"
        >
          <template #footer>
            <slot />
          </template>
        </KunMilkdownEditor>

        <template v-if="activeTab === 'code'">
          <KunMilkdownCodemirror
            :markdown="valueMarkdown"
            @set-cm-api="setCmAPI"
            @on-change="(value) => emits('setMarkdown', value)"
          />
        </template>
      </div>
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
