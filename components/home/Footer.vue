<script setup lang="ts"></script>

<template>
  <div class="footer">
    <div class="container">
      <HomeFooterWave />
      <HomeFooterInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
