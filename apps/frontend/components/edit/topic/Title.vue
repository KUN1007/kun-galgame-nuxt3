<script setup lang="ts">
const { title: rewriteTitle, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { title: editTitle } = storeToRefs(usePersistEditTopicStore())

const topicTitle = ref('')
const maxInputLength = 40

if (isTopicRewriting.value) {
  topicTitle.value = rewriteTitle.value
} else {
  topicTitle.value = editTitle.value
}

const handleInput = debounce(() => {
  if (topicTitle.value.length > maxInputLength) {
    topicTitle.value = topicTitle.value.slice(0, maxInputLength)
  }

  if (topicTitle.value.trim() === '') {
    rewriteTitle.value = ''
    editTitle.value = ''
    return
  }

  if (isTopicRewriting.value) {
    rewriteTitle.value = topicTitle.value
  } else {
    editTitle.value = topicTitle.value
  }
}, 1007)
</script>

<template>
  <KunInput
    type="text"
    placeholder="文章标题"
    v-model="topicTitle"
    @input="handleInput"
    :maxlength="maxInputLength"
    size="xl"
  />
</template>
