<script setup lang="ts"></script>

<template>
  <div class="root"></div>
</template>

<style lang="scss" scoped>
.root {
  height: 1500px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 700px) {
  .root {
    height: 100vh;
  }
}
</style>
