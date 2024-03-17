<script setup lang="ts">
const { category: rewriteCategory, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { category: editCategory } = storeToRefs(useKUNGalgameEditStore())
const { clearTopic } = storeToRefs(useTempEditStore())
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
div {
}
</style>
