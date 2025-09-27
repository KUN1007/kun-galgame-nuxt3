<script setup lang="ts">
import { createToolsetResourceSchema } from '~/validations/toolset'
import type {
  ToolsetUploadCompleteResponse,
  ToolsetResource
} from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
  type: 's3' | 'user'
  uploadResult: ToolsetUploadCompleteResponse
}>()

const emits = defineEmits<{
  onClose: []
  onSuccess: [ToolsetResource]
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

watch(
  () => props.uploadResult,
  () => {
    formData.salt = props.uploadResult.salt
    formData.size = formatFileSize(props.uploadResult.filesize)
  }
)

const submitLink = async () => {
  const result = useKunSchemaValidator(createToolsetResourceSchema, formData)
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

  if (typeof ok === 'string') {
    useMessage(ok, 'warn')
  } else {
    useMessage('资源发布成功', 'success')
    emits('onSuccess', ok)
    emits('onClose')
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunInput
      :placeholder="
        props.type === 'user'
          ? '大小 (如 520KB, 1007MB, 0721GB)'
          : '确认上传完成后, 自动生成文件大小'
      "
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
