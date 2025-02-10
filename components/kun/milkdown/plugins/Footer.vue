<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue'

const route = useRoute()

const { textCount: textCountEditRewrite, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { textCount: textCountEdit } = storeToRefs(usePersistEditTopicStore())
const { textCount: textCountReplyRewrite, isReplyRewriting } =
  storeToRefs(useTempReplyStore())
const { textCount: textCountReply } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const { view } = usePluginViewContext()

const size = computed(() => {
  return view.value.state.doc.textContent.length
})

watch(
  () => size.value,
  () => {
    if (route.name === 'edit-topic' && isTopicRewriting.value) {
      textCountEditRewrite.value = size.value
      return
    }
    if (route.name === 'topic-tid' && isReplyRewriting.value) {
      textCountReplyRewrite.value = size.value
      return
    }
    if (route.name === 'edit-topic') {
      textCountEdit.value = size.value
    }
    if (route.name === 'topic-tid') {
      textCountReply.value = size.value
    }
  }
)

onMounted(() => {
  if (route.name === 'edit-topic' && isTopicRewriting.value) {
    textCountEditRewrite.value = size.value
    return
  }
  if (route.name === 'topic-tid' && isReplyRewriting.value) {
    textCountReplyRewrite.value = size.value
  }
})
</script>

<template>
  <div class="footer">
    <KunMilkdownComponentsSettings />
    <span class="size"> {{ `${size} 字` }} </span>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 10px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.size {
  font-size: 15px;
  color: var(--kungalgame-font-color-0);
}
</style>
