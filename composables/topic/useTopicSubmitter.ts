import { createTopicSchema } from '~/validations/topic'
import { useTopicEditorStore } from './useTopicEditorStore'
import {
  TOPIC_SECTION_CONSUME_MOEMOEPOINTS,
  MOEMOEPOINT_COST_FOR_CONSUME_SECTION
} from '~/config/moemoepoint'

export const useTopicSubmitter = () => {
  const { category, section, tags, title, content, isNSFW } =
    useTopicEditorStore()
  const tempStore = useTempEditStore()
  const persistStore = usePersistEditTopicStore()
  const { moemoepoint } = usePersistUserStore()

  const rules = reactive({
    isReadRule: false,
    isAgreeCategory: false,
    isValidTitle: false,
    isKnownConsequence: false
  })
  const isSubmitting = ref(false)
  const isRewriteMode = computed(() => tempStore.isTopicRewriting)

  const submit = async () => {
    if (isSubmitting.value) {
      return
    }

    const isReadAllRules = Object.values(rules).every((value) => value)
    if (moemoepoint < 50 && !isReadAllRules) {
      useMessage('请勾选同意所有发布须知后再发布话题', 'warn')
      return
    }

    const data = {
      title: title.value,
      content: content.value,
      tag: tags.value,
      category: category.value,
      section: section.value,
      is_nsfw: isNSFW.value
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

    const hasConsumeSection = TOPIC_SECTION_CONSUME_MOEMOEPOINTS.some((item) =>
      submitData.section.includes(item as 'g-seeking')
    )
    if (
      hasConsumeSection &&
      moemoepoint < MOEMOEPOINT_COST_FOR_CONSUME_SECTION
    ) {
      useMessage(
        `您没有足够的萌萌点来发布求助或者寻求资源的话题, 您可以通过发布 Galgame, 签到, 接受别人的赞赏, 等等来获取萌萌点`,
        'warn'
      )
      return
    }
    const confirmation = await useComponentMessageStore().alert(
      `确定要${isRewriteMode.value ? '提交更改' : '发布话题'}吗?`,
      hasConsumeSection
        ? `发布此分类的话题将会消耗您 10 萌萌点, 您目前有 ${moemoepoint} 萌萌点`
        : ''
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
    rules,
    submit,
    isSubmitting,
    isRewriteMode
  }
}
