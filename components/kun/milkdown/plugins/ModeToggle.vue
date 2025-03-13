<script setup lang="ts">
const { mode: topicMode } = storeToRefs(usePersistEditTopicStore())
const { mode: replyMode } = storeToRefs(usePersistKUNGalgameReplyStore())

const modeItems = [
  {
    textValue: '预览',
    value: 'preview'
  },
  {
    textValue: '代码',
    value: 'code'
  }
]

const activeTab = computed(() =>
  useRoute().name === 'edit-topic' ? topicMode.value : replyMode.value
)
</script>

<template>
  <KunTab
    :items="modeItems"
    v-model="activeTab"
    variant="underlined"
    color="primary"
  />
</template>
