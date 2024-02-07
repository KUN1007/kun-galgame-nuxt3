<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.updateLog.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.updateLog.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="content">
        <div class="next-ver">
          <div class="title">{{ $t('update.next') }}</div>
          <UpdateLogNext />
        </div>

        <div class="history-ver">
          <div class="title">{{ $t('update.history') }}</div>
          <UpdateLogHistory />
        </div>
      </div>

      <KunFooter style="display: block" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  min-height: 650px;
}

.container {
  height: 60vh;
  width: 80vw;
  max-height: 500px;
  max-width: 900px;
  position: relative;
  margin: auto;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
}

.next-ver {
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

.history-ver {
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
  }
  .content {
    flex-direction: column;
  }
  .next-ver,
  .history-ver {
    width: 100%;
  }
}
</style>
