<script setup lang="ts">
import {
  kunGalgameToolsetTypeOptions,
  kunGalgameToolsetLanguageOptions,
  kunGalgameToolsetPlatformOptions,
  kunGalgameToolsetVersionOptions
} from '~/constants/toolset'
import { createToolsetSchema } from '~/validations/toolset'
import type { z } from 'zod'

type CreateFormType = z.infer<typeof createToolsetSchema>

const form = reactive<CreateFormType & { aliasInput: string }>({
  name: '',
  description: '',
  language: 'zh-cn',
  platform: 'windows',
  type: 'emulator',
  version: 'stable',
  homepage: [] as string[],
  aliasInput: '',
  aliases: [] as string[]
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  const result = createToolsetSchema.safeParse(form)
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
  const id = await $fetch('/api/toolset', {
    method: 'POST',
    body: form,
    ...kungalgameResponseHandler
  })
  isSubmitting.value = false

  if (id) {
    useMessage('创建工具成功', 'success')
    navigateTo(`/toolset/${id}`)
  }
}

const handleAddAlias = () => {
  const value = form.aliasInput.trim()
  if (
    value &&
    form.aliases.length < 17 &&
    !form.aliases.map((x) => x.toLowerCase()).includes(value.toLowerCase())
  ) {
    form.aliases.push(value)
    form.aliasInput = ''
  }
}

const handleRemoveAlias = () => {
  if (!form.aliasInput && form.aliases.length) {
    form.aliases.pop()
  }
}

const handleUpdatePageLink = (value: string | number) => {
  const linkArray = value
    .toString()
    .split(',')
    .map((l) => l.trim())
  form.homepage = linkArray
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <KunHeader
      name="发布 Galgame 工具"
      description="提交与 Galgame 相关的工具，帮助其他用户下载与使用"
    />

    <div class="space-y-2">
      <div class="text-xl font-medium">名称</div>
      <KunInput v-model="form.name" placeholder="工具名称" />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <KunSelect
        v-model="form.type"
        label="工具类型"
        :options="kunGalgameToolsetTypeOptions.filter((o) => o.value !== 'all')"
      />
      <KunSelect
        v-model="form.version"
        label="版本"
        :options="
          kunGalgameToolsetVersionOptions.filter((o) => o.value !== 'all')
        "
      />
      <KunSelect
        v-model="form.platform"
        label="平台"
        :options="
          kunGalgameToolsetPlatformOptions.filter((o) => o.value !== 'all')
        "
      />
      <KunSelect
        v-model="form.language"
        label="语言"
        :options="
          kunGalgameToolsetLanguageOptions.filter((o) => o.value !== 'all')
        "
      />
    </div>

    <div class="space-y-2">
      <div class="text-xl font-medium">简介</div>
      <p class="text-default-500 text-sm">
        请在此处具体说明工具是什么, 以及如何使用该工具, 越详细越好
      </p>
      <KunMilkdownDualEditorProvider
        :value-markdown="form.description"
        @set-markdown="(value) => (form.description = value)"
        language="zh-cn"
      >
        <KunLink target="_blank" to="/doc/notice/create-galgame-toolset">
          发布 Galgame 工具规定
        </KunLink>
      </KunMilkdownDualEditorProvider>
    </div>

    <div class="space-y-2">
      <div class="text-xl font-medium">主页</div>
      <KunTextarea
        :model-value="form.homepage.toString()"
        @update:model-value="handleUpdatePageLink"
        placeholder="工具的官网, GitHub 仓库等等, 如果有多个链接, 使用英语逗号分隔每个下载链接"
      />
    </div>

    <div class="space-y-2">
      <div class="text-xl font-medium">别名（按 Enter 添加，最多 17 个）</div>
      <div
        class="ring-default-500 bg-default/10 w-full rounded-lg px-4 py-2 transition-all focus-within:ring-1"
      >
        <div class="flex flex-wrap gap-2">
          <KunBadge
            v-for="(a, i) in form.aliases"
            :key="i"
            color="primary"
            size="sm"
          >
            {{ a }}
            <button
              class="ml-1 cursor-pointer"
              @click="form.aliases.splice(i, 1)"
            >
              ×
            </button>
          </KunBadge>
          <input
            v-model="form.aliasInput"
            @keydown.enter.prevent="handleAddAlias"
            @keydown.backspace="handleRemoveAlias"
            class="placeholder-default-500 text-default-700 min-w-[120px] flex-grow bg-transparent outline-none"
            placeholder="输入别名后按下回车添加"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <KunButton :loading="isSubmitting" @click="handleSubmit">
        发布
      </KunButton>
    </div>
  </KunCard>
</template>
