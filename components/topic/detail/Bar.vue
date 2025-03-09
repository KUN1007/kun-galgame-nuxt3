<script setup lang="ts">
const { isScrollToTop } = storeToRefs(useTempReplyStore())

watch(
  () => isScrollToTop.value,
  () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    isScrollToTop.value = false
  }
)
</script>

<template>
  <div class="fixed right-6 bottom-10 z-20">
    <KunButton
      rounded="full"
      :is-icon-only="true"
      size="xl"
      variant="shadow"
      @click="isScrollToTop = true"
    >
      <Icon class="icon" name="lucide:arrow-up-to-line" />
    </KunButton>
  </div>
</template>
