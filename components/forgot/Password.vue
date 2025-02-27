<script setup lang="ts">
import { checkEmail, checkCode, checkPassword } from './check'

const { isShowCapture, isCaptureSuccessful } = storeToRefs(
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
    body: input,
    ...kungalgameResponseHandler
  })

  if (data) {
    navigateTo('/login')
    useMessage(10101, 'success')
  }
}
</script>

<template>
  <Transition mode="out-in" name="slide">
    <form class="email" v-if="flag" @submit.prevent>
      <div class="input-container">
        <label for="email">您的邮箱</label>
        <KunInput
          id="email"
          v-model="input.email"
          autocomplete="email"
          type="text"
        />
      </div>

      <div class="input-container">
        <label for="code">验证码</label>
        <KunInput id="code" v-model="input.code" type="text" />
      </div>
    </form>

    <form class="password" v-else-if="!flag" @submit.prevent>
      <input autocomplete="username" type="text" hidden />

      <div class="input-container">
        <label for="new-password">新密码</label>
        <KunInput
          id="new-password"
          v-model="input.newPassword"
          autocomplete="new-password"
          type="password"
        />
      </div>
      <div class="input-container">
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

  <div class="btn">
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

    <KunButton v-if="!flag" @click="handleChangePassword">确定更改</KunButton>
  </div>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 50px;
}

.input-container {
  padding: 0 10px;
  margin-bottom: 30px;
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
  align-items: center;
}

.slide-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
