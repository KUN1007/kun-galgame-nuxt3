<script setup lang="ts">
import { KUN_USER_ROLE_MAP, KUN_USER_STATUS_MAP } from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const user = computed(() => props.user)

const currentUserUid = usePersistUserStore().id

const statsBlocks = [
  { key: 'topic', label: '话题' },
  { key: 'topicPoll', label: '话题投票' },
  { key: 'replyCreated', label: '回复' },
  { key: 'commentCreated', label: '评论' },
  { key: 'galgame', label: 'Galgame' },
  { key: 'galgameResource', label: 'Galgame 资源' },
  { key: 'galgameToolset', label: 'Galgame 工具' },
  { key: 'galgameToolsetResource', label: 'Galgame 工具资源' },
  { key: 'galgameRating', label: 'Galgame 评分' },
  { key: 'contributeGalgame', label: 'Galgame 贡献' }
]

const interactionBlocks = [
  {
    key: 'upvote',
    label: '被推',
    icon: 'lucide:sparkles',
    color: 'text-secondary'
  },
  {
    key: 'like',
    label: '被赞',
    icon: 'lucide:thumbs-up',
    color: 'text-primary'
  },
  // TODO:
  {
    key: 'mention',
    label: '被 @',
    icon: 'lucide:at-sign',
    color: 'text-warning',
    value: 0
  },
  {
    key: 'dislike',
    label: '被踩',
    icon: 'lucide:thumbs-down',
    color: 'text-default'
  }
]

const infoList = [
  { label: '注册序号', value: (u: UserInfo) => u.id },
  { label: '今日发布话题', value: (u: UserInfo) => u.dailyTopicCount },
  { label: '发布 Galgame', value: (u: UserInfo) => u.galgame },
  { label: '今日发布 Galgame', value: (u: UserInfo) => u.dailyGalgameCount },
  {
    label: '注册时间',
    value: (u: UserInfo) =>
      formatDate(u.created, { isShowYear: true, isPrecise: true })
  }
]
</script>

<template>
  <div v-if="user" class="w-full space-y-6">
    <KunCard
      :is-hoverable="false"
      class-name="bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5"
      content-class="flex-row items-center"
    >
      <div class="flex-1">
        <h1 class="flex items-center gap-2 text-2xl font-bold">
          <span>{{ user.name }}</span>
          <KunButton
            v-if="currentUserUid !== user.id"
            variant="flat"
            size="xs"
            color="primary"
            class-name="gap-1"
            :href="`/message/user/${user.id}`"
          >
            <KunIcon name="lucide:message-circle" />
            私聊
          </KunButton>
        </h1>
        <div class="mt-2 flex items-center space-x-3">
          <KunBadge size="md" color="primary">
            {{ KUN_USER_ROLE_MAP[user.role] }}
          </KunBadge>
          <KunBadge size="md" color="success">
            {{ KUN_USER_STATUS_MAP[user.status] }}
          </KunBadge>
        </div>
      </div>
      <div class="text-right">
        <div class="text-secondary text-3xl font-bold">
          {{ user.moemoepoint }}
        </div>
        <div class="text-default-500 text-sm">萌萌点</div>
      </div>
    </KunCard>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        :is-pressable="false"
        color="primary"
        v-for="block in statsBlocks"
        :key="block.key"
      >
        <div class="text-xl font-semibold">
          {{ user[block.key as 'topic'] }}
        </div>
        <div class="text-default-500 text-sm">{{ block.label }}</div>
      </KunCard>
    </div>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div
        v-for="block in interactionBlocks"
        :key="block.key"
        class="flex w-full items-center space-x-2"
      >
        <KunIcon :name="block.icon" class="text-2xl" :class="block.color" />
        <div>
          <div class="text-lg font-medium">
            {{ block.value ?? user[block.key as 'topic'] }}
          </div>
          <div class="text-default-500 text-sm">{{ block.label }}</div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="item in infoList"
        :key="item.label"
        class="text-default-700 flex items-center justify-between text-sm"
      >
        <span>{{ item.label }}</span>
        <span class="font-medium">{{ item.value(user) }}</span>
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-lg font-medium">签名</h3>
      <pre
        v-if="user.bio"
        class="border-default/20 text-default-700 rounded-lg border p-3 text-sm whitespace-pre-wrap"
        >{{ user.bio }}</pre
      >
      <KunNull v-else :is-show-sticker="false" />
    </div>
  </div>
</template>
