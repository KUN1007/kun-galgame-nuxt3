<script setup lang="ts">
const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const mainPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.index + '%'
})
</script>

<template>
  <div class="main">
    <HomeAside class="aside" />
    <div class="article">
      <HomeContentArticle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  height: calc(100dvh - 75px);
  width: v-bind(mainPageWidth);
  transition: width 0.2s;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 17px;
}

.article {
  height: 100%;
  width: 1px;
  flex-grow: 1;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
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

  .main {
    width: 95%;
  }
}
</style>
