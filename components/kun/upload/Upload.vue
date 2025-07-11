<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import { checkImageValid, resizeImage } from './handleFileChange'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

const props = withDefaults(
  defineProps<{
    size: number
    aspect: number
    initialImage?: string
    hint?: string
    className?: string
  }>(),
  {
    initialImage: '',
    hint: '',
    className: ''
  }
)

const emits = defineEmits<{
  setImage: [img: Blob]
}>()

const input = ref<HTMLElement>()
const uploadedImage = ref<Blob>()
const selectedFileUrl = ref('')
const showCropper = ref(false)
const cropperImage = ref('')

const initialImage = computed(() => props.initialImage || '')

const uploadImage = async (file: File) => {
  const isFileValid = checkImageValid(file)
  if (!isFileValid) {
    return
  }

  cropperImage.value = URL.createObjectURL(file)
  showCropper.value = true
}

const handleCrop = async (cropData: { canvas: HTMLCanvasElement }) => {
  const canvas = cropData.canvas
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        }
      },
      'image/webp',
      0.77
    )
  })

  const resizedFile = await resizeImage(
    new File([blob], 'cropped.webp', { type: 'image/webp' }),
    props.size,
    props.size / props.aspect
  )

  uploadedImage.value = resizedFile
  selectedFileUrl.value = URL.createObjectURL(resizedFile)
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return
  uploadImage(input.files[0])
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  const dataTransfer = event.dataTransfer
  if (dataTransfer?.files.length) {
    uploadImage(dataTransfer.files[0])
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'copy'
}

const handleClickUpload = () => {
  input.value?.click()
}

const handleApplyCrop = () => {
  if (!uploadedImage.value) {
    return
  }
  showCropper.value = false
  emits('setImage', uploadedImage.value)
}
</script>

<template>
  <div>
    <div
      ref="upload"
      tabindex="0"
      :class="
        cn(
          'border-default-500 hover:border-default-700 relative cursor-pointer rounded-lg border-2 border-dashed transition-colors',
          className
        )
      "
      :style="{ 'aspect-ratio': props.aspect }"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @click="handleClickUpload"
    >
      <div
        v-if="!selectedFileUrl && !initialImage"
        class="absolute inset-0 flex flex-col items-center justify-center"
      >
        <KunIcon name="i-lucide-plus" class="text-default-500 text-3xl" />
        <span v-if="hint" class="text-default-500 mt-2 text-sm">
          {{ `${hint}` }}
        </span>
      </div>

      <img
        v-if="selectedFileUrl || initialImage"
        :src="selectedFileUrl || initialImage"
        alt="上传图片"
        class="h-full w-full rounded-lg object-cover"
      />

      <input
        ref="input"
        hidden
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        @change="handleFileChange"
      />
    </div>

    <KunModal
      :modal-value="showCropper"
      @update:modal-value="(value) => (showCropper = value)"
      :is-dismissable="false"
    >
      <div class="max-w-xl">
        <div class="mb-4">
          <h3 class="text-lg font-semibold">裁剪图片</h3>
        </div>

        <Cropper
          v-if="cropperImage"
          :src="cropperImage"
          :stencil-props="{ aspectRatio: props.aspect }"
          @change="handleCrop"
        />

        <div class="mt-4 flex justify-end space-x-2">
          <KunButton
            variant="light"
            color="danger"
            @click="showCropper = false"
          >
            取消
          </KunButton>
          <KunButton variant="solid" color="primary" @click="handleApplyCrop">
            确定
          </KunButton>
        </div>
      </div>
    </KunModal>
  </div>
</template>
