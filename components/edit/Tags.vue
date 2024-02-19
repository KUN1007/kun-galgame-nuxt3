<script setup lang="ts">
const routeName = useRouteName()

const {
  tags: rewriteTags,
  isTopicRewriting,
  clearTopic,
} = storeToRefs(useTempEditStore())
const { isShowHotKeywords: isShowEditHotKeywords, tags: editTags } =
  storeToRefs(useKUNGalgameEditStore())
const { isReplyRewriting, isClearContent, replyRewrite } =
  storeToRefs(useTempReplyStore())
const { isShowHotKeywords: isShowReplyHotKeywords, replyDraft } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const isShowKeywords = computed(() =>
  routeName.value === 'edit'
    ? isShowEditHotKeywords.value
    : isShowReplyHotKeywords.value
)

const hotTags = ref<string[]>([])
const selectedTags = ref<string[]>([])
const isInputFocus = ref(false)
const inputValue = ref('')
const canDeleteTag = ref(false)

if (routeName.value === 'edit') {
  if (isTopicRewriting.value) {
    selectedTags.value = rewriteTags.value
  } else {
    selectedTags.value = editTags.value
  }
}

if (routeName.value === 'topic-tid') {
  if (isReplyRewriting.value) {
    selectedTags.value = replyRewrite.value.tags
  } else {
    selectedTags.value = replyDraft.value.tags
  }
}

const getTags = async () => {
  const { data } = await useFetch('/api/tag/popular', {
    method: 'GET',
    watch: false,
  })
  return data.value ? data.value : []
}

const isLoadEditHotTags =
  routeName.value === 'edit' && isShowEditHotKeywords.value
const isLoadTopicHotTags =
  routeName.value === 'topic-tid' && isShowReplyHotKeywords.value

if (isLoadEditHotTags || isLoadTopicHotTags) {
  hotTags.value = await getTags()
}

const handleTagClick = (tag: string) => {
  if (selectedTags.value.length < 7) {
    selectedTags.value.push(tag)
  }
}

const handleTagClose = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
}

const remainingTags = computed(() => {
  return hotTags.value.filter((tag) => !selectedTags.value.includes(tag))
})

const handleAddTag = () => {
  const tagName = inputValue.value.trim().slice(0, 17)

  if (selectedTags.value.includes(tagName)) {
    useMessage(
      'Tag already exists, please choose another one',
      '标签已存在，请更换',
      'warn'
    )
    return
  }

  if (tagName.length > 0 && selectedTags.value.length < 7) {
    const tag = validateTagName(tagName)

    selectedTags.value.push(tag)
    inputValue.value = ''
    canDeleteTag.value = true
  }
}

const handleRemoveTag = () => {
  if (inputValue.value === '' && selectedTags.value.length > 0) {
    if (canDeleteTag.value) {
      selectedTags.value.pop()
    }
    canDeleteTag.value = true
  }
}

const validateTagName = (tagName: string) => {
  let validatedName = tagName

  if (validatedName.length > 17) {
    validatedName = validatedName.slice(0, 17)
  }

  return validatedName
}

watch(selectedTags.value, () => {
  if (routeName.value === 'topic-tid') {
    replyDraft.value.tags = selectedTags.value
  }
  if (routeName.value === 'edit') {
    editTags.value = selectedTags.value
  }
})

watch(
  () => isShowKeywords.value,
  async () => {
    if (
      (routeName.value === 'edit' && isShowEditHotKeywords.value) ||
      (routeName.value === 'topic-tid' && isShowReplyHotKeywords.value)
    ) {
      hotTags.value = await getTags()
    }
  }
)

watch(
  () => [clearTopic.value, isClearContent.value],
  () => {
    selectedTags.value = []
  }
)
</script>

<template>
  <div class="container-a">
    <div class="input-container">
      <div class="tags-container">
        <span v-for="tag in selectedTags" class="selected-tag">
          {{ tag }}
          <span class="close-btn" @click="handleTagClose(tag)">×</span>
        </span>
      </div>

      <input
        class="input"
        type="text"
        v-model="inputValue"
        :placeholder="`${$t('edit.tags')}`"
        @input="canDeleteTag = false"
        @keyup.enter="handleAddTag"
        @keyup.backspace="handleRemoveTag"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      />

      <div class="box1"></div>
      <div class="box2" :class="isInputFocus ? 'box-active' : ''"></div>
    </div>

    <div class="hint">{{ $t('edit.hint') }}</div>

    <div class="hot-tags" v-if="isShowKeywords">
      <div class="tags-info">{{ $t('edit.hot') }}</div>

      <div class="tags">
        <span v-for="tag in remainingTags" @click="() => handleTagClick(tag)">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-a {
  width: 100%;
}

.input-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.selected-tag {
  border: 1px solid var(--kungalgame-pink-4);
  border-radius: 14px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
  padding: 3px 17px;
  background-color: var(--kungalgame-trans-pink-0);

  span {
    cursor: pointer;
  }
}

.close-btn {
  margin: 0 5px;
}

.input {
  background-color: var(--kungalgame-trans-white-9);
  font-size: 17px;
  flex-grow: 1;
  border: none;
  padding: 7px;
  display: flex;
  min-width: 300px;
  color: var(--kungalgame-font-color-3);
}

.box1 {
  height: 2px;
  width: 100%;
  display: flex;
  background-color: var(--kungalgame-blue-0);
}

.box2 {
  position: relative;
  transform: translateY(-2px);
  transition: all 0.5s;
  height: 2px;
  width: 1px;
  display: flex;
  background-color: var(--kungalgame-blue-2);
}

.box-active {
  width: 100%;
  background-color: var(--kungalgame-blue-5);
}

.hint {
  font-size: small;
  color: var(--kungalgame-font-color-1);
}

.tags-info {
  margin-top: 20px;
  margin-bottom: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;

  & > span {
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
    margin: 5px;
    display: block;
    white-space: nowrap;
    font-size: 14px;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    cursor: pointer;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
