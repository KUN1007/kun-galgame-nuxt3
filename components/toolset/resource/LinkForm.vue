<script setup lang="ts">
import { createToolsetResourceSchema } from '~/validations/toolset'
import type { ToolsetUploadCompleteResponse } from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
  type: 's3' | 'user'
  uploadResult: ToolsetUploadCompleteResponse
}>()

const emits = defineEmits<{
  onClose: []
}>()

const formData = reactive({
  toolsetId: props.toolsetId,
  salt: props.uploadResult.salt,
  content: '',
  size: props.uploadResult.filesize
    ? formatFileSize(props.uploadResult.filesize)
    : '',
  code: '',
  password: '',
  note: ''
})
const isLoading = ref(false)

const submitLink = async () => {
  console.log(formData)

  const result = useSchemaValidator(createToolsetResourceSchema, formData)
  if (!result) {
    return
  }

  isLoading.value = true
  const ok = await $fetch(`/api/toolset/${props.toolsetId}/resource`, {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isLoading.value = false

  if (ok) {
    useMessage('资源发布成功', 'success')
    emits('onClose')
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunInput
      placeholder="大小 (如 1007MB, 0721GB)"
      :disabled="props.type === 's3'"
      v-model="formData.size"
    />
    <KunInput
      v-if="props.type === 'user'"
      placeholder="提取码 (可选)"
      v-model="formData.code"
    />
    <KunInput placeholder="解压密码 (可选)" v-model="formData.password" />
    <KunTextarea
      placeholder="备注 (建议写明您提供的资源的使用注意事项等)"
      v-model="formData.note"
    />
    <KunTextarea
      v-if="props.type === 'user'"
      placeholder="资源链接 (如果您的自定义链接有多个, 请使用英文逗号分隔每个链接)"
      v-model="formData.content"
    />
    <div class="flex justify-end gap-2">
      <KunButton variant="light" color="danger" @click="emits('onClose')">
        取消
      </KunButton>
      <KunButton :loading="isLoading" :disabled="isLoading" @click="submitLink">
        提交链接
      </KunButton>
    </div>
  </div>
</template>
