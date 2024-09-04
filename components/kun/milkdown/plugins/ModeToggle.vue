<script setup lang="ts">
const { mode } = storeToRefs(usePersistEditTopicStore())

const modeItems = [
  {
    i18n: 'edit.topic.preview',
    value: 'preview'
  },
  {
    i18n: 'edit.topic.code',
    value: 'code'
  }
]
</script>

<template>
  <KunNav
    :items="modeItems"
    :default-value="mode"
    @set="(value) => (mode = value as 'preview' | 'code')"
  />
</template>

<style lang="scss" scoped>
.kun-nav {
  height: 43px;
  font-size: 16px;
  margin-left: 17px;
}
</style>
