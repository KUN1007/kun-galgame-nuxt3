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

const handleConfirmClipImage = () => {
  isShowClipper.value = false
  const imageBlob = handleCrop()
  useComponentClipStore().handleConfirm(imageBlob)
}
</script>

<template>
  <Teleport to="body" :disabled="isShowClipper">
    <Transition name="alert">
      <div v-if="isShowClipper" class="mask">
        <div class="kun-clipper">
          <div class="image-container" @mousedown="handleMouseDown($event)">
            <img
              v-if="imageBlob"
              ref="previewImage"
              :src="imageSrc"
              class="avatar-preview"
            />

            <div :style="croppingBoxStyle" class="cropping-box">
              <div
                class="handle top-left"
                @mousedown.stop="handleMouseDown($event, 'top-left')"
              />
              <div
                class="handle top-right"
                @mousedown.stop="handleMouseDown($event, 'top-right')"
              />
              <div
                class="handle bottom-left"
                @mousedown.stop="handleMouseDown($event, 'bottom-left')"
              />
              <div
                class="handle bottom-right"
                @mousedown.stop="handleMouseDown($event, 'bottom-right')"
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

.avatar-preview {
  max-width: 300px;
  max-height: 300px;
  position: relative;
}

.cropping-box {
  position: absolute;
  border: 2px solid var(--kungalgame-red-5);
  background: var(--kungalgame-trans-pink-2);
  box-sizing: border-box;

  .handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: var(--kungalgame-red-5);
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
    border-radius: 2px;

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
