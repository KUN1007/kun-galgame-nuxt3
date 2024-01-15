<script setup lang="ts">
const { showKUNGalgameMessageBox } = storeToRefs(useTempSettingStore())
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeInRight animate__faster"
    appear
  >
    <div class="root">
      <div>box</div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.root {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  min-height: 100vh;
  border-left: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px 0 0 5px;
  background-color: var(--kungalgame-trans-white-2);
}
</style>
