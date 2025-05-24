<script setup lang="ts">
const props = defineProps<{
  to: 'register' | 'forgot'
  name?: string
  email: string
  className?: string
}>()

const { isCaptureSuccessful, codeSalt } = storeToRefs(
  useComponentMessageStore()
)

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

  const result = await $fetch(url, {
    method: 'POST',
    body,
    ...kungalgameResponseHandler
  })
  if (result.length === 64) {
    codeSalt.value = result
  }
  return result
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

      const result = await sendCode()

      if (result) {
        useKunLoliInfo('验证码发送成功')
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
  <KunButton
    size="xs"
    variant="light"
    color="default"
    @click="handleSendCode"
    :disabled="isSending"
    :class-name="className"
  >
    {{ isSending ? countdown : '发送验证码' }}
  </KunButton>
</template>
