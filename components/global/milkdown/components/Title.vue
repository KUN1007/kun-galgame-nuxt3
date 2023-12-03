<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import { useTempEditStore } from '@/store/temp/edit'
import { useKUNGalgameEditStore } from '@/store/modules/edit'
import { storeToRefs } from 'pinia'

import { debounce } from '@/utils/debounce'

const { title: rewriteTitle, isTopicRewriting } = storeToRefs(
  useTempEditStore()
)
const { isSaveTopic, title: editTitle } = storeToRefs(useKUNGalgameEditStore())

// Topic title text
const topicTitle = ref('')
// Maximum length for the title
const maxInputLength = 40

onBeforeMount(() => {
  /**
   * Editor is in edit mode
   */
  if (isSaveTopic.value) {
    topicTitle.value = editTitle.value
  }
  /**
   * Editor is in re-editing edit mode
   */
  // Load data for re-editing a topic before mounting
  if (isTopicRewriting.value) {
    topicTitle.value = rewriteTitle.value
  }
})

// Handle user input
const handleInput = () => {
  // Title cannot exceed 40 characters
  if (topicTitle.value.length > maxInputLength) {
    topicTitle.value = topicTitle.value.slice(0, maxInputLength)
  }

  if (topicTitle.value.trim() === '') {
    rewriteTitle.value = ''
    editTitle.value = ''
    return
  }

  // Create a debounce handling function
  const debouncedInput = debounce(() => {
    /**
     * Editor is in reply mode
     */
    // Save to the edit store if not in topic re-edit mode
    if (!isTopicRewriting.value) {
      editTitle.value = topicTitle.value
    }
    /**
     * Editor is in re-editing edit mode
     */
    // Save to the re-editing page's store if in re-edit mode
    if (isTopicRewriting.value) {
      rewriteTitle.value = topicTitle.value
    }
  }, 300)

  debouncedInput()
}
</script>

<template>
  <!-- Topic title -->
  <div class="title">
    <input
      type="text"
      :placeholder="`${$tm('edit.title')}`"
      v-model="topicTitle"
      @input="handleInput"
      :maxlength="maxInputLength"
    />
  </div>
</template>

<style lang="scss" scoped>
/* Title of the topic */
.title {
  padding: 10px;
  width: 100%;
}

/* Input field for the topic title */
.title input {
  background-color: var(--kungalgame-white-9);
  color: var(--kungalgame-font-color-2);
  /* Distance from the outline */
  padding: 7px;
  width: 100%;
  /* Font size for the title input */
  font-size: 40px;
  border: none;
}
</style>
