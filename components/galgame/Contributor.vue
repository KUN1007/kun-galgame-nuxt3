<script setup lang="ts">
defineProps<{
  data: KunUser[]
  pending: boolean
  views: number
}>()
</script>

<template>
  <div class="space-y-3">
    <p>本游戏项目的贡献者</p>
    <div class="flex items-center gap-1" v-if="data && !pending">
      <KunAvatar
        v-for="(user, index) in data"
        :key="index"
        :user="user"
        v-tooltip="{
          message: user.name,
          position: 'bottom'
        }"
      />
    </div>
    <KunSkeletonGalgameContributor v-if="pending" />
  </div>
</template>
