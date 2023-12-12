<script setup lang="ts">
import { checkEmail, checkCode, checkPassword } from './check'
import { useTempMessageStore } from '~/store/temp/message'

const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useTempMessageStore()
)

const input = reactive({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
})

const router = useRouter()
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

  const result = await useTempMessageStore().alert(
    'AlertInfo.code.password',
    true
  )
  if (!result) {
    return
  }

  const { data } = await useFetch('/api/auth/password/reset', {
    method: 'POST',
    body: input,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    router.push('/login')
    useMessage('Password change successfully!', '密码更改成功', 'success')
  }
}
</script>

<template>
  <Transition mode="out-in" name="slide">
    <div class="email" v-if="flag">
      <div class="input">
        <span>{{ $t('forgot.email') }}: </span>
        <input v-model="input.email" type="text" />
      </div>

      <div class="input">
        <span>{{ $t('forgot.code') }}: </span>
        <input v-model="input.code" type="text" />
      </div>
    </div>

    <div class="password" v-else-if="!flag">
      <div class="input">
        <span>{{ $t('forgot.new') }}: </span>
        <input v-model="input.newPassword" type="password" />
      </div>
      <div class="input">
        <span>{{ $t('forgot.rePwd') }}: </span>
        <input v-model="input.confirmPassword" type="password" />
      </div>
    </div>
  </Transition>

  <div class="btn">
    <KunVerificationCode
      v-if="flag"
      @click="handleClickSendCode"
      class="code"
      :email="input.email"
      :isSendCode="isSendCode"
      to="forgot"
    />

    <button v-if="flag" @click="handleClickNext">
      {{ $t('forgot.next') }}
    </button>

    <button v-if="!flag" @click="handleClickPrev">
      {{ $t('forgot.prev') }}
    </button>

    <button v-if="!flag" @click="handleChangePassword">
      {{ $t('forgot.confirm') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.email,
.password {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 50px;
}

.input {
  padding: 0 10px;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;

  input {
    border: none;
    color: var(--kungalgame-font-color-3);
    border-bottom: 1.5px solid var(--kungalgame-blue-1);
    background-color: var(--kungalgame-white);
    transition: all 0.2s;

    &:focus {
      border-bottom: 1.5px solid var(--kungalgame-blue-4);
    }
  }
}

.btn {
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    cursor: pointer;
    width: 110px;
    height: 33px;
    padding: 7px 10px;
    border: 1px solid var(--kungalgame-blue-4);
    border-radius: 5px;
    background-color: var(--kungalgame-white);
    margin: 10px;
    color: var(--kungalgame-blue-4);
  }
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
