<script setup lang="ts">
import { checkImageValid, resizeImage } from './utils/handleFileChange'

const props = defineProps<{
  width: string
  size: number
  aspect: number
  initialImage?: string
  hint?: string
}>()

const emits = defineEmits<{
  setImage: [img: Blob]
}>()

const input = ref<HTMLElement>()
const uploadedImage = ref<Blob>()
const selectedFileUrl = ref<string>('')
const initialImage = computed(() =>
  props.initialImage ? props.initialImage : ''
)

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

  emits('setImage', resizedFile)
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
    class="kun-upload"
    :style="{ width: props.width, 'aspect-ratio': props.aspect }"
    @drop="handleDrop($event)"
    @dragover="handleDragOver"
    @click="handleClickUpload"
  >
    <span class="plus" v-if="!selectedFileUrl && !initialImage"></span>
    <span class="hint" v-if="hint">{{ hint }}</span>
    <NuxtImg
      :style="{ 'max-width': `calc(${props.width} - 10px)` }"
      class="preview"
      :src="selectedFileUrl || initialImage"
      alt="Uploaded Image"
      v-if="selectedFileUrl || initialImage"
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
.kun-upload {
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    border: 1px solid var(--kungalgame-pink-3);

    .plus::before,
    .plus::after {
      background: var(--kungalgame-pink-3);
    }
  }

  .hint {
    width: 200px;
    position: absolute;
    color: var(--kungalgame-font-color-0);
    font-size: small;
    font-style: oblique;
    text-align: center;
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
