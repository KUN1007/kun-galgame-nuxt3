<script setup lang="ts">
import {
  MAX_SMALL_FILE_SIZE,
  MAX_LARGE_FILE_SIZE,
  USER_DAILY_UPLOAD_LIMIT
} from '~/config/upload'
import {
  initToolsetUploadSchema,
  completeToolsetUploadSchema,
  abortToolsetUploadSchema
} from '~/validations/toolset'
import {
  KUN_GALGAME_TOOLSET_UPLOAD_STATUS_MAP,
  type KUN_GALGAME_TOOLSET_UPLOAD_STATUS_CONST
} from '~/constants/toolset'
import type { ToolsetUploadCompleteResponse } from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
}>()

const emits = defineEmits<{
  onUploadSuccess: [ToolsetUploadCompleteResponse]
  onClose: []
}>()

const MB = 1024 * 1024

const { moemoepoint, dailyToolsetUploadCount } = storeToRefs(
  usePersistUserStore()
)
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)

const progress = ref(0)
const isDragging = ref(false)
const uploadStatus =
  ref<(typeof KUN_GALGAME_TOOLSET_UPLOAD_STATUS_CONST)[number]>('idle')

const isLarge = computed(() => {
  const f = selectedFile.value
  return !!f && f.size > MAX_SMALL_FILE_SIZE
})
const userUploadLimit = computed(
  () =>
    USER_DAILY_UPLOAD_LIMIT +
    moemoepoint.value * MB -
    dailyToolsetUploadCount.value
)

const statusMessage = computed(() => {
  if (uploadStatus.value === 'largeUploading') {
    return `正在上传大文件【进度 ${progress.value}%】`
  } else {
    return KUN_GALGAME_TOOLSET_UPLOAD_STATUS_MAP[uploadStatus.value]
  }
})

const checkFileValid = (file: File | null) => {
  if (!file) {
    return false
  }
  if (!isValidArchive(file.name || '')) {
    useMessage('我们仅支持 .7z, .zip, .rar 压缩格式上传', 'warn')
    return false
  }
  if (file.size > MAX_LARGE_FILE_SIZE) {
    useMessage(
      `文件大小超过最大文件限制 ${MAX_LARGE_FILE_SIZE / MB} MB`,
      'warn'
    )
    return false
  }
  if (file.size > userUploadLimit.value) {
    useMessage(
      `文件大小超过您的可用上传额度 ${(userUploadLimit.value / MB).toFixed(1)} MB`,
      'warn'
    )
    return false
  }
  return true
}

const pick = () => fileInput.value?.click()
const onChange = (e: Event) => {
  const t = e.target as HTMLInputElement
  const targetFile = t.files && t.files[0] ? t.files[0] : null
  const res = checkFileValid(targetFile)
  if (!res) {
    return
  }
  selectedFile.value = targetFile
}
const onDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
  const dt = e.dataTransfer
  if (dt?.files && dt.files.length > 0) {
    const res = checkFileValid(dt.files[0])
    if (!res) {
      return
    }
    selectedFile.value = dt.files[0]
  }
}
const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}
const onDragEnter = () => {
  isDragging.value = true
}
const onDragLeave = () => {
  isDragging.value = false
}
const clearSelected = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  uploadStatus.value = 'idle'
}

const uploadSmall = async (f: File) => {
  uploadStatus.value = 'smallInit'
  const initUploadData = {
    toolsetId: props.toolsetId,
    filename: f.name,
    filesize: f.size
  }
  const result = useKunSchemaValidator(initToolsetUploadSchema, initUploadData)
  if (!result) {
    return
  }

  const initRes = await $fetch(`/api/toolset/${props.toolsetId}/upload/small`, {
    method: 'POST',
    body: initUploadData,
    watch: false,
    ...kungalgameResponseHandler
  })
  if (!initRes) {
    uploadStatus.value = 'idle'
    return
  }

  try {
    uploadStatus.value = 'smallUploading'
    await fetch(initRes.url, {
      headers: { 'Content-Type': 'application/octet-stream' },
      method: 'PUT',
      body: f
    })

    uploadStatus.value = 'smallComplete'
    const completeUploadData = {
      salt: initRes.salt
    }
    const result = useKunSchemaValidator(
      completeToolsetUploadSchema,
      completeUploadData
    )
    if (!result) {
      return
    }
    const done = await $fetch(
      `/api/toolset/${props.toolsetId}/upload/complete`,
      {
        method: 'POST',
        body: completeUploadData,
        watch: false,
        ...kungalgameResponseHandler
      }
    )
    if (done) {
      useMessage('上传成功', 'success')
      emits('onUploadSuccess', done)
    }
  } finally {
    uploadStatus.value = 'complete'
  }
}

