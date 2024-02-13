<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHead({
  title: t('seo.edit.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.edit.description'),
    },
  ],
})

const { isTopicRewriting } = storeToRefs(useTempEditStore())

onBeforeRouteLeave(async (to, from, next) => {
  if (isTopicRewriting.value) {
    const res = await useTempMessageStore().alert('AlertInfo.edit.leave', true)
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
      <KunMilkdownComponentsTitle />
      <KunMilkdownWrapper :is-show-menu="true" />

      <div class="content-footer">
        <EditTags />

        <EditFooter />
      </div>
    </div>

    <KunFooter style="margin: 0 auto; padding-top: 10px" />

    <span
      class="reference"
      style="margin: 0 auto; color: var(--kungalgame-font-color-3)"
    >
      Editor powered by
      <a
        href="https://github.com/Milkdown/milkdown"
        target="_blank"
        rel="noopener noreferrer"
      >
        Milkdown
      </a>
      &
      <a
        href="https://github.com/KUN1007/milkdown-vue3-demo"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('header.name') }}
      </a>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  min-height: 700px;
  display: flex;
  flex-direction: column;
}

.container {
  transition: all 0.2s;
  width: 100%;
  max-width: 64rem;
  overflow-y: scroll;
  margin: 0 auto;
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  color: var(--kungalgame-font-color-3);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
}

.content-footer {
  padding: 10px;
  padding-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reference {
  a {
    font-style: oblique;
    color: var(--kungalgame-blue-4);

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 1000px) {
  .container {
    width: 100%;
  }
}
</style>
