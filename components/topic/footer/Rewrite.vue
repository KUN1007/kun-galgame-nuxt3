<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const {
  tid: storeTid,
  title: storeTitle,
  content: storeContent,
  tags: storeTags,
  category: storeCategory,
  section: storeSection,
  isTopicRewriting
} = storeToRefs(useTempEditStore())
const { isEdit } = storeToRefs(useTempReplyStore())
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())

const localePath = useLocalePath()

const props = defineProps<{
  topic: TopicDetail
}>()

const isShowRewrite = ref(props.uid === props.toUid)

watch(
  () => props.toUid,
  () => {
    if (props.uid === props.toUid) {
      isShowRewrite.value = true
    } else {
      isShowRewrite.value = false
    }
  }
)

const rewriteTopic = () => {
  storeTid.value = props.tid
  storeTitle.value = props.title
  storeContent.value = props.content
  storeTags.value = props.tags
  storeCategory.value = props.category
  storeSection.value = props.section ?? []
  isTopicRewriting.value = true

  navigateTo(localePath('/edit/topic'))
}

const rewriteReply = () => {
  replyRewrite.value.tid = props.tid
  replyRewrite.value.rid = props.rid
  replyRewrite.value.content = props.content
  replyRewrite.value.tags = props.tags

  isReplyRewriting.value = true

  isEdit.value = true
}

const handleClickRewrite = () => {
  if (props.rid === 0) {
    rewriteTopic()
  } else {
    rewriteReply()
  }
}
</script>

<template>
  <span v-if="isShowRewrite" @click="handleClickRewrite" class="icon">
    <Icon name="lucide:pencil" />
  </span>
</template>

<style lang="scss" scoped></style>
