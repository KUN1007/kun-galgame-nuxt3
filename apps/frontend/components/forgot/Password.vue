<script setup lang="ts">
import { checkEmail, checkCode, checkPassword } from './check'

const { isShowCapture, isCaptureSuccessful, codeSalt } = storeToRefs(
  useComponentMessageStore()
)

const input = reactive({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const flag = ref(true)
const isSendCode = ref(false)

const handleClickSendCode = () => {
  if (!checkEmail(input.email)) {
    return
  }

  if (!isCaptureSuccessful.value) {
    isShowCapture.value = true
    return
  }

  isSendCode.value = true
}

const handleClickNext = () => {
  if (!checkCode(input.email, input.code)) {
    return
  }
  flag.value = false
}

const handleClickPrev = () => {
  flag.value = true
}

const handleChangePassword = async () => {
  if (!checkPassword(input.newPassword, input.confirmPassword)) {
    return
  }

  const result = await useComponentMessageStore().alert('您确定更改密码吗?')
  if (!result) {
    return
  }

  const data = await $fetch('/api/auth/password/reset', {
    method: 'POST',
    body: { codeSalt: codeSalt.value, ...input },
    ...kungalgameResponseHandler
  })

  if (data) {
    codeSalt.value = ''
    useMessage(10101, 'success')
    await navigateTo('/login')
  }
}
</script>

<template>
  <div class="flex size-full items-center justify-center">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      class-name="w-88 p-8 select-none"
      content-class="space-y-6"
    >
      <div class="flex flex-col items-center justify-center space-y-3">
        <KunButton rounded="full" :is-icon-only="true" size="xl" variant="flat">
          <KunIcon name="lucide:lock" />
        </KunButton>
        <h2 class="text-xl">找回密码</h2>
      </div>

      <Transition mode="out-in" name="slide">
        <form class="space-y-6" v-if="flag" @submit.prevent>
          <div class="w-full">
            <label for="email">您的邮箱</label>
            <KunInput
              id="email"
              v-model="input.email"
              autocomplete="email"
              type="text"
            />
          </div>

          <div class="w-full">
            <label for="code">验证码</label>
            <KunInput id="code" v-model="input.code" type="text" />
          </div>
        </form>

        <form class="space-y-6" v-else-if="!flag" @submit.prevent>
          <input autocomplete="username" type="text" hidden />

          <div class="w-full">
            <label for="new-password">新密码</label>
            <KunInput
              id="new-password"
              v-model="input.newPassword"
              autocomplete="new-password"
              type="password"
            />
          </div>

          <div class="w-full">
            <label for="new-password">确认密码</label>
            <KunInput
              id="password"
              v-model="input.confirmPassword"
              autocomplete="new-password"
              type="password"
            />
          </div>
        </form>
      </Transition>

      <div class="flex justify-end gap-1">
        <KunVerificationCode
          v-if="flag"
          @click="handleClickSendCode"
          class="code"
          :email="input.email"
          :is-send-code="isSendCode"
          to="forgot"
        />

        <KunButton v-if="flag" @click="handleClickNext">下一步</KunButton>

        <KunButton v-if="!flag" @click="handleClickPrev">上一步</KunButton>

        <KunButton v-if="!flag" @click="handleChangePassword">
          确定更改
        </KunButton>
      </div>
    </KunCard>
  </div>
</template>