const uploadLarge = async (f: File) => {
  uploadStatus.value = 'largeInit'
  const initUploadData = {
    toolsetId: props.toolsetId,
    filename: f.name,
    filesize: f.size
  }
  const result = useKunSchemaValidator(initToolsetUploadSchema, initUploadData)
  if (!result) {
    return
  }

  progress.value = 0
  const initRes = await $fetch(`/api/toolset/${props.toolsetId}/upload/large`, {
    method: 'POST',
    body: initUploadData,
    watch: false,
    ...kungalgameResponseHandler
  })
  if (!initRes) {
    uploadStatus.value = 'idle'
    return
  }

  try {
    const partSize: number = initRes.partSize
    const urls: {
      partNumber: number
      url: string
    }[] = initRes.urls
    const parts: {
      PartNumber: number
      ETag: string
    }[] = []

    uploadStatus.value = 'largeUploading'
    for (let i = 0; i < urls.length; i++) {
      const { partNumber, url } = urls[i]
      const start = (partNumber - 1) * partSize
      const end = Math.min(start + partSize, f.size)
      const blob = f.slice(start, end)
      const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/octet-stream' },
        method: 'PUT',
        body: blob
      })
      const etag = resp.headers.get('ETag') || resp.headers.get('etag')
      if (!etag) {
        throw new Error('Missing ETag')
      }
      parts.push({ PartNumber: partNumber, ETag: etag })
      progress.value = Math.round(((i + 1) / urls.length) * 100)
    }

    uploadStatus.value = 'largeComplete'
    const completeUploadData = {
      salt: initRes.salt,
      uploadId: initRes.uploadId,
      parts
    }
    const result = useKunSchemaValidator(
      completeToolsetUploadSchema,
      completeUploadData
    )
    if (!result) {
      return
    }

    const done = await $fetch(
      `/api/toolset/${props.toolsetId}/upload/complete`,
      {
        method: 'POST',
        body: completeUploadData,
        watch: false,
        ...kungalgameResponseHandler
      }
    )
    if (done) {
      useMessage('上传成功', 'success')
      emits('onUploadSuccess', done)
    }
  } catch (e) {
    if (initRes?.uploadId) {
      const abortUploadData = {
        salt: initRes.salt,
        uploadId: initRes.uploadId
      }
      const result = useKunSchemaValidator(
        abortToolsetUploadSchema,
        abortUploadData
      )
      if (!result) {
        return
      }

      await $fetch(`/api/toolset/${props.toolsetId}/upload/abort`, {
        method: 'POST',
        body: abortUploadData,
        watch: false,
        ...kungalgameResponseHandler
      })
    }
  } finally {
    uploadStatus.value = 'complete'
  }
}

const submit = async () => {
  const f = selectedFile.value
  if (!f) {
    useMessage('请选择文件', 'warn')
    return
  }
  if (f.size > MAX_SMALL_FILE_SIZE) {
    await uploadLarge(f)
  } else {
    await uploadSmall(f)
  }
}
</script>

<template>
  <div class="space-y-4">
    <input ref="fileInput" type="file" hidden @change="onChange" />

    <KunCard :is-hoverable="false" :is-pressable="false" :is-transparent="true">
      <div
        class="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors"
        :class="
          cn(
            isDragging
              ? 'border-primary-500 bg-primary-50/50'
              : 'border-default-300 hover:border-default-500'
          )
        "
        @click="pick"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
      >
        <div v-if="!selectedFile" class="flex flex-col items-center gap-2">
          <KunIcon
            name="lucide:upload-cloud"
            class="text-default-500 text-3xl"
          />
          <div class="text-default-600">点击或拖拽文件到此处</div>
        </div>

        <div v-else class="flex flex-col justify-center gap-2">
          <div class="flex items-center gap-3">
            <KunIcon
              name="lucide:file-check"
              class="text-success-600 text-xl"
            />
            <div class="text-default-700 font-medium">
              {{ selectedFile?.name }}
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-default-500 text-xs">
              {{ formatFileSize(selectedFile!.size) }}
            </div>
            <span
              class="border-default-200 bg-default-100 text-default-600 rounded-full border px-2 py-0.5 text-xs"
            >
              {{
                isLarge
                  ? `文件大于 ${MAX_SMALL_FILE_SIZE / MB}MB, 分片上传`
                  : `文件小于 ${MAX_SMALL_FILE_SIZE / MB}MB, 直接上传`
              }}
            </span>
          </div>

          <KunProgress :value="progress" />

          <div
            class="text-default-500 flex items-center justify-center gap-2 text-sm"
          >
            <span>{{ statusMessage }}</span>
            <KunIcon
              class="text-sm"
              v-if="uploadStatus !== 'idle' && uploadStatus !== 'complete'"
              name="svg-spinners:90-ring-with-bg"
            />
            <KunIcon
              class="text-success-600 text-sm"
              v-if="uploadStatus === 'complete'"
              name="lucide:circle-check-big"
            />
          </div>
        </div>
      </div>
    </KunCard>

    <div class="flex items-center justify-end gap-2">
      <KunButton
        v-if="selectedFile"
        variant="light"
        color="danger"
        @click.stop="clearSelected"
      >
        移除文件
      </KunButton>
      <KunButton
        :loading="uploadStatus !== 'idle' && uploadStatus !== 'complete'"
        :disabled="!selectedFile || uploadStatus === 'complete'"
        @click="submit"
      >
        确认上传
      </KunButton>
    </div>
  </div>
</template>
