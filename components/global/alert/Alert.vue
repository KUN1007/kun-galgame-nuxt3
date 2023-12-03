<script setup lang="ts">
import { useTempMessageStore } from '@/store/temp/message'
import { storeToRefs } from 'pinia'

const { showAlert, alertMsg, isShowCancel } = storeToRefs(useTempMessageStore())

const handleClose = () => {
  showAlert.value = false
  useTempMessageStore().handleClose()
}

const handleConfirm = () => {
  showAlert.value = false
  useTempMessageStore().handleConfirm()
}
</script>

<template>
  <Teleport to="body" :disabled="showAlert">
    <Transition name="alert">
      <div v-if="showAlert" class="mask">
        <div class="container">
          <div class="header">
            <h3>{{ $t(`${alertMsg}`) }}</h3>
          </div>

          <div class="footer">
            <button v-if="isShowCancel" class="button" @click="handleClose">
              {{ $tm('ComponentAlert.cancel') }}
            </button>
            <button class="button" @click="handleConfirm">
              {{ $tm('ComponentAlert.confirm') }}
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

.container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.button {
  width: 70px;
  height: 30px;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
  border-radius: 2px;
  &:nth-child(1) {
    background-color: var(--kungalgame-trans-blue-1);
    border: 1px solid var(--kungalgame-blue-4);
  }
  &:nth-child(2) {
    margin-left: 98px;
    background-color: var(--kungalgame-trans-red-1);
    border: 1px solid var(--kungalgame-red-4);
  }
  &:active {
    transform: scale(0.9);
    transition: 0.1s;
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
