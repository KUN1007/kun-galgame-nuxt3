<script setup lang="ts">
import {
  checkSendCode,
  checkResetEmail,
  checkChangePassword,
} from './utils/check'

const router = useRouter()
const email = ref('')
const hasSentCodeEmail = ref('')

const input = reactive({
  newEmail: '',
  code: '',
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})

const handleSendCode = async () => {
  if (!checkSendCode(input.newEmail)) {
    return
  }

  hasSentCodeEmail.value = input.newEmail
  useMessage(
    'The email verification code is being sent ~~~',
    '邮箱验证码正在发送 ~~~',
    'info'
  )

  const { data } = await useFetch('/api/auth/email/code/forgot', {
    method: 'POST',
    body: { email: input.newEmail },
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    useMessage(
      'Reset email verification code sent successfully!',
      '重置邮箱验证码发送成功！',
      'success'
    )
  }
}

const handleResetEmail = async () => {
  if (!checkResetEmail(hasSentCodeEmail.value, input.newEmail, input.code)) {
    return
  }

  const { data } = await useFetch('/api/user/email', {
    method: 'PUT',
    body: { email: input.newEmail, code: input.code },
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    input.newEmail = ''
    input.code = ''
    useMessage('Email change successful!', '邮箱更改成功', 'success')
  }
}

const handleChangePassword = async () => {
  if (
    !checkChangePassword(
      input.oldPassword,
      input.newPassword,
      input.repeatPassword
    )
  ) {
    return
  }

  const result = await useTempMessageStore().alert(
    'AlertInfo.code.password',
    true
  )
  if (!result) {
    return
  }

  const { data } = await useFetch('/api/user/password', {
    method: 'PUT',
    body: { oldPassword: input.oldPassword, newPassword: input.newPassword },
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    // TODO:
    // kungalgameStoreReset()
    router.push('/login')
    useMessage('Password change successful!', '密码更改成功', 'success')
  }
}

const { data } = await useFetch('/api/user/email', {
  method: 'GET',
  onResponse({ request, response, options }) {
    if (response.status === 233) {
      kungalgameErrorHandler(response.statusText)
      return
    }
  },
})

email.value = data.value ? data.value : ''
</script>

<template>
  <div class="email">
    <div class="title">{{ $t('user.email.email') }}:</div>

    <div class="current-email">{{ $t('user.email.current') }}: {{ email }}</div>

    <div class="input">
      <span>{{ $t('user.email.newEmail') }}: </span>
      <input v-model="input.newEmail" type="text" />
    </div>

    <div class="input">
      <span>{{ $t('user.email.code') }}: </span>
      <input v-model="input.code" type="text" />
    </div>

    <div class="btn">
      <button @click="handleSendCode" v-if="!hasSentCodeEmail">
        {{ $t('user.email.send') }}
      </button>
      <button @click="handleResetEmail">
        {{ $t('user.email.confirmEmail') }}
      </button>
    </div>
  </div>

  <div class="password">
    <div class="title">{{ $t('user.email.pwd') }}:</div>

    <div class="input">
      <span>{{ $t('user.email.oldPwd') }}: </span>
      <input v-model="input.oldPassword" type="password" />
    </div>

    <div class="input">
      <span>{{ $t('user.email.newPwd') }}: </span>
      <input v-model="input.newPassword" type="password" />
    </div>

    <div class="input">
      <span>{{ $t('user.email.rePwd') }}: </span>
      <input v-model="input.repeatPassword" type="password" />
    </div>

    <div class="btn">
      <button @click="handleChangePassword">
        {{ $t('user.email.confirmPwd') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.email {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 10px;
}

.current-email {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.input {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  input {
    height: 25px;
    padding-left: 5px;
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-white-9);

    &:focus {
      background-color: var(--kungalgame-trans-blue-0);
    }
  }
}

.btn {
  display: flex;
  justify-content: space-around;

  button {
    cursor: pointer;
    padding: 5px 17px;
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    color: var(--kungalgame-blue-4);
    transition: all 0.2s;

    &:hover {
      background-color: var(--kungalgame-blue-4);
      color: var(--kungalgame-white);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.password {
  margin-bottom: 20px;
}

@media (max-width: 700px) {
  .title {
    font-size: medium;
  }

  .input {
    padding: 0;
    span {
      margin-right: 5px;
    }
  }
}
</style>
