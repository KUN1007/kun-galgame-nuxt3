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

if (route.name === 'edit-topic') {
  if (isTopicRewriting.value) {
    selectedTags.value = rewriteTags.value
  } else {
    selectedTags.value = editTags.value
  }
}

if (route.name === 'topic-tid') {
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
    if (route.name === 'topic-tid' && !isReplyRewriting.value) {
      replyDraft.value.tags = selectedTags.value
    }
    if (route.name === 'edit-topic' && !isReplyRewriting.value) {
      editTags.value = selectedTags.value
    }
  }
)
</script>

<template>
  <div class="mx-auto w-full">
    <div class="relative">
      <div
        class="ring-primary bg-default/10 min-h-[44px] w-full rounded-lg px-6 py-3 shadow transition-colors focus-within:ring-1"
      >
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in selectedTags"
            :key="index"
            class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {{ tag }}
            <button
              @click="handleTagClose(tag)"
              class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              ×
            </button>
          </span>

          <input
            class="placeholder-default-500 min-w-[120px] flex-grow bg-transparent text-gray-700 outline-none"
            type="text"
            v-model="inputValue"
            placeholder="请输入标签"
            @input="canDeleteTag = false"
            @keyup.enter="handleAddTag"
            @keyup.backspace="handleRemoveTag"
            @focus="isInputFocus = true"
            @blur="isInputFocus = false"
          />
        </div>
      </div>

      <button
        v-if="inputValue"
        @click="handleAddTag"
        class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gray-100"
      >
        <Icon name="lucide:plus" class="h-5 w-5 text-blue-600" />
      </button>
    </div>

    <p class="mt-2 text-sm text-gray-600">
      提示：（单个标签 17 个字符以内，至少选择一个、最多 7
      个），您可以输入文字后按下 'Enter' 创建标签
    </p>
  </div>
</template>
