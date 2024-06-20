<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.ranking.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.ranking.description')
    }
  ]
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
  max-height: calc(100dvh - 100px);
  width: 100%;
  max-width: 64rem;
  margin: auto;
  display: flex;
  padding: 10px;
  overflow-y: scroll;

  @include kun-blur;

  &::-webkit-scrollbar {
    width: 0;
  }
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
