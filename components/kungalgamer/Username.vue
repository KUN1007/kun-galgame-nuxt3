<script setup lang="ts">
const message = useComponentMessageStore()

const refresh = inject<() => Promise<void>>('refresh')
const inputValue = ref('')

const handleChangeUsername = async () => {
  if (!isValidName(inputValue.value)) {
    useMessage(10122, 'warn')
    return
  }

  const res = await message.alert({
    'en-us':
      'Are you sure you want to change your username? This will cost you 17 moemoepoints.',
    'ja-jp':
      'ユーザー名を変更してもよろしいですか？これには 17 萌萌ポイントが必要です。',
    'zh-cn': '您确定更改用户名吗？这将会消耗您 17 萌萌点',
    'zh-tw': '您確定要更改用戶名嗎？這將會消耗您 17 萌萌點'
  })
  if (!res) {
    return
  }

  useMessage(10123, 'info')
  const result = await $fetch('/api/user/username', {
    method: 'PUT',
    watch: false,
    body: { username: inputValue.value },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(10124, 'success')
    await refresh?.()
  }
}
</script>

<template>
  <div class="username">
    <div class="title">{{ $t('user.settings.username') }}</div>
    <p>{{ $t('user.settings.usernameHint') }}</p>
    <KunInput type="text" v-model="inputValue" />
    <KunButton @click="handleChangeUsername">
      {{ $t('user.settings.confirm') }}
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin: 10px 0;
  font-size: 13px;
}

input {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
