<script setup lang="ts">
const showPopover = ref(false)
</script>

<template>
  <div
    class="kun-popover"
    @mouseover="showPopover = true"
    @mouseleave="showPopover = false"
  >
    <slot></slot>
    <div v-if="showPopover" class="popover">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kun-popover {
  width: 100%;
  position: relative;
  display: inline-block;
}

.popover {
  background-color: transparent;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
}
</style>
