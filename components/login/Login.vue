<script setup lang="ts">
import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'
import { useTempMessageStore } from '@/store/temp/message'
import { storeToRefs } from 'pinia'
import { isValidEmail, isValidName, isValidPassword } from '@/utils/validate'

const router = useRouter()

const info = useTempMessageStore()
const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useTempMessageStore()
)

const loginForm = reactive({
  name: '',
  password: '',
})

const checkUsername = (name: string) => {
  if (!name.trim()) {
    Message('Username cannot be empty', '用户名不可为空', 'warn')
    return false
  }

  if (!isValidName(name) && !isValidEmail(name)) {
    info.info('AlertInfo.login.invalidUsername')
    return false
  }

  return true
}

const checkPassword = (password: string) => {
  if (!password.trim()) {
    Message('Password cannot be empty', '密码不可为空', 'warn')
    return false
  }
  if (!isValidPassword(password)) {
    info.info('AlertInfo.login.invalidPassword')
    return false
  }

  return true
}

const checkLogin = (
  name: string,
  password: string,
  isCaptureSuccessful: boolean
) => {
  if (!checkUsername(name) || !checkPassword(password)) {
    return false
  }

  if (!isCaptureSuccessful) {
    Message(
      'Please click above to complete the human verification',
      '请点击上方完成人机身份验证',
      'warn'
    )
    return false
  }

  return true
}

const handleLogin = async () => {
  const result = checkLogin(
    loginForm.name,
    loginForm.password,
    isCaptureSuccessful.value
  )

  if (!result) {
    return
  }

  const res = await useKUNGalgameUserStore().login(loginForm)
  console.log(res)

  // if (res.code === 200) {
  //   info.info('AlertInfo.login.success')
  //   router.push('/')
  // }
}

const handleClickForgotPassword = () => {
  // router.push('/forgot')
}
</script>

<template>
  <!-- Login -->
  <div class="login">
    <!-- Settings -->
    <LoginSettings />
    <div class="form">
      <h2 class="title">{{ $tm('login.login.loginTitle') }}</h2>
      <input
        v-model="loginForm.name"
        type="text"
        :placeholder="($tm('login.login.loginUsername') as string)"
        class="input"
      />
      <input
        v-model="loginForm.password"
        type="password"
        :placeholder="($tm('login.login.loginPassword') as string)"
        class="input"
      />

      <!-- Forgot Password -->
      <span @click="handleClickForgotPassword" class="forget">
        {{ $tm('login.login.forget') }}
      </span>

      <!-- Human Verification -->
      <span @click="isShowCapture = true" class="capture">
        {{ $tm('login.login.capture') }}
      </span>

      <!-- Click to Login -->
      <button @click="handleLogin" class="btn" type="submit">
        {{ $tm('login.login.loginTitle') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  z-index: 2;
  transition: all 0.6s ease-in-out;
}

/* Form styling */
.form {
  background-color: var(--kungalgame-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

/* Login and Register Fonts */
.title {
  font-weight: 300;
  font-weight: bold;
  margin: 20px;
  color: var(--kungalgame-font-color-2);
}

.input {
  border: none;
  outline: none;
  border-bottom: 1.5px solid var(--kungalgame-blue-0);
  padding: 15px;
  margin: 7px 0;
  width: 100%;
  background-color: var(--kungalgame-white);
  color: var(--kungalgame-font-color-3);

  &:focus {
    border-bottom: 1.5px solid var(--kungalgame-blue-4);
    transition: 0.2s linear;
  }
}

/* Forgot Password */
.forget {
  cursor: pointer;
  text-decoration: none;
  font-size: small;
  color: var(--kungalgame-blue-4);
  margin: 20px 0;
}

.capture {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
  font-size: 15px;
}

.btn {
  width: 150px;
  position: absolute;
  bottom: 10%;
  border-radius: 50px;
  background-color: var(--kungalgame-trans-white-5);
  border: 1px solid var(--kungalgame-blue-4);
  color: var(--kungalgame-blue-4);
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 2px;
  padding: 7px 0px;
  text-transform: uppercase;
  transition: all 0.2s;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: var(--kungalgame-blue-4);
    color: var(--kungalgame-white);
  }

  &:active {
    transform: scale(0.95);
  }
}

@media (max-width: 700px) {
  .login {
    width: 90%;
    transition: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 0 15px 27px var(--kungalgame-blue-0),
      0 10px 10px var(--kungalgame-blue-0);
  }

  .form {
    border-radius: 5px;
  }
}
</style>
