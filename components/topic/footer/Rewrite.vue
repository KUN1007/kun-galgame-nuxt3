<script setup lang="ts">
const { tid, title, content, tags, category, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { isEdit } = storeToRefs(useTempReplyStore())
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())

const router = useRouter()

const props = defineProps<{
  tid: number
  rid: number
  uid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  toUid: number
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
  tid.value = props.tid
  title.value = props.title
  content.value = props.content
  tags.value = props.tags
  category.value = props.category
  isTopicRewriting.value = true

  router.push('/edit')
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
    <Icon name="line-md:pencil-twotone-alt" />
  </span>
</template>

<style lang="scss" scoped></style>
