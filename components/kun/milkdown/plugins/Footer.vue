<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue'

const route = useRoute()

const {
  textCount: textCountEditRewrite,
  isTopicRewriting,
  autosaveCount
} = storeToRefs(useTempEditStore())
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
  <div class="flex items-center justify-between text-sm">
    <div class="flex items-center gap-3">
      <NuxtLink
        to="/topic/280"
        class="text-default-700 hover:text-primary transition-colors"
      >
        话题发布规定
      </NuxtLink>

      <span class="text-default-500">
        {{ `自动保存 × ${autosaveCount}` }}
      </span>
    </div>

    <span> {{ `${size} 字` }} </span>
  </div>
</template>
