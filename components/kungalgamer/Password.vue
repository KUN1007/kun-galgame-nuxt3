<script setup lang="ts">
import {
  checkSendCode,
  checkResetEmail,
  checkChangePassword
} from './utils/check'

const localePath = useLocalePath()
const hasSentCodeEmail = ref('')

const { data, refresh } = await useFetch('/api/user/email', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const input = reactive({
  newEmail: '',
  code: '',
  oldPassword: '',
  newPassword: '',
  repeatPassword: ''
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

  const res = await useComponentMessageStore().alert({
    'en-us': 'Are you sure you want to change the password?',
    'ja-jp': 'パスワードを変更してもよろしいですか？',
    'zh-cn': '确定更改密码吗?',
    'zh-tw': '確定更改密碼嗎？'
  })
  if (!res) {
    return
  }

  const result = await $fetch('/api/user/password', {
    method: 'PUT',
    body: { oldPassword: input.oldPassword, newPassword: input.newPassword },
    ...kungalgameResponseHandler
  })

  if (result) {
    usePersistUserStore().$reset()
    navigateTo(localePath('/login'))
    useMessage(10121, 'success')
  }
}
</script>

<template>
  <form class="email" @submit.prevent>
    <div class="title">{{ $t('user.email.email') }}:</div>

    <div class="current-email">{{ $t('user.email.current') }}: {{ data }}</div>

    <div class="input">
      <label for="email">{{ $t('user.email.newEmail') }}: </label>
      <input id="email" v-model="input.newEmail" type="text" />
    </div>

    <div class="input">
      <label for="code">{{ $t('user.email.code') }}: </label>
      <input id="code" v-model="input.code" type="text" />
    </div>

    <div class="btn">
      <button @click="handleSendCode" v-if="!hasSentCodeEmail">
        {{ $t('user.email.send') }}
      </button>
      <button @click="handleResetEmail">
        {{ $t('user.email.confirmEmail') }}
      </button>
    </div>
  </form>

  <form class="password" @submit.prevent>
    <div class="title">{{ $t('user.email.pwd') }}:</div>
    <input autocomplete="username" type="text" hidden />

    <div class="input">
      <label for="old-password">{{ $t('user.email.oldPwd') }}: </label>
      <input
        id="old-password"
        autocomplete="current-password"
        v-model="input.oldPassword"
        type="password"
      />
    </div>

    <div class="input">
      <label for="new-password">{{ $t('user.email.newPwd') }}: </label>
      <input
        id="new-password"
        autocomplete="new-password"
        v-model="input.newPassword"
        type="password"
      />
    </div>

    <div class="input">
      <label for="repeat-password">{{ $t('user.email.rePwd') }}: </label>
      <input
        id="repeat-password"
        autocomplete="new-password"
        v-model="input.repeatPassword"
        type="password"
      />
    </div>

    <div class="btn">
      <button @click="handleChangePassword">
        {{ $t('user.email.confirmPwd') }}
      </button>
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
    border: 1px solid var(--kungalgame-blue-5);
    background-color: transparent;
    color: var(--kungalgame-font-color-3);

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
    border: 1px solid var(--kungalgame-blue-5);
    background-color: transparent;
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    transition: all 0.2s;

    &:hover {
      background-color: var(--kungalgame-blue-5);
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
    label {
      margin-right: 5px;
    }
  }
}
</style>
