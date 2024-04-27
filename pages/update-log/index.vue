<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.updateLog.title'),
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
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
  padding: 10px;
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
