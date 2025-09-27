<script setup lang="ts">
import type {
  ToolsetUploadCompleteResponse,
  ToolsetResource
} from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
}>()

const emits = defineEmits<{
  onClose: []
  onSuccess: [ToolsetResource]
}>()

const mode = ref<'s3' | 'user'>('s3')
const uploadResult = ref<ToolsetUploadCompleteResponse>({
  salt: '',
  key: '',
  filesize: 0
})
</script>

<template>
  <div class="z-10 space-y-4">
    <div class="flex items-center gap-6">
      <KunCheckBox
        type="single"
        :model-value="mode === 's3'"
        label="对象存储 (S3)"
        @change="() => (mode = 's3')"
      />
      <KunCheckBox
        type="single"
        :model-value="mode === 'user'"
        label="自定义链接"
        @change="() => (mode = 'user')"
      />
    </div>

    <ToolsetResourceUpload
      v-if="mode === 's3'"
      :toolset-id="props.toolsetId"
      @on-close="emits('onClose')"
      @on-upload-success="(value) => (uploadResult = value)"
    />

    <ToolsetResourceLinkForm
      :toolset-id="props.toolsetId"
      :type="mode"
      :upload-result="uploadResult"
      @on-close="emits('onClose')"
      @on-success="(value) => emits('onSuccess', value)"
    />
  </div>
</template>
