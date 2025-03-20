<script setup lang="ts">
import { checkLogin } from './checkLogin'

const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useComponentMessageStore()
)

const loginForm = reactive({
  name: '',
  password: ''
})

const handleLogin = () => {
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
      usePersistUserStore().setUserInfo(userInfo)
      useKunLoliInfo(`登陆成功! 欢迎来到 ${kungal.name}`)
      navigateTo('/')
    }

    isCaptureSuccessful.value = false
  }
)
</script>

<template>
  <div class="flex size-full items-center justify-center">
    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      class-name="w-88 p-8 select-none"
    >
      <form
        class="flex h-full flex-col items-center justify-center"
        @submit.prevent
      >
        <NuxtImg
          preload
          src="/placeholder.webp"
          placeholder="/placeholder.webp"
          class="w-full"
        />

        <div class="w-full">
          <label for="username" class="text-sm">用户名或邮箱</label>
          <KunInput
            id="username"
            v-model="loginForm.name"
            autocomplete="username"
            type="text"
            class-name="mt-2 mb-4 w-full"
          />
        </div>

        <div class="w-full">
          <label for="password" class="text-sm">密码</label>
          <KunInput
            id="password"
            v-model="loginForm.password"
            autocomplete="current-password"
            type="password"
            class-name="mt-2 mb-4 w-full"
          />
        </div>

        <KunButton
          @click="handleLogin"
          class="bg-primary w-full rounded-3xl text-base tracking-wider text-white uppercase"
        >
          登录
        </KunButton>
      </form>

      <KunDivider class="my-4">
        <span class="mx-2">或</span>
      </KunDivider>

      <div class="flex flex-col">
        <NuxtLink
          to="/register"
          class="text-primary mb-4 underline underline-offset-[3px]"
        >
          注册
        </NuxtLink>

        <NuxtLink
          to="/forgot"
          class="text-primary mb-4 underline underline-offset-[3px]"
        >
          忘记密码?
        </NuxtLink>
      </div>
    </KunCard>
  </div>
</template>
