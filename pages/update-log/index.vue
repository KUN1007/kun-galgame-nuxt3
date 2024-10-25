<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('seo.updateLog.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.updateLog.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="content">
      <div class="todo">
        <div class="title">{{ $t('update.todo') }}</div>
        <UpdateLogTodo />
      </div>

      <div class="history">
        <div class="title">{{ $t('update.history') }}</div>
        <UpdateLogHistory />
      </div>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
  padding: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  @include kun-blur;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
}

.todo {
  width: 50%;
}

.title {
  height: 40px;
  font-size: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.history {
  height: 100%;
  width: 50%;
}

@media (max-width: 700px) {
  .root {
    min-width: 100%;
    min-height: 100%;
    height: calc(100dvh - 63px);
  }

  .container {
    height: 100%;
    width: 95%;
    max-height: 100%;
    overflow-y: scroll;
  }

  .content {
    flex-direction: column;
  }

  .todo,
  .history {
    width: 100%;
  }
}
</style>
