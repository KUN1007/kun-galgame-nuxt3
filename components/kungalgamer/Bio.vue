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
    useMessage(
      'Bio must not exceed a maximum length of 107 characters',
      '签名的最大长度不可超过 107 个字符',
      'warn'
    )
    return
  }

  const result = await $fetch('/api/user/bio', {
    method: 'PUT',
    watch: false,
    body: { bio: bioValue.value },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('Rewrite bio successfully!', 'Rewrite 签名成功', 'success')
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
    <div class="title">{{ $t('user.settings.bio') }}</div>
    <KunTextarea
      name="bio"
      :placeholder="`${$t('user.settings.hint')}`"
      rows="5"
      v-model="bioValue"
    >
    </KunTextarea>

    <KunButton @click="handleChangeBio">
      {{ $t('user.settings.confirm') }}
    </KunButton>
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
