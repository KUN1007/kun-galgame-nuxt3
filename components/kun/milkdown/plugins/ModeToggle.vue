<script setup lang="ts">
const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseRouteName = computed(() => {
  return getRouteBaseName(route)
})

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
  if (baseRouteName.value === 'edit-topic') {
    topicMode.value = value
  } else {
    replyMode.value = value
  }
}
</script>

<template>
  <KunNav
    :items="modeItems"
    :default-value="baseRouteName === 'edit-topic' ? topicMode : replyMode"
    @set="(value) => handleSetMode(value as 'preview' | 'code')"
    v-tooltip="{
      message: {
        'en-us': 'Text Mode / WYSIWYG mode',
        'ja-jp': 'テキストモード / WYSIWYGモード',
        'zh-cn': '文本模式 / 所见即所得模式',
        'zh-tw': '文本模式 / 所見即所得模式'
      },
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
