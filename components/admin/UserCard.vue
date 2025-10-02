<script setup lang="ts">
import { KUN_USER_STATUS_MAP } from '~/constants/user'
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

const handleBanUser = async () => {
  const res = await useComponentMessageStore().alert(
    `要 ${props.user.status ? '解封' : '封禁'} 用户 ${props.user.name} 吗`,
    props.user.status
      ? '解封将恢复该用户的所有操作权限'
      : '封禁将禁止该用户在本论坛进行任何操作, 可以解封'
  )
  if (!res) {
    return
  }

  isLoading.value = true

  await $fetch(`/api/user/${props.user.id}/ban`, {
    method: 'PUT',
    query: { userId: props.user.id },
    ...kungalgameResponseHandler
  })
  useMessage(`${props.user.status ? '解封' : '封禁'} 用户成功`, 'success')

  isLoading.value = false
}
</script>

<template>
  <div
    class="dark:border-default-200 relative flex flex-col gap-3 rounded-lg border border-transparent p-3 backdrop-blur-none transition-all duration-200"
  >
    <div class="flex items-center gap-3">
      <KunUser :user="user" />
      <KunBadge
        size="xs"
        :variant="user.status ? 'solid' : 'flat'"
        :color="user.status ? 'danger' : 'success'"
      >
        {{ KUN_USER_STATUS_MAP[user.status] }}
      </KunBadge>
    </div>

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

      <KunButton
        size="sm"
        :color="user.status ? 'success' : 'danger'"
        @click="handleBanUser"
        :loading="isLoading"
        :disabled="isLoading"
      >
        {{ user.status ? '解封' : '封禁' }}
      </KunButton>
    </div>
  </div>
</template>
