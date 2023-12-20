<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="article-container">
      <HomeContentHeader />
      <HomeContentArticle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 1px;
  flex-grow: 1;
  height: 100%;
}

.article-container {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
