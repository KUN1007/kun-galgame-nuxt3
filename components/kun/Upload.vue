<script setup lang="ts">
import { checkImageValid, resizeImage } from './utils/handleFileChange'

const props = defineProps<{
  width: string
  size: number
  aspect: number
}>()

const uploadedImage = ref<Blob>()
const selectedFileUrl = ref<string>('')
const input = ref<HTMLElement>()

const uploadImage = async (file: File) => {
  const isFileValid = checkImageValid(file)
  if (!isFileValid) {
    return
  }

  const resizedFile = await resizeImage(
    file,
    props.size,
    props.size / props.aspect
  )
  uploadedImage.value = resizedFile
  selectedFileUrl.value = URL.createObjectURL(resizedFile)
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files || !input.files[0]) {
    return
  }

  const file = input.files[0]
  uploadImage(file)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const dataTransfer = event.dataTransfer
  if (dataTransfer && dataTransfer.files.length > 0) {
    const file = dataTransfer.files[0]
    uploadImage(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'copy'
}

const handleClickUpload = () => {
  input.value?.click()
}
</script>

<template>
  <div
    ref="upload"
    tabindex="0"
    class="upload"
    :style="{ width: props.width, 'aspect-ratio': props.aspect }"
    @drop="handleDrop($event)"
    @dragover="handleDragOver"
    @click="handleClickUpload"
  >
    <span class="plus" v-if="!selectedFileUrl"></span>
    <NuxtImg
      :style="{ 'max-width': `calc(${props.width} - 10px)` }"
      class="preview"
      :src="selectedFileUrl"
      alt="Uploaded Image"
      v-if="selectedFileUrl"
    />
    <input
      ref="input"
      hidden
      type="file"
      accept=".jpg, .jpeg, .png, .webp"
      @change="handleFileChange($event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.upload {
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border: 1px solid var(--kungalgame-pink-3);

    .plus::before,
    .plus::after {
      background: var(--kungalgame-pink-3);
    }
  }

  .plus {
    display: inline-block;
    position: relative;
  }

  .plus::before,
  .plus::after {
    transition: all 0.2s;
    content: '';
    position: absolute;
    background: var(--kungalgame-blue-5);
  }

  .plus::before {
    width: 20px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .plus::after {
    width: 2px;
    height: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.preview {
  max-width: 140px;
  max-height: 140px;
}
</style>
