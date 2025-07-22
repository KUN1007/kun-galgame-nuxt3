import { createTopicSchema } from '~/validations/topic'
import { useTopicEditorStore } from './useTopicEditorStore'

export const useTopicSubmitter = () => {
  const { category, section, tags, title, content } = useTopicEditorStore()
  const tempStore = useTempEditStore()
  const persistStore = usePersistEditTopicStore()

  const isSubmitting = ref(false)
  const isRewriteMode = computed(() => tempStore.isTopicRewriting)

  const submit = async () => {
    if (isSubmitting.value) return

    const data = {
      title: title.value,
      content: content.value,
      tag: tags.value,
      category: category.value,
      section: section.value
    }

    const submitData = isRewriteMode.value
      ? { ...data, topicId: tempStore.id }
      : data

    const result = createTopicSchema.safeParse(submitData)
    if (!result.success) {
      const error = JSON.parse(result.error.message)[0]
      useMessage(`位置: ${error.path[0]} - 错误提示: ${error.message}`, 'warn')
      return
    }

    const confirmation = await useComponentMessageStore().alert(
      `确定要${isRewriteMode.value ? '提交更改' : '发布话题'}吗?`
    )
    if (!confirmation) return

    isSubmitting.value = true
    if (isRewriteMode.value) {
      const topicId = tempStore.id
      await $fetch(`/api/topic/${topicId}`, {
        method: 'PUT',
        body: submitData,
        watch: false,
        ...kungalgameResponseHandler
      })
      useKunLoliInfo('重新编辑成功', 5)
      tempStore.resetRewriteTopicData()
      await navigateTo(`/topic/${topicId}`)
    } else {
      const tid = await $fetch('/api/topic', {
        method: 'POST',
        body: submitData,
        watch: false,
        ...kungalgameResponseHandler
      })
      if (tid) {
        useKunLoliInfo('发布成功', 5)
        persistStore.resetTopicData()
        await navigateTo(`/topic/${tid}`)
      }
    }
    isSubmitting.value = false
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault()
      submit()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))

  return {
    submit,
    isSubmitting,
    isRewriteMode
  }
}
