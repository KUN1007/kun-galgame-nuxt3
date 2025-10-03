<script setup lang="ts">
import {
  kunGalgameToolsetTypeOptions,
  kunGalgameToolsetLanguageOptions,
  kunGalgameToolsetPlatformOptions,
  kunGalgameToolsetVersionOptions
} from '~/constants/toolset'
import { toolsetUpdateForm } from '~/components/toolset/rewriteStore'
import { updateToolsetSchema } from '~/validations/toolset'

const isSubmitting = ref(false)
const aliasInput = ref('')

const handleSubmit = async () => {
  const result = updateToolsetSchema.safeParse(toolsetUpdateForm)
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  await $fetch(`/api/toolset/${toolsetUpdateForm.toolsetId}`, {
    method: 'PUT',
    body: toolsetUpdateForm,
    ...kungalgameResponseHandler
  })
  isSubmitting.value = false

  useMessage('更新工具信息成功', 'success')
  navigateTo(`/toolset/${toolsetUpdateForm.toolsetId}`)
}

const handleAddAlias = () => {
  const value = aliasInput.value.trim()
  if (
    value &&
    toolsetUpdateForm.aliases.length < 17 &&
    !toolsetUpdateForm.aliases
      .map((x) => x.toLowerCase())
      .includes(value.toLowerCase())
  ) {
    toolsetUpdateForm.aliases.push(value)
    aliasInput.value = ''
  }
}

const handleRemoveAlias = () => {
  if (!aliasInput.value && toolsetUpdateForm.aliases.length) {
    toolsetUpdateForm.aliases.pop()
  }
}

const handleUpdatePageLink = (value: string | number) => {
  const linkArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  toolsetUpdateForm.homepage = linkArray
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <KunHeader
      name="编辑工具信息"
      description="更新你发布的 Galgame 工具信息"
    />

    <div class="space-y-2">
      <label class="text-sm font-medium">名称</label>
      <KunInput v-model="toolsetUpdateForm.name" placeholder="工具名称" />
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <KunSelect
        v-model="toolsetUpdateForm.type"
        label="工具类型"
        :options="kunGalgameToolsetTypeOptions.filter((o) => o.value !== 'all')"
      />
      <KunSelect
        v-model="toolsetUpdateForm.version"
        label="版本"
        :options="kunGalgameToolsetVersionOptions"
      />
    </div>

    <div class="space-y-2">
      <div class="text-xl font-medium">简介</div>
      <p class="text-default-500 text-sm">
        请在此处具体说明工具是什么, 以及如何使用该工具, 越详细越好
      </p>
      <KunMilkdownDualEditorProvider
        :value-markdown="toolsetUpdateForm.description"
        @set-markdown="(value) => (toolsetUpdateForm.description = value)"
        language="zh-cn"
      >
        <KunLink target="_blank" to="/doc/notice/create-galgame-toolset">
          发布 Galgame 工具规定
        </KunLink>
      </KunMilkdownDualEditorProvider>
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <KunSelect
        v-model="toolsetUpdateForm.platform"
        label="平台"
        :options="
          kunGalgameToolsetPlatformOptions.filter((o) => o.value !== 'all')
        "
      />
      <KunSelect
        v-model="toolsetUpdateForm.language"
        label="语言"
        :options="
          kunGalgameToolsetLanguageOptions.filter((o) => o.value !== 'all')
        "
      />
    </div>

    <div class="space-y-2">
      <div class="text-sm font-medium">主页 / 下载链接</div>
      <KunTextarea
        :model-value="toolsetUpdateForm.homepage.toString()"
        @update:model-value="handleUpdatePageLink"
        placeholder="如果有多个页面链接, 需要用英语逗号分隔每个链接"
      />
    </div>

    <div class="space-y-2">
      <div class="text-sm font-medium">别名（按 Enter 添加，最多 17 个）</div>
      <div
        class="ring-default-500 bg-default/10 min-h-[44px] w-full rounded-lg px-4 py-2 transition-all focus-within:ring-1"
      >
        <div class="flex flex-wrap gap-2">
          <KunBadge
            v-for="(a, i) in toolsetUpdateForm.aliases"
            :key="i"
            color="primary"
            size="sm"
          >
            {{ a }}
            <button
              class="ml-1 cursor-pointer"
              @click="toolsetUpdateForm.aliases.splice(i, 1)"
            >
              ×
            </button>
          </KunBadge>
          <input
            v-model="aliasInput"
            @keydown.enter.prevent="handleAddAlias"
            @keydown.backspace="handleRemoveAlias"
            class="placeholder-default-500 text-default-700 min-w-[120px] flex-grow bg-transparent outline-none"
            placeholder="输入别名后回车"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <KunButton :loading="isSubmitting" @click="handleSubmit">
        保存
      </KunButton>
    </div>
  </KunCard>
</template>
