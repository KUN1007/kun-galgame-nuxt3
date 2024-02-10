<script setup lang="ts">
import { registerFormItem } from './utils/registerFormItem'
import { checkRegisterForm } from './utils/checkRegister'

const info = useTempMessageStore()
const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useTempMessageStore()
)

const { checkForm, checkRegister } = checkRegisterForm.asyncData(
  useNuxtApp().$pinia
)

const router = useRouter()
const isSendCode = ref(false)

const registerForm = reactive<Record<string, string>>({
  name: '',
  email: '',
  password: '',
  code: '',
})

const handleSendCode = () => {
  if (
    !checkForm(registerForm.name, registerForm.email, registerForm.password)
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
  if (!checkRegister(isSendCode.value, registerForm.code)) {
    return
  }

  const { data } = await useFetch('/api/user/register', {
    method: 'POST',
    body: registerForm,
    watch: false,
    onResponse({ request, response, options }) {
      console.log(response)
    },
  })

  if (data.value) {
    info.info('AlertInfo.login.success')
    useMessage('Register successfully!', '注册成功！', 'success')
    useKUNGalgameUserStore().setUserInfo(data.value)
    router.push('/')
  }
}
</script>

<template>
  <div class="register">
    <LoginSettings />

    <div class="form">
      <h2 class="title">{{ $t('login.register.title') }}</h2>

      <div class="container" v-for="item in registerFormItem" :key="item.index">
        <input
          v-model="registerForm[item.value]"
          :type="item.type"
          :placeholder="`${$t(`login.register.${item.placeholder}`)}`"
          :class="item.class"
        />
      </div>

      <KunVerificationCode
        @click="handleSendCode"
        class="code"
        :name="registerForm.name"
        :email="registerForm.email"
        to="register"
      />

      <button @click="handleRegister" class="btn" type="submit">
        {{ $t('login.register.title') }}
      </button>

      <span class="user-agreement">
        {{ $t('login.register.click') }}
        <div class="licence">
          <NuxtLink to="/agreement">
            <span>{{ $t('login.register.agreement') }}</span>
          </NuxtLink>

          {{ $t('login.register.and') }}

          <NuxtLink to="/privacy">
            <span>{{ $t('login.register.privacy') }}</span>
          </NuxtLink>
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
    box-shadow:
      0 15px 27px var(--kungalgame-blue-0),
      0 10px 10px var(--kungalgame-blue-0);
  }

  .form {
    border-radius: 5px;
  }
}
</style>
