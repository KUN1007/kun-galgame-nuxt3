<script setup lang="ts">
import { KunTooltip } from '#components'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const {
  id,
  title,
  content,
  tags,
  category,
  section,
  isNSFW,
  isTopicRewriting
} = storeToRefs(useTempEditStore())
const { id: userId, role } = usePersistUserStore()
const isShowRewrite = computed(() => userId === props.topic.user.id || role > 1)

const rewriteTopic = async () => {
  id.value = props.topic.id
  title.value = props.topic.title
  content.value = props.topic.contentMarkdown
  tags.value = props.topic.tag
  category.value = props.topic.category
  section.value = props.topic.section ?? []
  isNSFW.value = !!props.topic.isNSFW
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
