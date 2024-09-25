<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const localePath = useLocalePath()

const { tid, title, content, tags, category, section, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { uid } = usePersistUserStore()
const isShowRewrite = computed(() => uid === props.topic.user.uid)

const rewriteTopic = () => {
  tid.value = props.topic.tid
  title.value = props.topic.title
  content.value = props.topic.markdown
  tags.value = props.topic.tags
  category.value = props.topic.category
  section.value = props.topic.section ?? []
  isTopicRewriting.value = true

  navigateTo(localePath('/edit/topic'))
}
</script>

<template>
  <span v-if="isShowRewrite" @click="rewriteTopic" class="icon">
    <Icon name="lucide:pencil" />
  </span>
</template>

<style lang="scss" scoped></style>
