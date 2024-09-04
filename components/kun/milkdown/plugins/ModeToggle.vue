<script setup lang="ts">
const { mode: topicMode } = storeToRefs(usePersistEditTopicStore())
const { mode: replyMode } = storeToRefs(usePersistKUNGalgameReplyStore())

const routeName = useRouteName()

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

const handleSetMode = (value: 'preview' | 'code') => {
  if (routeName.value === 'edit-topic') {
    topicMode.value = value
  } else {
    replyMode.value = value
  }
}
</script>

<template>
  <KunNav
    :items="modeItems"
    :default-value="routeName === 'edit-topic' ? topicMode : replyMode"
    @set="(value) => handleSetMode(value as 'preview' | 'code')"
  />
</template>

<style lang="scss" scoped>
.kun-nav {
  height: 43px;
  font-size: 16px;
  margin-left: 17px;
}
</style>
