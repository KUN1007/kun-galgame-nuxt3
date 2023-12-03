<!-- Common Toggle Button for KUNGalgame -->

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useKUNGalgameEditStore } from '@/store/modules/edit'
import { usePersistKUNGalgameReplyStore } from '@/store/modules/topic/reply'
import { storeToRefs } from 'pinia'

// Current page's route
const route = useRoute()
// Name of the current page's route
const routeName = computed(() => route.name as string)

// Use the store for the editing page
const { isShowHotKeywords: isShowEditHotKeywords } = storeToRefs(
  useKUNGalgameEditStore()
)
// Store for the topic page, used for replies
const { isShowHotKeywords: isShowReplyHotKeywords, replyDraft } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

// Watch for changes in store states to keep button states in sync with the store
watch(
  () => [isShowEditHotKeywords.value, isShowReplyHotKeywords.value],
  ([newValue1, newValue2]) => {
    isShowEditHotKeywords.value = newValue1
    isShowReplyHotKeywords.value = newValue2
  }
)
</script>

<template>
  <!-- Bind different models based on the route name -->
  <input
    v-if="routeName === 'Edit'"
    type="checkbox"
    id="switch"
    v-model="isShowEditHotKeywords"
  />

  <input
    v-if="routeName === 'Topic'"
    type="checkbox"
    id="switch"
    v-model="isShowReplyHotKeywords"
  />
  <label for="switch"></label>
</template>

<style lang="scss" scoped>
input {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 47px;
  height: 24px;
  background: var(--kungalgame-trans-blue-2);
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: var(--kungalgame-white);
  border-radius: 15px;
  transition: 0.3s;
}

input:checked + label {
  background: var(--kungalgame-blue-4);
}

input:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

// Centering
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
