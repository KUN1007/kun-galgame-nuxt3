<script setup lang="ts">
import type { AdminUser } from '~/types/api/admin'

const props = defineProps<{
  user: AdminUser
}>()

const isLoading = ref(false)

const handleDeleteUser = async () => {
  const res = await useComponentMessageStore().alert(
    `要永久删除用户 ${props.user.name} 吗`,
    '严重注意! 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 该操作会彻底删除用户, 删除用户发布的话题, 评论, Galgame, Galgame 资源, 删除用户的一切存在, 不可撤销, 您真的要删除吗, 这个操作只是为了针对广告和违法用户存在的, 非必要请勿使用'
  )
  if (!res) {
    return
  }

  isLoading.value = true

  await $fetch(`/api/user/${props.user.id}/permanent`, {
    method: 'DELETE',
    query: { userId: props.user.id },
    ...kungalgameResponseHandler
  })

  isLoading.value = false
}
</script>

<template>
  <div
    class="dark:border-default-200 relative flex flex-col gap-3 rounded-lg border border-transparent p-3 shadow backdrop-blur-none transition-all duration-200"
  >
    <KunUser :user="user" />

    <div class="mt-2 flex items-center justify-between text-sm">
      <span class="text-default-700">
        {{ formatDate(user.created, { isShowYear: true, isPrecise: true }) }}
      </span>

      <KunButton
        color="danger"
        @click="handleDeleteUser"
        :loading="isLoading"
        :disabled="isLoading"
      >
        彻底删除用户
      </KunButton>
    </div>
  </div>
</template>
