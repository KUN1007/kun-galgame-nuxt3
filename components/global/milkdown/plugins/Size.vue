<!-- Custom plugins, calculate text size -->

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Settings from '../components/Settings.vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'

import { useTempEditStore } from '@/store/temp/edit'
import { useKUNGalgameEditStore } from '@/store/modules/edit'
import { useTempReplyStore } from '@/store/temp/topic/reply'
import { usePersistKUNGalgameReplyStore } from '@/store/modules/topic/reply'
import { storeToRefs } from 'pinia'

const { textCount: textCountEditRewrite, isTopicRewriting } = storeToRefs(
  useTempEditStore()
)
const { textCount: textCountEdit } = storeToRefs(useKUNGalgameEditStore())
const { textCount: textCountReplyRewrite, isReplyRewriting } = storeToRefs(
  useTempReplyStore()
)
const { textCount: textCountReply } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const { view } = usePluginViewContext()

const route = useRoute()
const routeName = computed(() => route.name as string)

const size = computed(() => {
  return view.value.state.doc.textContent.length
})

watch(
  () => size.value,
  () => {
    if (routeName.value === 'Edit' && isTopicRewriting.value) {
      textCountEditRewrite.value = size.value
      return
    }
    if (routeName.value === 'Topic' && isReplyRewriting.value) {
      textCountReplyRewrite.value = size.value
      return
    }
    if (routeName.value === 'Edit') {
      textCountEdit.value = size.value
    }
    if (routeName.value === 'Topic') {
      textCountReply.value = size.value
    }
  }
)

onMounted(() => {
  if (routeName.value === 'Edit' && isTopicRewriting.value) {
    textCountEditRewrite.value = size.value
    return
  }
  if (routeName.value === 'Topic' && isReplyRewriting.value) {
    textCountReplyRewrite.value = size.value
  }
})
</script>

<template>
  <div class="footer">
    <Settings />
    <span> {{ size + ` ${$tm('edit.word')}` }} </span>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 10px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
