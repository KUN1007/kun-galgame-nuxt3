<script setup lang="ts">
const message = useComponentMessageStore()

const refresh = inject<() => Promise<void>>('refresh')
const inputValue = ref('')

const handleChangeUsername = async () => {
  if (!isValidName(inputValue.value)) {
    useMessage(10122, 'warn')
    return
  }

  const res = await message.alert('您确定更改用户名吗？这将会消耗您 17 萌萌点')
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
    <div class="title">更改用户名</div>
    <p>
      用户名为 1~17 位任意字符, 用户名不可重复，更改用户名将会消耗您 17 萌萌点
    </p>
    <KunInput type="text" v-model="inputValue" />
    <KunButton @click="handleChangeUsername">确定更改</KunButton>
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
