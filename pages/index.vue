<script setup lang="ts"></script>

<template>
  <div class="root">
    <HomeContent />
    <HomeFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 1500px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 700px) {
  .root {
    height: calc(100vh - 65px);
  }
}
</style>
