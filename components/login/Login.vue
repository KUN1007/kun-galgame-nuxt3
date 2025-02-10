<script setup lang="ts">
import { checkLoginForm } from './checkLogin'
import type { Pinia } from 'pinia'

const info = useComponentMessageStore()
const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useComponentMessageStore()
)

const loginForm = reactive({
  name: '',
  password: ''
})

const handleLogin = () => {
  const checkLogin = checkLoginForm.asyncData(useNuxtApp().$pinia as Pinia)
  const result = checkLogin(loginForm.name, loginForm.password)
  if (!result) {
    return
  }

  if (!isCaptureSuccessful.value) {
    isShowCapture.value = true
  }
}

watch(
  () => isCaptureSuccessful.value,
  async () => {
    if (!isCaptureSuccessful.value) {
      return
    }

    const userInfo = await $fetch('/api/user/login', {
      method: 'POST',
      body: loginForm,
      watch: false,
      ...kungalgameResponseHandler
    })
    if (userInfo) {
      info.info('AlertInfo.login.success')
      usePersistUserStore().setUserInfo(userInfo)
      navigateTo('/')
    }

    isCaptureSuccessful.value = false
  }
)
</script>

<template>
  <div class="login">
    <form class="form" @submit.prevent>
      <NuxtImg
        preload
        src="/placeholder.webp"
        placeholder="/placeholder.webp"
      />

      <div>
        <label for="username">
          {{ $t('login.email') }}
        </label>
        <KunInput
          id="username"
          v-model="loginForm.name"
          autocomplete="username"
          type="text"
        />
      </div>

      <div>
        <label for="password">
          {{ $t('login.password') }}
        </label>
        <KunInput
          id="password"
          v-model="loginForm.password"
          autocomplete="current-password"
          type="password"
        />
      </div>

      <KunButton @click="handleLogin" class="btn">
        {{ $t('login.title') }}
      </KunButton>
    </form>

    <KunDivider margin="16px 0">
      <span>{{ $t('login.or') }}</span>
    </KunDivider>

    <div class="more">
      <NuxtLink to="/register">
        {{ $t('register.title') }}
      </NuxtLink>

      <NuxtLink to="/forgot">
        {{ $t('login.forgot') }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 360px;
  padding: 32px;
  margin-bottom: 32px;
  user-select: none;
  @include kun-blur;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  img {
    width: 100%;
  }

  & > div {
    width: 100%;

    label {
      font-size: 14px;
    }
  }

  .kun-input {
    width: 100%;
    margin-bottom: 16px;
    margin-top: 8px;
    padding: 12px;
  }

  .kun-button {
    width: 100%;
    background-color: var(--kungalgame-blue-5);
    color: var(--kungalgame-white);
    font-size: 16px;
    border-radius: 24px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}

.kun-divider {
  span {
    margin: 0 8px;
  }
}

.more {
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 16px;
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
