<script setup lang="ts"></script>

<template>
  <div class="content-container">
    <MessageAsideContainer />

    <div class="content">
      <NuxtPage />

      <KunFooter />
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
  padding: 10px;

  @include kun-blur;
}

.kun-footer {
  margin: 16px 0;
}
</style>
