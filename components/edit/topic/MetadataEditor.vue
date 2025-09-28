<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'
import {
  TOPIC_CATEGORIES,
  TOPIC_SECTIONS,
  type TopicCategoryKey
} from '~/constants/topic'

const MAX_SECTIONS = 3
const MAX_TAGS = 7

const { category, section, tags, isNSFW } = useTopicEditorStore()
const tagInput = ref('')
const isTagInputFocused = ref(false)

const handleSelectCategory = (key: TopicCategoryKey) => {
  if (category.value !== key) {
    category.value = key
    section.value = []
  }
}

const availableSections = computed(() => {
  if (!category.value) {
    return {}
  }
  return TOPIC_SECTIONS[category.value]
})

const isSectionSelected = (sectionKey: string) => {
  return section.value.includes(sectionKey)
}

const handleToggleSection = (sectionKey: string) => {
  const index = section.value.indexOf(sectionKey)
  if (index > -1) {
    section.value.splice(index, 1)
  } else {
    if (section.value.length < MAX_SECTIONS) {
      section.value.push(sectionKey)
    } else {
      useMessage(`最多只能选择 ${MAX_SECTIONS} 个分区`, 'warn')
    }
  }
}

const handleAddTag = () => {
  const newTag = tagInput.value.trim().slice(0, 17)
  if (!newTag) {
    return
  }
  if (tags.value.length >= MAX_TAGS) {
    useMessage(`最多只能添加 ${MAX_TAGS} 个标签`, 'warn')
    return
  }
  if (tags.value.map((t) => t.toLowerCase()).includes(newTag.toLowerCase())) {
    useMessage('标签已存在', 'warn')
    return
  }
  tags.value.push(newTag)
  tagInput.value = ''
}

const handleRemoveTag = (tagToRemove: string) => {
  tags.value = tags.value.filter((t) => t !== tagToRemove)
}

const handleTagInputBackspace = () => {
  if (tagInput.value === '' && tags.value.length > 0) {
    handleRemoveTag(tags.value[tags.value.length - 1])
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h3 class="flex items-center gap-2 text-lg font-semibold">
        <Icon name="lucide:layout-grid" class="h-5 w-5" />
        选择分类 <span class="text-danger-500">*</span>
      </h3>
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="cat in TOPIC_CATEGORIES"
          :key="cat.key"
          @click="handleSelectCategory(cat.key)"
          :class="
            cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-all duration-200',
              category === cat.key
                ? 'border-primary-500 bg-primary-500/10'
                : 'border-default-500/20 hover:border-primary-500'
            )
          "
        >
          <KunIcon
            :name="cat.icon"
            class="mb-2 h-8 w-8"
            :class="
              category === cat.key ? 'text-primary-600' : 'text-default-500'
            "
          />
          <span class="text-default-800">
            {{ cat.label }}
          </span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="category" class="space-y-4">
        <h3
          class="text-default-900 flex items-center gap-2 text-lg font-semibold"
        >
          <Icon name="lucide:columns" class="h-5 w-5" />
          选择分区
          <span class="text-danger-500">*</span>
          <span class="text-default-500 text-sm font-normal">
            (已选 {{ section.length }}/{{ MAX_SECTIONS }})
          </span>
        </h3>
        <div class="flex flex-wrap gap-3">
          <KunButton
            :variant="isSectionSelected(key) ? 'solid' : 'light'"
            :color="isSectionSelected(key) ? 'primary' : 'default'"
            v-for="(label, key) in availableSections"
            :key="key"
            @click="handleToggleSection(key)"
            :disabled="
              section.length >= MAX_SECTIONS && !isSectionSelected(key)
            "
            rounded="full"
            size="sm"
            :class-name="isSectionSelected(key) ? '' : 'bg-default-500/20'"
          >
            {{ label }}
          </KunButton>
        </div>

        <p class="text-default-500 mt-2 text-sm">
          话题至少选择一个分区，最多 {{ MAX_SECTIONS }} 个
        </p>
      </div>
    </Transition>

    <div class="space-y-4">
      <h3
        class="text-default-900 flex items-center gap-2 text-lg font-semibold"
      >
        <Icon name="lucide:tags" class="h-5 w-5" />
        添加标签
        <span class="text-danger-500">*</span>
        <span class="text-default-500 text-sm font-normal">
          (已添加 {{ tags.length }}/{{ MAX_TAGS }})
        </span>
      </h3>
      <div
        class="flex flex-wrap items-center gap-2 rounded-lg border p-3 transition-all"
        :class="
          isTagInputFocused ? 'ring-primary-500 ring-2' : 'border-default-300'
        "
      >
        <KunBadge size="md" color="default" v-for="t in tags" :key="t">
          {{ t }}
          <KunButton
            variant="light"
            color="default"
            size="xs"
            :is-icon-only="true"
            @click="handleRemoveTag(t)"
            class="text-default-500 hover:text-danger-500"
          >
            <Icon name="lucide:x" class="h-3 w-3" />
          </KunButton>
        </KunBadge>
        <input
          v-if="tags.length < MAX_TAGS"
          v-model="tagInput"
          type="text"
          placeholder="输入后按回车添加..."
          class="text-default-800 placeholder-default-400 min-w-[120px] flex-grow bg-transparent p-1 outline-none"
          @keydown.enter.prevent="handleAddTag"
          @keydown.backspace="handleTagInputBackspace"
          @focus="isTagInputFocused = true"
          @blur="isTagInputFocused = false"
        />
        <KunButton
          v-if="tags.length < MAX_TAGS"
          variant="flat"
          :is-icon-only="true"
          @click="handleAddTag"
        >
          <KunIcon name="lucide:plus" />
        </KunButton>
      </div>
      <p class="text-default-500 mt-2 text-sm">
        话题至少选择一个标签，最多 {{ MAX_TAGS }} 个
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="flex items-center gap-2 text-lg font-semibold">
        <Icon name="lucide:shield-alert" class="h-5 w-5" />
        NSFW 设置
      </h3>
      <KunCheckBox
        v-model="isNSFW"
        type="single"
        label="该话题包含 NSFW 内容 (R18 等)"
        color="primary"
      />
      <p class="text-default-500 mt-2 text-sm">
        勾选后, 未开启网站 NSFW 模式的用户将无法看到该话题, 和 Galgame 的 NSFW
        标准一样, 看起来不能在公司报告大会上放在 PPT 里展示的话题都是 NSFW,
        总之就是越严越好，可以错杀不可以放过 (另外, 只允许萌萌的涩涩,
        不允许纯粹的色情废料)
      </p>
    </div>
  </div>
</template>
