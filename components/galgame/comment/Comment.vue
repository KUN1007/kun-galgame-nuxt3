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
const { uid, roles } = usePersistUserStore()
const { locale } = useI18n()

const isShowComment = ref(false)
const isShowDelete = computed(
  () =>
    props.comment.user?.uid === uid || galgame?.user.uid === uid || roles >= 2
)

const handleClickComment = (uid: number) => {
  isShowComment.value = !isShowComment.value
  commentToUid.value = uid
}

const handleDeleteComment = async (gid: number, gcid: number) => {
  const res = await useComponentMessageStore().alert({
    'en-us': 'Are you sure you want to delete the comment?',
    'ja-jp': 'コメントを削除してもよろしいですか？',
    'zh-cn': '您确定删除评论吗？',
    'zh-tw': '您確定刪除評論嗎？'
  })
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/comment`, {
    method: 'DELETE',
    query: { gcid },
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
  <div class="comment">
    <div class="info">
      <div class="user">
        <KunAvatar :user="comment.user" size="30px" />
        <span>{{ comment.user.name }}</span>
        <span class="time">
          {{ formatTimeDifference(comment.time, locale) }}
        </span>

        <div v-if="comment.toUser">
          <span>=> </span>
          <NuxtLinkLocale :to="`/kungalgamer/${comment.toUser.uid}/info`">
            {{ `${comment.toUser.name}` }}
          </NuxtLinkLocale>
        </div>
      </div>

      <div class="action">
        <span class="reply" @click="handleClickComment(comment.user.uid)">
          <Icon class="icon" name="lucide:reply" />
        </span>
        <GalgameCommentLike :comment="comment" />
        <span
          class="delete"
          v-if="isShowDelete"
          @click="handleDeleteComment(comment.gid, comment.gcid)"
        >
          <Icon class="icon" name="lucide:trash-2" />
        </span>
      </div>
    </div>
    <pre class="content">{{ comment.content }}</pre>

    <GalgameCommentPanel
      v-if="isShowComment"
      :refresh="refresh"
      @close="isShowComment = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

  .user {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    a {
      margin-right: 30px;
      color: var(--kungalgame-blue-5);
    }

    .kun-avatar {
      margin-right: 10px;
    }

    .time {
      font-size: small;
      margin: 0 10px;
      color: var(--kungalgame-font-color-0);
    }
  }

  .action {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--kungalgame-font-color-2);

    .reply {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--kungalgame-blue-5);
      font-size: 20px;
      margin-right: 10px;
    }

    .delete {
      cursor: pointer;
      margin-left: 5px;
      margin-bottom: 3px;
      color: var(--kungalgame-red-5);
    }
  }
}

.content {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.panel {
  margin-top: 10px;
}
</style>
