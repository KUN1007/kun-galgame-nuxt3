<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const refresh = inject<() => Promise<void>>('refresh')
const bioValue = ref('')
const user = computed(() => props.user)

const handleChangeBio = async () => {
  if (!bioValue.value.trim()) {
    return
  }

  if (bioValue.value.length > 107) {
    useMessage(10116, 'warn')
    return
  }

  const result = await $fetch('/api/user/bio', {
    method: 'PUT',
    watch: false,
    body: { bio: bioValue.value },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(10117, 'success')
    bioValue.value = ''
    await refresh?.()
  }
}

onMounted(() => {
  bioValue.value = user.value.bio
})
</script>

<template>
  <div class="bio">
    <div class="title">更改签名 (107 字之内)</div>
    <KunTextarea
      name="bio"
      placeholder="输入您的新签名，最大 107 个字符"
      rows="5"
      v-model="bioValue"
    >
    </KunTextarea>

    <KunButton @click="handleChangeBio">确定更改</KunButton>
  </div>
</template>

<style lang="scss" scoped>
.bio {
  width: 100%;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}
</style>
