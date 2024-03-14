<script setup lang="ts">
import type { TopicComment } from '~/types/api/comment'

const CommentPanel = defineAsyncComponent(() => import('./Panel.vue'))

const {
  tid: storeTid,
  rid: storeRid,
  toUid,
  toUsername,
  isShowCommentPanelRid
} = storeToRefs(useTempCommentStore())

const props = defineProps<{
  tid: number
  rid: number
  toUser: {
    uid: number
    name: string
  }
}>()

const ridRef = ref(props.rid)
const toUser = ref(props.toUser)
const currentUserUid = useKUNGalgameUserStore().uid

const getComments = async () => {
  const data = await useFetch(`/api/topic/${props.tid}/comment`, {
    method: 'GET',
    query: { rid: props.rid },
    watch: false,
    ...kungalgameResponseHandler
  })
  return data
}

const { data: commentsData } = await getComments()

watch(
  () => props.rid,
  async () => {
    ridRef.value = props.rid
    toUser.value = props.toUser
    const newComment = await getComments()
    commentsData.value = newComment.data.value
  }
)

const getCommentEmits = (newComment: TopicComment) => {
  commentsData.value?.push(newComment)
}

const handleClickComment = (
  topicId: number,
  replyId: number,
  uid: number,
  name: string
) => {
  if (!currentUserUid) {
    useMessage('You need to login to comment', '您需要登录以评论', 'warn', 5000)
    return
  }
  storeTid.value = topicId
  storeRid.value = replyId
  toUid.value = uid
  toUsername.value = name

  isShowCommentPanelRid.value = ridRef.value
}
</script>

<template>
  <div class="comment-container">
    <div class="container" v-if="commentsData?.length">
      <div class="title">
        <span>{{ $t('topic.content.comments') }}</span>
      </div>

      <div
        class="comment"
        v-for="(comment, index) in commentsData"
        :key="index"
      >
        <NuxtLinkLocale
          v-if="comment.c_user.avatar"
          :to="`/kungalgamer/${comment.c_user.uid}/info`"
        >
          <img
            :src="comment.c_user.avatar.replace(/\.webp$/, '-100.webp')"
            alt="KUN"
          />
        </NuxtLinkLocale>

        <div class="content">
          <div class="describe">
            <div class="name">
              {{ `${comment.c_user.name} ${$t('topic.content.comment')}` }}
              <NuxtLinkLocale :to="`/kungalgamer/${comment.to_user.uid}/info`">
                {{ comment.to_user.name }}
              </NuxtLinkLocale>
            </div>

            <div class="operate">
              <ul>
                <TopicCommentLike
                  :tid="props.tid"
                  :cid="comment.cid"
                  :uid="currentUserUid"
                  :to-uid="comment.c_user.uid"
                  :likes="comment.likes"
                />

                <li
                  @click="
                    handleClickComment(
                      comment.tid,
                      comment.rid,
                      comment.c_user.uid,
                      comment.c_user.name
                    )
                  "
                >
                  <Icon class="icon" name="fa-regular:comment-dots" />
                </li>
              </ul>
            </div>
          </div>

          <pre class="text">{{ comment.content }}</pre>
        </div>
      </div>
    </div>

    <CommentPanel
      @get-comment-emits="getCommentEmits"
      v-if="isShowCommentPanelRid === ridRef"
    />
  </div>
</template>

<style lang="scss" scoped>
.title {
  border-top: 1px solid var(--kungalgame-blue-5);
  flex-shrink: 0;
  padding: 17px 0;
  color: var(--kungalgame-font-color-3);
}

.comment-container {
  width: 100%;
  padding: 0 17px;
}

.comment {
  display: flex;
  width: 100%;
  margin: 10px 0;
  color: var(--kungalgame-font-color-3);

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.describe {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 5px;
}

.name {
  font-size: 15px;

  a {
    color: var(--kungalgame-blue-5);

    &:hover {
      text-decoration: underline;
    }
  }
}
.operate ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .icon {
      cursor: pointer;
      color: var(--kungalgame-font-color-2);
      margin-right: 2px;
    }
  }
}

.text {
  border-left: 3px solid var(--kungalgame-blue-5);
  padding-left: 10px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
