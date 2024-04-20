<script setup lang="ts">
const { data } = await useLazyFetch(`/api/home/pin`, {
  method: 'GET'
})
</script>

<template>
  <div class="main">
    <HomeAsideContainer class="aside" />
    <div class="article">
      <HomePinned :topics="data" v-if="data?.length" />
      <HomeContentArticle />
    </div>
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

.article {
  height: 100%;
  width: 1px;
  flex-grow: 1;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
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
