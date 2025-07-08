<script setup lang="ts">
import { KunTooltip } from '#components'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const { id, title, content, tags, category, section, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { uid } = usePersistUserStore()
const isShowRewrite = computed(() => uid === props.topic.user.id)

const rewriteTopic = async () => {
  id.value = props.topic.id
  title.value = props.topic.title
  content.value = props.topic.contentMarkdown
  tags.value = props.topic.tag
  category.value = props.topic.category
  section.value = props.topic.section ?? []
  isTopicRewriting.value = true

  await navigateTo('/edit/topic')
}
</script>

<template>
  <KunTooltip text="重新编辑">
    <KunButton
      :is-icon-only="true"
      variant="light"
      color="default"
      size="lg"
      v-if="isShowRewrite"
      @click="rewriteTopic"
    >
      <KunIcon name="lucide:pencil" />
    </KunButton>
  </KunTooltip>
</template>
