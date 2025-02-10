<script setup lang="ts">
import { checkChangePassword } from './utils/check'

const input = reactive({
  oldPassword: '',
  newPassword: '',
  repeatPassword: ''
})

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

  const res = await useComponentMessageStore().alert('确定更改密码吗?')
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
  <form class="password" @submit.prevent>
    <div class="title">{{ $t('user.email.pwd') }}</div>
    <input autocomplete="username" type="text" hidden />

    <div class="input-container">
      <label for="old-password">{{ $t('user.email.oldPwd') }}</label>
      <KunInput
        id="old-password"
        autocomplete="current-password"
        v-model="input.oldPassword"
        type="password"
      />
    </div>

    <div class="input-container">
      <label for="new-password">{{ $t('user.email.newPwd') }}</label>
      <KunInput
        id="new-password"
        autocomplete="new-password"
        v-model="input.newPassword"
        type="password"
      />
    </div>

    <div class="input-container">
      <label for="repeat-password">{{ $t('user.email.rePwd') }}</label>
      <KunInput
        id="repeat-password"
        autocomplete="new-password"
        v-model="input.repeatPassword"
        type="password"
      />
    </div>

    <div class="btn">
      <KunButton @click="handleChangePassword">
        {{ $t('user.email.confirmPwd') }}
      </KunButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 36px;
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

.password {
  margin-bottom: 16px;
}
</style>
