<script setup lang="ts">
import { KUN_USER_ROLE_MAP, KUN_USER_STATUS_MAP } from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const user = computed(() => props.user)

const rolesName = () => {
  const roles = user.value.roles
  if (roles === 1) return 'user'
  if (roles === 2) return 'admin'
  if (roles === 3) return 'SU'
  return ''
}

const statusName = () => {
  const status = user.value.status
  if (status === 0) return 'normal'
  if (status === 1) return 'banned'
  return ''
}

const currentUserUid = usePersistUserStore().uid
</script>

<template>
  <div v-if="user" class="w-full space-y-8">
    <div class="flex items-center space-x-3">
      <div class="flex-1">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
          <span>{{ user.name }}</span>
          <NuxtLink
            class="block sm:hidden"
            v-if="currentUserUid !== user.uid"
            :to="`/message/user/${user.uid}`"
          >
            <KunButton variant="flat" size="xs" color="primary">
              <Icon name="lucide:message-circle" />
              私聊
            </KunButton>
          </NuxtLink>
        </h2>
        <div class="mt-2 flex items-center space-x-3">
          <KunBadge size="md" color="primary">
            {{ KUN_USER_ROLE_MAP[rolesName()] }}
          </KunBadge>
          <KunBadge size="md" color="success">
            {{ KUN_USER_STATUS_MAP[statusName()] }}
          </KunBadge>
        </div>
      </div>
      <div class="text-right">
        <div class="text-secondary text-3xl font-bold">
          {{ user.moemoepoint }}
        </div>
        <div class="text-default-500 text-sm">萌萌点</div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div class="bg-default-100 rounded-lg p-4">
        <div class="text-xl font-semibold">
          {{ user.topic }}
        </div>
        <div class="text-default-500 text-sm">话题</div>
      </div>
      <div class="bg-default-100 rounded-lg p-4">
        <div class="text-xl font-semibold">
          {{ user.galgame }}
        </div>
        <div class="text-default-500 text-sm">Galgame</div>
      </div>
      <div class="bg-default-100 rounded-lg p-4">
        <div class="text-xl font-semibold">
          {{ user.reply }}
        </div>
        <div class="text-default-500 text-sm">回复</div>
      </div>
      <div class="bg-default-100 rounded-lg p-4">
        <div class="text-xl font-semibold">
          {{ user.comment }}
        </div>
        <div class="text-default-500 text-sm">评论</div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div class="flex w-full items-center space-x-2">
        <Icon class="text-secondary text-2xl" name="lucide:sparkles" />
        <div>
          <div class="text-lg font-medium">{{ user.upvote }}</div>
          <div class="text-default-500 text-sm">被推</div>
        </div>
      </div>
      <div class="flex w-full items-center space-x-2">
        <Icon class="text-primary text-2xl" name="lucide:thumbs-up" />
        <div>
          <div class="text-lg font-medium">{{ user.like }}</div>
          <div class="text-default-500 text-sm">被赞</div>
        </div>
      </div>
      <div class="flex w-full items-center space-x-2">
        <Icon class="text-warning text-2xl" name="lucide:at-sign" />
        <div>
          <!-- TODO: -->
          <div class="text-lg font-medium">0</div>
          <div class="text-default-500 text-sm">被 @</div>
        </div>
      </div>
      <div class="flex w-full items-center space-x-2">
        <Icon class="text-default text-2xl" name="lucide:thumbs-down" />
        <div>
          <div class="text-lg font-medium">{{ user.dislike }}</div>
          <div class="text-default-500 text-sm">被踩</div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="text-default-700 flex items-center justify-between text-sm">
        <span>注册序号</span>
        <span class="font-medium">{{ user.uid }}</span>
      </div>
      <div class="text-default-700 flex items-center justify-between text-sm">
        <span>今日发布话题</span>
        <span class="font-medium">{{ user.dailyTopicCount }}</span>
      </div>
      <div class="text-default-700 flex items-center justify-between text-sm">
        <span>发布 Galgame</span>
        <span class="font-medium">{{ user.galgame }}</span>
      </div>
      <div class="text-default-700 flex items-center justify-between text-sm">
        <span>今日发布 Galgame</span>
        <span class="font-medium">{{ user.dailyGalgameCount }}</span>
      </div>
      <div class="text-default-700 flex items-center justify-between text-sm">
        <span>注册时间</span>
        <span class="font-medium">{{
          formatDate(user.time, { isShowYear: true, isPrecise: true })
        }}</span>
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-lg font-medium">签名</h3>
      <pre
        v-if="user.bio"
        class="bg-default-100 text-default-700 rounded-lg p-3 text-sm whitespace-pre-wrap"
        >{{ user.bio }}</pre
      >
      <KunNull v-if="!user.bio" :is-show-sticker="false" />
    </div>
  </div>
</template>
