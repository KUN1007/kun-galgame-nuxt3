<script setup lang="ts">
import { checkImageValid, resizeImage } from './utils/handleFileChange'

const refresh = inject<() => Promise<void>>('refresh')
const uploadedImage = ref<Blob>()
const selectedFileUrl = ref<string>('')
const input = ref<HTMLElement>()
const isUploading = ref(false)
const { avatar, avatarMin } = storeToRefs(useKUNGalgameUserStore())
const enableGravatar = ref(
  avatar.value.startsWith('https://www.gravatar.com/avatar')
)
const switchDisable = ref(false)

const uploadImage = async (file: File) => {
  const isFileValid = checkImageValid(file)
  if (!isFileValid) {
    return
  }
  const resizedFile = await resizeImage(file)
  uploadedImage.value = resizedFile
  selectedFileUrl.value = URL.createObjectURL(resizedFile)
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files || !input.files[0]) {
    return
  }

  const file = input.files[0]
  uploadImage(file)
}

const handleDrop = async (event: DragEvent) => {
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

const handleChangeAvatar = async () => {
  if (!uploadedImage.value) {
    return
  }

  const formData = new FormData()
  formData.append('avatar', uploadedImage.value, useKUNGalgameUserStore().name)

  isUploading.value = true
  useMessage('Uploading avatar image...', '正在上传头像图片...', 'info')

  const { data } = await useFetch('/api/user/avatar', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    avatar.value = data.value
    avatarMin.value = data.value.replace(/\.webp$/, '-100.webp')
    selectedFileUrl.value = ''
    useMessage('Update avatar successfully!', '更新头像成功', 'success')
    await refresh?.()
  }
}

watch(enableGravatar, async () => {
  switchDisable.value = true
  const { data } = await useFetch('/api/user/gravatar', {
    method: 'POST',
    body: {
      enable: enableGravatar.value,
    },
    watch: false,
    ...kungalgameResponseHandler,
  })

  const resAvatar = data.value
  if (enableGravatar.value) {
    if (resAvatar) {
      avatar.value = resAvatar + '?s=200'
      avatarMin.value = resAvatar + '?s=100'
      useMessage(
        'Enable gravatar successfully!',
        '启用 Gravatar 成功',
        'success'
      )
    }
  } else {
    if (resAvatar === '') {
      avatar.value = ''
      avatarMin.value = ''
      useMessage(
        'Disable gravatar successfully!',
        '关闭 Gravatar 成功',
        'success'
      )
    }
  }
  await refresh?.()
  switchDisable.value = false
})
</script>

<template>
  <div class="avatar">
    <div class="title">
      <span>{{ $t('user.settings.avatar') }}</span>
      <div class="gravatar">
        <a
          href="https://support.gravatar.com/basic/what-is-gravatar/"
          target="_blank"
          >{{ $t('user.settings.gravatar') }}</a
        >
        <KunSwitch :disabled="switchDisable" v-model="enableGravatar" />
      </div>
    </div>

    <div class="container">
      <div
        ref="upload"
        tabindex="0"
        class="avatar-upload"
        @drop="handleDrop($event)"
        @dragover="handleDragOver"
        @click="handleClickUpload"
      >
        <span class="plus" v-if="!selectedFileUrl"></span>
        <NuxtImg
          class="avatar-preview"
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

      <div class="help">
        <div class="hint">
          <span>{{ $t('user.settings.drag') }}</span>
          <span>{{ $t('user.settings.click') }}</span>
        </div>
        <div class="support">
          <span>{{ $t('user.settings.supportFormat') }}</span>
        </div>

        <button v-if="!isUploading" @click="handleChangeAvatar">
          {{ $t('user.settings.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  margin-bottom: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-right: 16px;

  .gravatar {
    display: flex;
    align-items: center;
    font-size: 12px;

    a {
      cursor: pointer;
      color: var(--kungalgame-blue-5);
    }
  }
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.avatar-upload {
  width: 150px;
  height: 150px;
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

.avatar-preview {
  max-width: 140px;
  max-height: 140px;
}

.help {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: small;

  button {
    cursor: pointer;
    padding: 5px 17px;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    transition: all 0.2s;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.hint {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.support {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 700px) {
  .help {
    padding: 0 10px;
  }
  .hint {
    display: none;
  }
}
</style>
