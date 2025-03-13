<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'

defineProps<{
  valueMarkdown: string
}>()

const emits = defineEmits<{
  setMarkdown: [value: string]
}>()

const cmAPI = ref({
  update: (_: string) => {}
})

const activeTab = ref('preview')

const tabs = [
  { textValue: '预览', value: 'preview' },
  { textValue: '代码', value: 'code' }
]

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
        <KunTab
          v-model="activeTab"
          :items="tabs"
          variant="underlined"
          color="primary"
        />

        <template v-if="activeTab === 'preview'">
          <KunMilkdownEditor
            :value-markdown="valueMarkdown"
            @save-markdown="saveMarkdown"
          />
        </template>

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
