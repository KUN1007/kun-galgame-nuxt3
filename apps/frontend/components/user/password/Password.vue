<script setup lang="ts">
import { checkChangePassword } from '../utils/check'

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
    useMessage(10121, 'success')
    await navigateTo('/login')
  }
}
</script>

<template>
  <div class="space-y-6">
    <KunHeader
      name="更改密码"
      description="您可以输入旧密码以重置您的新密码, 您在网站保存的密码将会被 Hash 为乱码存储, 密码自始至终只有您自己知道, 请放心更改"
    />

    <KunCard :is-hoverable="false">
      <form class="space-y-3" @submit.prevent>
        <input autocomplete="username" type="text" hidden />

        <div class="space-y-2">
          <span>请输入您的旧密码</span>
          <KunInput
            autocomplete="current-password"
            v-model="input.oldPassword"
            type="password"
          />
        </div>

        <div class="space-y-2">
          <span>请输入您的新密码</span>
          <KunInput
            autocomplete="new-password"
            v-model="input.newPassword"
            type="password"
          />
        </div>

        <div class="space-y-2">
          <span>请再次输入新密码</span>
          <KunInput
            autocomplete="new-password"
            v-model="input.repeatPassword"
            type="password"
          />
        </div>

        <div class="flex justify-end">
          <KunButton @click="handleChangePassword">确定更改密码</KunButton>
        </div>
      </form>

      <KunLink to="/forgot">忘记密码?</KunLink>
    </KunCard>
  </div>
</template>
