<script setup lang="ts"></script>

<template>
  <div class="content-container">
    <MessageAside />

    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 10px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 64rem;
  margin: auto;
  display: flex;
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 30px;

  @include kun-blur;
}
</style>
