<script setup lang="ts"></script>

<template>
  <div class="root">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.root {
  background: linear-gradient(
    var(--kungalgame-trans-pink-0),
    var(--kungalgame-trans-blue-0)
  );
}
</style>
