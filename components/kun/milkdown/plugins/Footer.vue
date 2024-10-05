<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue'

const { textCount: textCountEditRewrite, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { textCount: textCountEdit } = storeToRefs(usePersistEditTopicStore())
const { textCount: textCountReplyRewrite, isReplyRewriting } =
  storeToRefs(useTempReplyStore())
const { textCount: textCountReply } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const { view } = usePluginViewContext()

const route = useRoute()

const size = computed(() => {
  return view.value.state.doc.textContent.length
})

watch(
  () => size.value,
  () => {
    if (route.path.startsWith('/edit') && isTopicRewriting.value) {
      textCountEditRewrite.value = size.value
      return
    }
    if (route.path.startsWith('/topic') && isReplyRewriting.value) {
      textCountReplyRewrite.value = size.value
      return
    }
    if (route.path.startsWith('/edit')) {
      textCountEdit.value = size.value
    }
    if (route.path.startsWith('/topic')) {
      textCountReply.value = size.value
    }
  }
)

onMounted(() => {
  if (route.path.startsWith('/edit') && isTopicRewriting.value) {
    textCountEditRewrite.value = size.value
    return
  }
  if (route.path.startsWith('/topic') && isReplyRewriting.value) {
    textCountReplyRewrite.value = size.value
  }
})
</script>

<template>
  <div class="footer">
    <KunMilkdownComponentsSettings />
    <span class="size"> {{ size + ` ${$t('edit.topic.word')}` }} </span>
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
