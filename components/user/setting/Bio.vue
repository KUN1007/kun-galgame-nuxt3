<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

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
  }
}

onMounted(() => {
  bioValue.value = user.value.bio
})
</script>

<template>
  <KunCard :is-hoverable="false" content-class="space-y-3">
    <div>
      <span class="text-xl">更改签名</span>
      <p class="text-default-500 text-sm">
        签名的长度在 107 字之内, 签名暂时只能使用纯文本 (但是保留换行符),
        以后会加强的呜呜呜, 我一定不会咕咕咕的, 嗯
      </p>
    </div>

    <KunTextarea
      name="bio"
      placeholder="输入您的新签名，最大 107 个字符"
      :rows="5"
      v-model="bioValue"
    >
    </KunTextarea>

    <div class="flex justify-end">
      <KunButton @click="handleChangeBio">确定更改</KunButton>
    </div>
  </KunCard>
</template>
