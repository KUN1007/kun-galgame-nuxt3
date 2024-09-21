<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const content = ref<HTMLElement | null>(null)

const { t } = useI18n()
const { isTopicRewriting } = storeToRefs(useTempEditStore())

useHead({
  title: t('seo.edit.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.edit.description')
    }
  ]
})

onBeforeRouteLeave(async (_, __, next) => {
  if (isTopicRewriting.value) {
    const res = await useComponentMessageStore().alert({
      'en-us': 'Confirm leaving the page? Your changes will not be saved.',
      'ja-jp': 'ページを離れてもよろしいですか？変更は保存されません。',
      'zh-cn': '确认离开界面吗？您的更改将不会保存。',
      'zh-tw': '確認離開介面嗎？您的更改將不會保存。'
    })
    if (res) {
      useTempEditStore().resetRewriteTopicData()
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div ref="content" class="content">
        <ClientOnly>
          <EditTopicTitle />
          <EditTopicEditor :is-show-menu="true" />
          <EditTopicFooter />
        </ClientOnly>
      </div>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.container {
  position: relative;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;

  @include kun-blur;
  border-radius: 0;
}

.kun-footer {
  margin: 17px 0;
}

@media (max-width: 700px) {
  .root {
    height: calc(100vh - 63px);
  }
}
</style>
