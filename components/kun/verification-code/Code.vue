<script setup lang="ts">
const props = defineProps<{
  to: 'register' | 'forgot'
  name?: string
  email: string
}>()

const { isCaptureSuccessful } = storeToRefs(useTempMessageStore())
const info = useTempMessageStore()

const isSendCode = ref(false)
const isSending = ref(false)
const countdown = ref(0)

const sendCode = async () => {
  const url =
    props.to === 'register'
      ? '/api/auth/email/code/register'
      : '/api/auth/email/code/forgot'
  const body =
    props.to === 'register'
      ? { email: props.email, name: props.name }
      : { email: props.email }

  const { data } = await useFetch(url, {
    method: 'POST',
    body: body,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })
  return data
}

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

      const data = await sendCode()

      if (data.value) {
        info.info('AlertInfo.code.code')
      } else {
        isSending.value = false
      }
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
    {{ isSending ? countdown : $t('login.register.send') }}
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
