<script setup lang="ts">
import { KunTooltip } from '#components'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

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

  navigateTo('/edit/topic')
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
