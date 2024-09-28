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

const routeName = useRouteName()

const size = computed(() => {
  return view.value.state.doc.textContent.length
})

watch(
  () => size.value,
  () => {
    if (routeName.value === 'edit-topic' && isTopicRewriting.value) {
      textCountEditRewrite.value = size.value
      return
    }
    if (routeName.value === 'topic-tid' && isReplyRewriting.value) {
      textCountReplyRewrite.value = size.value
      return
    }
    if (routeName.value === 'edit-topic') {
      textCountEdit.value = size.value
    }
    if (routeName.value === 'topic-tid') {
      textCountReply.value = size.value
    }
  }
)

onMounted(() => {
  if (routeName.value === 'edit-topic' && isTopicRewriting.value) {
    textCountEditRewrite.value = size.value
    return
  }
  if (routeName.value === 'topic-tid' && isReplyRewriting.value) {
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
