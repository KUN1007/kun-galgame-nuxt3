<script setup lang="ts">
const route = useRoute()

const { tags: rewriteTags, isTopicRewriting } = storeToRefs(useTempEditStore())
const { tags: editTags } = storeToRefs(usePersistEditTopicStore())
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())

const selectedTags = ref<string[]>([])
const isInputFocus = ref(false)
const inputValue = ref('')
const canDeleteTag = ref(false)

onMounted(() => alert(JSON.stringify(route)))

if (route.path.startsWith('edit')) {
  if (isTopicRewriting.value) {
    selectedTags.value = rewriteTags.value
  } else {
    selectedTags.value = editTags.value
  }
}

if (route.path.startsWith('/topic')) {
  if (isReplyRewriting.value) {
    selectedTags.value = replyRewrite.value[0].tags
  } else {
    selectedTags.value = replyDraft.value.tags
  }
}

const handleTagClose = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
}

const handleAddTag = () => {
  const tagName = inputValue.value.trim().slice(0, 17)
  const isIncludes = selectedTags.value
    .map((tag) => tag.toLowerCase())
    .includes(tagName.toLowerCase())

  if (isIncludes) {
    useMessage(10202, 'warn')
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

watch(
  () => selectedTags.value,
  () => {
    if (route.path.startsWith('/topic') && !isReplyRewriting.value) {
      replyDraft.value.tags = selectedTags.value
    }
    if (route.path.startsWith('/edit') && !isReplyRewriting.value) {
      editTags.value = selectedTags.value
    }
  }
)
</script>

<template>
  <div class="container-a">
    <div class="input-container">
      <div class="tags-container">
        <span
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="selected-tag"
        >
          {{ tag }}
          <span class="close-btn" @click="handleTagClose(tag)">×</span>
        </span>
      </div>

      <input
        class="input"
        type="text"
        v-model="inputValue"
        :placeholder="`${$t('edit.topic.tags')}`"
        @input="canDeleteTag = false"
        @keyup.enter="handleAddTag"
        @keyup.backspace="handleRemoveTag"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
      />

      <div class="box1"></div>
      <div class="box2" :class="isInputFocus ? 'box-active' : ''"></div>
    </div>

    <div class="hint">{{ $t('edit.topic.hint') }}</div>
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
  background-color: transparent;
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
</style>
