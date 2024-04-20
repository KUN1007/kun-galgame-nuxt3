<script setup lang="ts">
const message = useTempMessageStore()

const refresh = inject<() => Promise<void>>('refresh')
const inputValue = ref('')

const handleChangeUsername = async () => {
  if (!isValidName(inputValue.value)) {
    useMessage('Please input valid username', '请输入合法的用户名', 'warn')
    return
  }

  const res = await message.alert({
    'en-us':
      'Are you sure you want to change your username? This will cost you 17 moemoepoints.',
    'ja-jp': '',
    'zh-cn': '您确定更改用户名吗？这将会消耗您 17 萌萌点'
  })
  if (!res) {
    return
  }

  useMessage('Changing username in progress...', '正在更改用户名...', 'info')
  const result = await $fetch('/api/user/username', {
    method: 'PUT',
    watch: false,
    body: { username: inputValue.value },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('Username update successfully', '用户名更新成功', 'success')
    await refresh?.()
  }
}
</script>

<template>
  <div class="username">
    <div class="title">{{ $t('user.settings.username') }}</div>
    <input type="text" v-model="inputValue" />
    <p>{{ $t('user.settings.usernameHint') }}</p>
    <button @click="handleChangeUsername">
      {{ $t('user.settings.confirm') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.username {
  input {
    margin-top: 10px;
    height: 25px;
    padding-left: 5px;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: transparent;
    color: var(--kungalgame-font-color-3);

    &:focus {
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  p {
    margin: 10px 0;
    font-size: 13px;
  }

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
</style>
