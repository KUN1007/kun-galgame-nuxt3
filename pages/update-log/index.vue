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
    <div class="container">
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
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100dvh - 75px);
  display: flex;
  flex-direction: column;
  min-height: 650px;
}

.container {
  width: 100%;
  height: 100%;
  max-width: 64rem;
  position: relative;
  margin: auto;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--kungalgame-shadow-0);
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
