<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
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
}
</style>
