<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.ranking.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.ranking.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="article">
      <RankingKUNGalgamerForm />
      <RankingTopicForm />
    </div>

    <KunFooter style="margin: 20px auto" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
}

.article {
  height: 100vh;
  width: 90%;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  border: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
  border-radius: 7px;
  margin: auto;
  display: flex;
  padding: 10px;
  color: var(--kungalgame-font-color-3);
}

@media (max-width: 700px) {
  .root {
    min-height: none;
    height: 100%;
  }

  .article {
    width: 95%;
    height: 100%;
    flex-direction: column;
  }
}
</style>
