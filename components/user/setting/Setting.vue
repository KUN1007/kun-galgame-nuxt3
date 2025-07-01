<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <div class="h-full w-full space-y-6">
    <KunHeader
      name="信息设置"
      description="您可以更改您的头像, 签名, 用户名 (萌萌点实在想不出来有什么用了, 嗯所以只能改用户名用一丢丢了, 咕咕咕咕咕)"
    />

    <UserSettingAvatar />
    <UserSettingBio :user="user" />
    <UserSettingUsername />
  </div>
</template>
