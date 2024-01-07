<script setup lang="ts">
const { isTopicRewriting } = storeToRefs(useTempEditStore())
const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const editPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.edit + '%'
})

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
  height: calc(100vh - 65px);
  min-height: 700px;
  display: flex;
  flex-direction: column;
}

.container {
  transition: all 0.2s;
  width: v-bind(editPageWidth);
  max-width: 1500px;
  overflow-y: scroll;
  margin: 0 auto;
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-2);
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
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
