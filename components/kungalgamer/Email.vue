<script setup lang="ts">
import { checkSendCode, checkResetEmail } from './utils/check'

const hasSentCodeEmail = ref('')

const { data, refresh } = await useFetch('/api/user/email', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const input = reactive({
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

  if (result) {
    useMessage(10119, 'success')
  }
}

const handleResetEmail = async () => {
  if (!checkResetEmail(hasSentCodeEmail.value, input.newEmail, input.code)) {
    return
  }

  const result = await $fetch('/api/user/email', {
    method: 'PUT',
    body: { email: input.newEmail, code: input.code },
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
  <form class="email" @submit.prevent>
    <div class="title">{{ $t('user.email.email') }}</div>

    <div class="current-email">
      {{ $t('user.email.current') }} -> {{ data }}
    </div>

    <div class="input-container">
      <label for="email">{{ $t('user.email.newEmail') }}</label>
      <KunInput id="email" v-model="input.newEmail" type="text" />
    </div>

    <div class="input-container">
      <label for="code">{{ $t('user.email.code') }}</label>
      <KunInput id="code" v-model="input.code" type="text" />
    </div>

    <div class="btn">
      <KunButton @click="handleSendCode" v-if="!hasSentCodeEmail">
        {{ $t('user.email.send') }}
      </KunButton>
      <KunButton @click="handleResetEmail">
        {{ $t('user.email.confirmEmail') }}
      </KunButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.email {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 36px;
}

.current-email {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.input-container {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
  }

  .kun-input {
    margin-top: 8px;
  }
}

.btn {
  display: flex;
  justify-content: space-around;
}
</style>
