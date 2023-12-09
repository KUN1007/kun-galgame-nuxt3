<script setup lang="ts">
import { useTempMessageStore } from '@/store/temp/message'
import { registerFormItem } from './utils/registerFormItem'

// Using the message store
const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useTempMessageStore()
)

const info = useTempMessageStore()

// Current route
const router = useRouter()
const isSendCode = ref(false)

const registerForm = reactive<Record<string, string>>({
  name: '',
  email: '',
  password: '',
  code: '',
})

const checkRegisterForm = (
  name: string,
  email: string,
  password: string
): boolean => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    useMessage(
      'Username, email, password field cannot be empty!',
      '用户名，邮箱，密码字段不可为空！',
      'warn'
    )
    return false
  }

  if (!isValidName(name)) {
    info.info('AlertInfo.login.invalidUsername')
    return false
  }

  if (!isValidEmail(email)) {
    useMessage('Invalid email format!', '非法的邮箱格式！', 'warn')
    return false
  }

  if (!isValidPassword(password)) {
    info.info('AlertInfo.login.invalidPassword')
    return false
  }

  return true
}

const checkRegisterFormSubmit = (isSendCode: boolean, code: string) => {
  if (!isSendCode) {
    useMessage(
      'Need to send an email verification code',
      '需要发送邮箱验证码',
      'warn'
    )
    return false
  }

  if (!code.trim()) {
    useMessage(
      'Email verification code cannot be empty',
      '邮箱验证码不可为空',
      'warn'
    )
    return false
  }

  if (!isValidMailConfirmCode(code)) {
    info.info('AlertInfo.login.invalidCode')
    return false
  }

  return true
}

// Send verification code
const handleSendCode = () => {
  if (
    !checkRegisterForm(
      registerForm.name,
      registerForm.email,
      registerForm.password
    )
  ) {
    return
  }

  if (isCaptureSuccessful.value) {
    isSendCode.value = true
    isCaptureSuccessful.value = false
  } else {
    isSendCode.value = false
    isShowCapture.value = true
  }
}

const handleRegister = async () => {
  if (!checkRegisterFormSubmit(isSendCode.value, registerForm.code)) {
    return
  }

  // Execute registration logic, send a request, and validate the code on the backend
  // const res = await useKUNGalgameUserStore().register({
  //   name: registerForm.name,
  //   email: registerForm.email,
  //   password: registerForm.password,
  //   code: registerForm.code,
  // })

  // // If the request is successful, redirect to the main page
  // if (res.code === 200) {
  //   router.push('/')
  //   Message('Register successfully!', '注册成功！', 'success')
  //   info.info('AlertInfo.login.success')
  // } else {
  //   Message('Register failed!', '注册失败！', 'error')
  // }
}
</script>

<template>
  <div class="register">
    <LoginSettings />

    <div class="form">
      <h2 class="title">{{ $tm('login.register.title') }}</h2>

      <div class="container" v-for="item in registerFormItem" :key="item.index">
        <input
          v-model="registerForm[item.value]"
          :type="item.type"
          :placeholder="`${$tm(`login.register.${item.placeholder}`)}`"
          :class="item.class"
        />
      </div>

      <VerificationCode
        @click="handleSendCode"
        class="code"
        :email="registerForm.email"
      />

      <!-- Registration button -->
      <button @click="handleRegister" class="btn" type="submit">
        {{ $tm('login.register.title') }}
      </button>

      <!-- User agreement prompt, etc. -->
      <span class="user-agreement">
        {{ $tm('login.register.click') }}

        <!-- User agreement and privacy policy -->
        <div class="licence">
          <RouterLink to="/agreement">
            <span>{{ $tm('login.register.agreement') }}</span>
          </RouterLink>
          {{ $tm('login.register.and') }}
          <RouterLink to="/privacy">
            <span>{{ $tm('login.register.privacy') }}</span>
          </RouterLink>
        </div>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.title {
  font-weight: 300;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--kungalgame-font-color-2);
}

.container {
  width: 100%;
  position: relative;
}

.form {
  background-color: var(--kungalgame-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
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

.code {
  position: absolute;
  bottom: 120px;
  right: 50px;
}

/* User agreement */
.user-agreement {
  position: absolute;
  bottom: 3%;
  font-size: x-small;
  color: var(--kungalgame-font-color-1);
  text-decoration: none;

  span {
    color: var(--kungalgame-red-4);
    font-style: oblique;
  }

  .licence {
    display: flex;
    justify-content: center;
  }
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
  padding: 7px 0;
  text-transform: uppercase;
  transition: all 0.2s;
  margin-top: 30px;

  &:hover {
    background-color: var(--kungalgame-blue-4);
    color: var(--kungalgame-white);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
}

@media (max-width: 700px) {
  .register {
    width: 90%;
    transition: none;
    top: 0%;
    left: 5%;
    border-radius: 7px;
    box-shadow: 0 15px 27px var(--kungalgame-blue-0),
      0 10px 10px var(--kungalgame-blue-0);
  }

  .form {
    border-radius: 5px;
  }
}
</style>
./utils/checkRegisterForm
