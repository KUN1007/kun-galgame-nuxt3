<script setup lang="ts"></script>

<template>
  <div class="main">
    <HomeAsideContainer class="aside" />

    <HomeContentArticle />
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  height: calc(100dvh - 75px);
  width: 100%;
  max-width: 64rem;
  transition: width 0.2s;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .aside {
    display: none;
  }

  .content-container {
    width: 80%;
    border: none;
  }
}

@media (max-width: 700px) {
  .aside {
    display: none;
  }
}
</style>
