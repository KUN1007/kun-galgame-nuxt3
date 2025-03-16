<script setup lang="ts">
import { KUN_USER_ROLE_MAP, KUN_USER_STATUS_MAP } from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const user = computed(() => props.user)

const rolesName = () => {
  const roles = props.user.roles
  if (roles === 1) return 'user'
  if (roles === 2) return 'admin'
  if (roles === 3) return 'SU'
  return ''
}

const statusName = () => {
  const status = props.user.status
  if (status === 0) return 'normal'
  if (status === 1) return 'banned'
  return ''
}
</script>

<template>
  <div v-if="user" class="w-full">
    <div class="mb-6 flex items-center space-x-3">
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
        <div class="mt-2 flex items-center space-x-3">
          <span
            class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {{ KUN_USER_ROLE_MAP[rolesName()] }}
          </span>
          <span
            class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
          >
            {{ KUN_USER_STATUS_MAP[statusName()] }}
          </span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold text-indigo-600">
          {{ user.moemoepoint }}
        </div>
        <div class="text-sm text-gray-500">萌萌点</div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="mb-8 grid grid-cols-2 gap-6 md:grid-cols-3">
      <div class="rounded-lg bg-gray-50 p-4">
        <div class="text-xl font-semibold text-gray-900">
          {{ user.topic }}
        </div>
        <div class="text-sm text-gray-500">话题</div>
      </div>
      <div class="rounded-lg bg-gray-50 p-4">
        <div class="text-xl font-semibold text-gray-900">
          {{ user.reply }}
        </div>
        <div class="text-sm text-gray-500">回复</div>
      </div>
      <div class="rounded-lg bg-gray-50 p-4">
        <div class="text-xl font-semibold text-gray-900">
          {{ user.comment }}
        </div>
        <div class="text-sm text-gray-500">评论</div>
      </div>
    </div>

    <!-- Engagement Stats -->
    <div class="mb-8 flex space-x-6">
      <div class="flex flex-1 items-center space-x-2">
        <div class="text-green-500">👍</div>
        <div>
          <div class="text-lg font-medium">{{ user.upvote }}</div>
          <div class="text-sm text-gray-500">被推</div>
        </div>
      </div>
      <div class="flex flex-1 items-center space-x-2">
        <div class="text-blue-500">❤️</div>
        <div>
          <div class="text-lg font-medium">{{ user.like }}</div>
          <div class="text-sm text-gray-500">被赞</div>
        </div>
      </div>
      <div class="flex flex-1 items-center space-x-2">
        <div class="text-red-500">👎</div>
        <div>
          <div class="text-lg font-medium">{{ user.dislike }}</div>
          <div class="text-sm text-gray-500">被踩</div>
        </div>
      </div>
    </div>

    <!-- Additional Info -->
    <div class="space-y-4">
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>注册序号</span>
        <span class="font-medium">{{ user.uid }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>今日发布话题</span>
        <span class="font-medium">{{ user.dailyTopicCount }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>发布 Galgame</span>
        <span class="font-medium">{{ user.galgame }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>贡献 Galgame</span>
        <span class="font-medium">{{ user.contributeGalgame }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>今日发布 Galgame</span>
        <span class="font-medium">{{ user.dailyGalgameCount }}</span>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>注册时间</span>
        <span class="font-medium">{{
          formatDate(user.time, { isShowYear: true, isPrecise: true })
        }}</span>
      </div>
    </div>

    <!-- Bio Section -->
    <div class="mt-8">
      <h3 class="mb-3 text-lg font-medium text-gray-900">签名</h3>
      <pre
        v-if="user.bio"
        class="rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap text-gray-700"
        >{{ user.bio }}</pre
      >
      <KunNull v-if="!user.bio" type="null" :is-show-sticker="false" />
    </div>
  </div>
</template>
