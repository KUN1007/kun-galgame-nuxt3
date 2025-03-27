<script setup lang="ts">
const message = useComponentMessageStore()

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
  }
}
</script>

<template>
  <KunCard :is-hoverable="false" content-class="space-y-3">
    <div>
      <span>更改用户名</span>
      <p class="text-default-500 text-sm">
        用户名为 1~17 位任意字符, 用户名不可重复，更改用户名将会消耗您 17 萌萌点
      </p>
    </div>

    <KunInput type="text" v-model="inputValue" />

    <div class="flex justify-end">
      <KunButton @click="handleChangeUsername">确定更改</KunButton>
    </div>
  </KunCard>
</template>
