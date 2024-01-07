<script setup lang="ts">
const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const mainPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.index + '%'
})
</script>

<template>
  <div class="main">
    <div class="main-container">
      <div class="content-container">
        <HomeAside class="aside" />
        <HomeArticle />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 1px;
  flex-grow: 21;
}

.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-container {
  width: v-bind(mainPageWidth);
  transition: width 0.2s;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  backdrop-filter: blur(5px);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 5px;
  padding: 5px;
  border: 1px solid var(--kungalgame-blue-4);
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

  .content-container {
    width: 100%;
    border: none;
  }
}
</style>
