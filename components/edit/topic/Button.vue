<script setup lang="ts">
import { checkTopicPublish } from '../utils/checkTopicPublish'
import { iconMap } from '../utils/category'
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData
} from '~/types/api/topic'

const {
  tid,
  title: rewriteTitle,
  content: rewriteContent,
  tags: rewriteTags,
  category: rewriteCategory,
  section: rewriteSection,
  textCount: rewriteTextCount,
  isTopicRewriting
} = storeToRefs(useTempEditStore())

const {
  textCount,
  title,
  content,
  tags,
  category,
  section: editSection
} = storeToRefs(usePersistEditTopicStore())

const isPublishing = ref(false)
const section = isTopicRewriting.value ? rewriteSection : editSection

const handlePublish = async () => {
  const requestData: EditCreateTopicRequestData = {
    title: title.value,
    content: content.value,
    time: Date.now().toString(),
    tags: tags.value,
    category: category.value,
    section: editSection.value
  }
  if (!checkTopicPublish(textCount.value, requestData)) {
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
    useComponentMessageStore().info('AlertInfo.edit.publishSuccess')
    usePersistEditTopicStore().resetTopicData()
  }
}

const handleRewrite = async () => {
  const requestData: EditUpdateTopicRequestData = {
    tid: tid.value,
    title: rewriteTitle.value,
    content: rewriteContent.value,
    tags: rewriteTags.value,
    category: rewriteCategory.value,
    section: rewriteSection.value,
    edited: Date.now().toString()
  }
  if (!checkTopicPublish(rewriteTextCount.value, requestData)) {
    return
  }

  const res = await useComponentMessageStore().alert('确定 Rewrite 吗?')
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
    useComponentMessageStore().info('AlertInfo.edit.rewriteSuccess')
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
  <div class="btn-container">
    <div class="section">
      <Icon class="icon" name="lucide:layout-grid" />
      <p v-for="(kun, index) in section" :key="index">
        <Icon class="icon" :name="iconMap[kun[0]]" />
        <span>
          {{ KUN_TOPIC_SECTION[kun] }}
        </span>
      </p>
    </div>

    <KunButton
      v-if="!isTopicRewriting"
      class="confirm-btn"
      @click="handlePublish"
      :disabled="isPublishing"
    >
      确认发布
    </KunButton>

    <KunButton
      type="danger"
      v-if="isTopicRewriting"
      class="rewrite-btn"
      @click="handleRewrite"
    >
      确认 Rewrite
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 200px;
    font-size: 17px;
    white-space: nowrap;
    flex-shrink: 0;
  }
}

.section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--kungalgame-font-color-1);

  .icon {
    font-size: 20px;
    margin-right: 10px;
  }

  p {
    margin: 3px;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-5);
    color: var(--kungalgame-blue-5);
    border-radius: 7px;
    display: flex;
    align-items: center;
    user-select: none;
  }
}

@media (max-width: 700px) {
  .btn-container {
    flex-direction: column;
    align-items: initial;

    button {
      width: 150px;
      margin: auto;
    }
  }

  .section {
    margin-bottom: 25px;
  }
}
</style>
