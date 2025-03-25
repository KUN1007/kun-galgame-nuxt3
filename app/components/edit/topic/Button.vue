<script setup lang="ts">
import { checkTopicPublish } from '../utils/checkTopicPublish'
import { iconMap } from '../utils/category'
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData
} from '@/types/api/topic'

const {
  tid,
  title: rewriteTitle,
  content: rewriteContent,
  tags: rewriteTags,
  category: rewriteCategory,
  section: rewriteSection,
  isTopicRewriting
} = storeToRefs(useTempEditStore())

const {
  title,
  content,
  tags,
  category,
  section: editSection
} = storeToRefs(usePersistEditTopicStore())

const isPublishing = ref(false)
const section = isTopicRewriting.value ? rewriteSection : editSection

const handlePublish = async () => {
  const textCount = markdownToText(content.value).trim().length
  const requestData: EditCreateTopicRequestData = {
    title: title.value,
    content: content.value,
    time: Date.now().toString(),
    tags: tags.value,
    category: category.value,
    section: editSection.value
  }
  if (!checkTopicPublish(textCount, requestData)) {
    return
  }

  const res = await useComponentMessageStore().alert('确定发布吗?')
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10201, 'info')
  }
  const tid = await $fetch('/api/topic', {
    method: 'POST',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (tid) {
    navigateTo(`/topic/${tid}`)
    useKunLoliInfo('发布成功', 5)
    usePersistEditTopicStore().resetTopicData()
  }
}

const handleRewrite = async () => {
  const textCount = markdownToText(rewriteContent.value).trim().length
  const requestData: EditUpdateTopicRequestData = {
    tid: tid.value,
    title: rewriteTitle.value,
    content: rewriteContent.value,
    tags: rewriteTags.value,
    category: rewriteCategory.value,
    section: rewriteSection.value,
    edited: Date.now().toString()
  }
  if (!checkTopicPublish(textCount, requestData)) {
    return
  }

  const res = await useComponentMessageStore().alert('确定提交吗?')
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10201, 'info')
  }
  const result = await $fetch(`/api/topic/${tid.value}`, {
    method: 'PUT',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    navigateTo(`/topic/${tid.value}`)
    useKunLoliInfo('重新编辑成功', 5)
    useTempEditStore().resetRewriteTopicData()
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    if (!isTopicRewriting.value) {
      handlePublish()
    } else {
      handleRewrite()
    }
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="flex flex-wrap items-center justify-between">
    <TopicDetailSection size="md" :section="section" />

    <KunButton
      v-if="!isTopicRewriting"
      class="confirm-btn"
      @click="handlePublish"
      size="lg"
      :disabled="isPublishing"
    >
      确认发布
    </KunButton>

    <KunButton
      v-if="isTopicRewriting"
      class="rewrite-btn"
      size="lg"
      @click="handleRewrite"
    >
      确认 Rewrite
    </KunButton>
  </div>
</template>
