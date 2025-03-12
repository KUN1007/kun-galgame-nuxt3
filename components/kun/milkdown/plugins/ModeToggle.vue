<script setup lang="ts">
const route = useRoute()

const { mode: topicMode } = storeToRefs(usePersistEditTopicStore())
const { mode: replyMode } = storeToRefs(usePersistKUNGalgameReplyStore())

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
  if (route.name === 'edit-topic') {
    topicMode.value = value
  } else {
    replyMode.value = value
  }
}
</script>

<template>
  <KunTab
    :items="modeItems"
    :default-value="route.name === 'edit-topic' ? topicMode : replyMode"
    @set="(value) => handleSetMode(value as 'preview' | 'code')"
    v-tooltip="{
      message: '文本模式 / 所见即所得模式',
      position: 'bottom'
    }"
  />
</template>

<style lang="scss" scoped>
.kun-nav {
  display: inline-block;
  height: 43px;
  line-height: 37px;
  vertical-align: middle;
  font-size: 16px;
  margin-left: 17px;
}
</style>
