<script setup lang="ts">
import { scrollIntoComment } from './_scrollIntoComment'
import type { WebsiteComment } from '~/types/api/website'

withDefaults(
  defineProps<{
    comments: WebsiteComment[]
    websiteId: number
    depth?: number
  }>(),
  { depth: 0 }
)

const emits = defineEmits<{
  setNewComment: [comment: WebsiteComment]
  removeComment: [commentId: number]
}>()

const replyTo = ref<number | null>(null)

const handleClickReply = (comment: WebsiteComment) => {
  const idCurrentComment = replyTo.value === comment.id
  replyTo.value = idCurrentComment ? null : comment.id
}

const handleCommitNewComment = (comment: WebsiteComment) => {
  emits('setNewComment', comment)
}
</script>

<template>
  <template v-for="(com, index) in comments" :key="index">
    <div
      :class="cn(depth <= 3 && depth !== 0 ? `mt-3 ml-3` : 'ml-0', 'space-y-4')"
    >
      <div class="flex space-x-3">
        <div
          :class="
            cn(
              'flex flex-col items-center gap-1',
              com.targetUser && 'bg-primary-500/10 rounded-2xl p-2'
            )
          "
        >
          <KunAvatar :user="com.user" />
          <template v-if="com.targetUser">
            <KunIcon
              class-name="text-xl text-primary"
              name="lucide:arrow-down"
            />
            <KunAvatar :user="com.targetUser" />
          </template>
        </div>
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="text-default-900 font-medium">
              {{ com.user.name }}
            </span>

            <span v-if="com.targetUser" class="text-default-500">回复</span>

            <KunTooltip
              v-if="com.targetUser"
              :text="`定位到 ${com.targetUser.name} 的回复`"
            >
              <KunLink
                underline="hover"
                @click="scrollIntoComment(com.parentId)"
                v-if="com.targetUser"
                class="text-primary cursor-pointer font-medium"
              >
                {{ com.user.name }}
              </KunLink>
            </KunTooltip>

            <span class="text-default-500 text-sm">
              {{ formatDate(com.created, { isPrecise: true }) }}
            </span>
          </div>

          <p
            :id="`comment-${com.id}`"
            class="text-default-700 rounded-lg p-2 leading-relaxed"
          >
            {{ com.content }}
          </p>

          <div class="flex gap-1">
            <KunButton @click="handleClickReply(com)" size="sm" variant="flat">
              回复
            </KunButton>

            <WebsiteCommentDelete
              @remove-comment="(commentId) => emits('removeComment', commentId)"
              :comment="com"
            />
          </div>
        </div>
      </div>

      <KunAnimationFadeCard>
        <div class="mt-2" v-if="replyTo === com.id">
          <WebsiteCommentPublish
            :website-id="websiteId"
            :parent-id="com.id"
            :receiver="com.user"
            @on-success="replyTo = null"
            @set-new-comment="handleCommitNewComment"
          />
        </div>
      </KunAnimationFadeCard>

      <div v-if="com.reply && com.reply.length > 0" className="mt-2">
        <WebsiteCommentRender
          :comments="com.reply"
          :depth="depth + 1"
          :website-id="websiteId"
        />
      </div>
    </div>
  </template>
</template>
