<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { GalgameDetail } from '~/types/api/galgame'
import type { GalgameComment } from '~/types/api/galgame-comment'

const props = defineProps<{
  comment: SerializeObject<GalgameComment>
  refresh: () => void
}>()

const galgame = inject<GalgameDetail>('galgame')

const { commentToUid } = storeToRefs(useTempGalgameResourceStore())
const { id, role } = usePersistUserStore()

const isShowComment = ref(false)
const isShowDelete = computed(
  () => props.comment.user?.id === id || galgame?.user.id === id || role >= 2
)

const handleClickComment = (uid: number) => {
  isShowComment.value = !isShowComment.value
  commentToUid.value = uid
}

const handleDeleteComment = async (
  galgameId: number,
  galgameCommentId: number
) => {
  const res = await useComponentMessageStore().alert('您确定删除评论吗？')
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${galgameId}/comment`, {
    method: 'DELETE',
    query: { galgameCommentId },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(10538, 'success')
    props.refresh()
  }
}
</script>

<template>
  <KunCard :is-hoverable="false" content-class="flex-row gap-3">
    <KunAvatar :user="comment.user" />

    <div class="flex w-full flex-col space-y-2">
      <div class="flex flex-wrap items-center">
        <span class="text-default-700">{{ comment.user.name }}</span>
        <div v-if="comment.targetUser">
          <span class="mx-2">=></span>
          <KunLink
            underline="hover"
            :to="`/user/${comment.targetUser.id}/info`"
          >
            {{ `${comment.targetUser.name}` }}
          </KunLink>
        </div>
      </div>

      <div class="break-all whitespace-pre-line">{{ comment.content }}</div>

      <div class="flex items-end justify-between">
        <span class="text-default-500 text-sm">
          发布于 {{ formatTimeDifference(comment.created) }}
        </span>

        <div class="flex items-center justify-end gap-1">
          <KunButton
            variant="flat"
            class-name="gap-1"
            @click="handleClickComment(comment.user.id)"
          >
            回复
          </KunButton>

          <GalgameCommentLike :comment="comment" />

          <KunTooltip text="删除">
            <KunButton
              :is-icon-only="true"
              v-if="isShowDelete"
              variant="light"
              color="danger"
              size="lg"
              class-name="gap-1"
              @click="handleDeleteComment(comment.galgameId, comment.id)"
            >
              <KunIcon name="lucide:trash-2" />
            </KunButton>
          </KunTooltip>
        </div>
      </div>

      <KunAnimationFadeCard>
        <GalgameCommentPanel
          v-if="isShowComment"
          :refresh="refresh"
          @close="isShowComment = false"
        />
      </KunAnimationFadeCard>
    </div>
  </KunCard>
</template>
