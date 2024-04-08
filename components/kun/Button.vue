<script setup lang="ts"></script>

<template>
  <button class="kun-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.kun-button {
  border: 1px solid var(--kungalgame-blue-5);
  background-color: transparent;
  padding: 7px 10px;
  border-radius: 10px;
  color: var(--kungalgame-blue-5);
  cursor: pointer;

  &:hover {
    background-color: var(--kungalgame-blue-5);
    color: var(--kungalgame-white);
  }

  &:active {
    box-shadow:
      var(--kungalgame-white) 0px 0px 0px 2px,
      var(--kungalgame-blue-5) 0px 0px 0px 4px;
  }
}
</style>
