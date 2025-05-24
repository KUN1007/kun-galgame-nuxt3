<script setup lang="ts">
import { checkSendCode, checkResetEmail } from '../utils/check'

const hasSentCodeEmail = ref('')

const { data, refresh } = await useFetch('/api/user/email', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const input = reactive({
  codeSalt: '',
  newEmail: '',
  code: ''
})

const handleSendCode = async () => {
  if (!checkSendCode(input.newEmail)) {
    return
  }

  hasSentCodeEmail.value = input.newEmail
  useMessage(10118, 'info')

  const result = await $fetch('/api/auth/email/code/reset', {
    method: 'POST',
    body: { email: input.newEmail },
    ...kungalgameResponseHandler
  })

  if (result.length === 64) {
    input.codeSalt = result
    useMessage(10119, 'success')
  }
}

const handleResetEmail = async () => {
  if (!checkResetEmail(hasSentCodeEmail.value, input.newEmail, input.code)) {
    return
  }

  const result = await $fetch('/api/user/email', {
    method: 'PUT',
    body: { codeSalt: input.codeSalt, email: input.newEmail, code: input.code },
    ...kungalgameResponseHandler
  })

  if (result) {
    input.newEmail = ''
    input.code = ''
    useMessage(10120, 'success')
    refresh()
  }
}
</script>

<template>
  <div class="space-y-6">
    <KunHeader
      name="更改邮箱"
      :description="`您当前的邮箱是 ${data}, 更改邮箱需要给您的新邮箱发送验证码`"
    />

    <KunCard :is-hoverable="false">
      <form class="space-y-3" @submit.prevent>
        <div class="space-y-2">
          <span>请输入您的新邮箱</span>
          <KunInput v-model="input.newEmail" type="text" />
        </div>

        <div class="space-y-2">
          <span>请输入您的验证码</span>
          <KunInput v-model="input.code" type="text" />
        </div>

        <div class="flex justify-end gap-1">
          <KunButton @click="handleSendCode" v-if="!hasSentCodeEmail">
            发送验证码
          </KunButton>
          <KunButton v-if="hasSentCodeEmail" @click="handleResetEmail">
            确定更改邮箱
          </KunButton>
        </div>
      </form>
    </KunCard>
  </div>
</template>
