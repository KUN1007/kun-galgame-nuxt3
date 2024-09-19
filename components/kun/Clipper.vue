<script setup lang="ts">
import { croppingBoxStyle, handleMouseDown, handleCrop } from './utils/clip'

const { imageBlob, isShowClipper } = storeToRefs(useComponentClipStore())

const emits = defineEmits<{
  close: []
}>()

const imageSrc = computed(() =>
  imageBlob.value ? URL.createObjectURL(imageBlob.value) : ''
)

const handleClose = () => {
  isShowClipper.value = false
  useComponentClipStore().handleClose()
}

const handleConfirmClipImage = async () => {
  if (imageBlob.value) {
    const clippedImageBlob = await handleCrop(imageBlob.value)
    useComponentClipStore().handleConfirm(clippedImageBlob)
    isShowClipper.value = false
  } else {
    useMessage('Invalid image data', '错误的图片数据', 'warn')
  }
}
</script>

<template>
  <Teleport to="body" :disabled="isShowClipper">
    <Transition name="alert">
      <div v-if="isShowClipper" class="mask">
        <div class="kun-clipper">
          <div
            class="image-container"
            @mousedown="handleMouseDown($event)"
            @touchstart.passive="handleMouseDown($event)"
          >
            <img v-if="imageBlob" :src="imageSrc" class="kun-clip-preview" />

            <div :style="croppingBoxStyle" class="cropping-box">
              <div
                class="handle top-left"
                @mousedown.stop="handleMouseDown($event, 'top-left')"
                @touchstart.stop.passive="handleMouseDown($event, 'top-left')"
              />
              <div
                class="handle top-right"
                @mousedown.stop="handleMouseDown($event, 'top-right')"
                @touchstart.stop.passive="handleMouseDown($event, 'top-right')"
              />
              <div
                class="handle bottom-left"
                @mousedown.stop="handleMouseDown($event, 'bottom-left')"
                @touchstart.stop.passive="
                  handleMouseDown($event, 'bottom-left')
                "
              />
              <div
                class="handle bottom-right"
                @mousedown.stop="handleMouseDown($event, 'bottom-right')"
                @touchstart.stop.passive="
                  handleMouseDown($event, 'bottom-right')
                "
              />
            </div>
          </div>

          <div class="footer">
            <button @click="handleClose">
              {{ $t('ComponentAlert.cancel') }}
            </button>
            <button @click="handleConfirmClipImage">
              {{ $t('ComponentAlert.confirm') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  display: flex;
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
}

.kun-clipper {
  margin: auto;
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 17px;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  @include kun-center;
  flex-direction: column;

  .image-container {
    display: flex;
    position: relative;

    img {
      user-select: none;
      margin: auto;
      max-width: 1280px;
      max-height: 720px;
    }
  }
}

.cropping-box {
  position: absolute;
  border: 2px solid var(--kungalgame-pink-3);
  background: var(--kungalgame-trans-pink-1);
  box-sizing: border-box;

  .handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: var(--kungalgame-pink-4);
  }

  .top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }

  .top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
  }

  .bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }

  .bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
  }
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  button {
    width: 70px;
    height: 30px;
    cursor: pointer;
    border-radius: 5px;

    &:nth-child(1) {
      background-color: transparent;
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
    }

    &:nth-child(2) {
      margin-left: 98px;
      background-color: transparent;
      border: 1px solid var(--kungalgame-red-5);
      color: var(--kungalgame-red-5);
    }

    &:active {
      transform: scale(0.9);
      transition: 0.1s;
    }
  }
}

@media (max-width: 700px) {
  .kun-clipper {
    .image-container {
      img {
        max-width: 300px;
        max-height: 400px;
      }
    }
  }
}

.alert-enter-from {
  opacity: 0;
}

.alert-leave-to {
  opacity: 0;
}

.alert-enter-from .container,
.alert-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
