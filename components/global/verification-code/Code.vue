<script setup lang="ts">
import { ref, watch } from 'vue'

import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'
import { useTempMessageStore } from '@/store/temp/message'
import { storeToRefs } from 'pinia'

// The parent component instructs it to send the verification code, and it will do so.
const props = defineProps<{
  email: string
}>()

const { isCaptureSuccessful } = storeToRefs(useTempMessageStore())
const info = useTempMessageStore()

const isSendCode = ref(false)
const isSending = ref(false)
const countdown = ref(0)

watch(
  () => isSendCode.value,
  async () => {
    if (!isSending.value) {
      isSending.value = true
      countdown.value = 30

      const countdownInterval = setInterval(() => {
        countdown.value -= 1
        if (countdown.value === 0) {
          clearInterval(countdownInterval)
          isSending.value = false
        }
      }, 1000)

      // Send the verification code
      await useKUNGalgameUserStore().sendCode(props.email)

      info.info('AlertInfo.code.code')
    }
  }
)

const handleSendCode = () => {
  if (isCaptureSuccessful.value) {
    isSendCode.value = !isSendCode.value
  }
}
</script>

<template>
  <button @click="handleSendCode" :disabled="isSending">
    {{ isSending ? countdown : $tm('login.register.send') }}
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 90px;
  height: 30px;
  border: none;
  background-color: var(--kungalgame-trans-white-9);
  cursor: pointer;
  color: var(--kungalgame-font-color-1);
  &:hover {
    color: var(--kungalgame-blue-4);
  }
}
</style>
