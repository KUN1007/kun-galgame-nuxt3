<script setup lang="ts">
const { isScrollToTop } = storeToRefs(useTempReplyStore())
</script>

<template>
  <div class="bar">
    <div class="top" @click="isScrollToTop = true">
      <Icon class="icon" name="lucide:arrow-up-to-line" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  position: fixed;
  bottom: 50px;
  right: 17px;
  z-index: 7;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  box-shadow: var(--shadow);
  cursor: pointer;
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 50%;

  .icon {
    font-size: 22px;
    color: var(--kungalgame-blue-5);
  }
}

.top {
  margin-top: 11px;
}
</style>
