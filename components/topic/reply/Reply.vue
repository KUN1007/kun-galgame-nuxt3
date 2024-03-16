<script setup lang="ts">
import dayjs from 'dayjs'

import type { TopicReply } from '~/types/api/reply'

const { moemoeAccessToken } = useKUNGalgameUserStore()
const { isLoading, scrollToReplyId, tempReplyRewrite } =
  storeToRefs(useTempReplyStore())

const { tid, rid, toUid, toUsername, isShowCommentPanelRid } = storeToRefs(
  useTempCommentStore()
)

const props = defineProps<{
  repliesData: TopicReply[]
  title: string
}>()

const replies = computed(() => props.repliesData)
const isCommentPanelOpen = ref(false)

const handleClickComment = (
  topicId: number,
  replyIid: number,
  uid: number,
  name: string
) => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to comment', '您需要登录以评论', 'warn', 5000)
    return
  }
  isCommentPanelOpen.value = !isCommentPanelOpen.value
  if (isCommentPanelOpen.value) {
    tid.value = topicId
    rid.value = replyIid
    toUid.value = uid
    toUsername.value = name
    isShowCommentPanelRid.value = replyIid
  } else {
    isShowCommentPanelRid.value = 0
  }
}

watch(
  () => tempReplyRewrite.value.edited,
  () => {
    const index = replies.value.findIndex(
      (replyItem) => replyItem.rid === tempReplyRewrite.value.rid
    )

    // Note: 0 is K1
    if (index >= 0) {
      replies.value[index].content = tempReplyRewrite.value.content
      replies.value[index].tags = tempReplyRewrite.value.tags
      replies.value[index].edited = tempReplyRewrite.value.edited
    }
  }
)
</script>

<template>
  <div>
    <div
      class="other-topic-container"
      v-for="(reply, index) in replies"
      :class="hourDiff(reply.upvote_time, 10) ? 'active-upvote' : ''"
      :key="index"
      :id="`kungalgame-reply-${reply.floor}`"
    >
      <div class="floor">
        <span>K{{ reply.floor }}</span>
      </div>

      <div class="container">
        <div class="content">
          <div class="article">
            <TopicKUNGalgamerInfo :user="reply.r_user">
              <div class="reply-mobile">
                =>
                <span @click="scrollToReplyId = reply.to_floor">
                  {{ reply.to_user.name }}
                </span>
              </div>
            </TopicKUNGalgamerInfo>

            <div class="right">
              <div class="top">
                <div class="reply">
                  {{ `${$t('topic.panel.to')} @` }}

                  <span @click="scrollToReplyId = reply.to_floor">
                    {{ reply.to_user.name }}
                  </span>
                </div>

                <TopicRewrite v-if="reply.edited" :time="reply.edited" />
              </div>

              <TopicContent :content="reply.content" />
            </div>
          </div>

          <div class="bottom">
            <TopicTags :tags="reply.tags" :is-show-icon="true" />

            <p class="time">
              <span>
                {{ dayjs(reply.time).format('YYYY-MM-DD HH:mm:ss') }}
              </span>
              <s
                class="rewrite"
                v-if="reply.edited"
                v-tooltip="{
                  message: { en: 'Rewrite Time', zh: 'Rewrite 时间' },
                  position: 'bottom'
                }"
              >
                × {{ dayjs(reply.edited).format('YYYY-MM-DD HH:mm:ss') }}
              </s>
            </p>
          </div>
        </div>

        <TopicFooter
          :info="{
            tid: reply.tid,
            rid: reply.rid,
            views: 0,
            likes: reply.likes,
            dislikes: reply.dislikes,
            upvotes: reply.upvotes
          }"
          :content="{
            title: props.title,
            content: reply.content,
            tags: reply.tags,
            category: []
          }"
          :to-user="{
            uid: reply.r_user.uid,
            name: reply.r_user.name
          }"
          :to-floor="reply.floor"
        >
          <template #comment>
            <span
              @click="
                handleClickComment(
                  reply.tid,
                  reply.rid,
                  reply.r_user.uid,
                  reply.r_user.name
                )
              "
              class="comment"
              v-tooltip="{
                message: { en: 'Comment', zh: '评论' },
                position: 'bottom'
              }"
            >
              <Icon name="uil:comment-dots" />
            </span>
          </template>
        </TopicFooter>

        <TopicComment
          :tid="reply.tid"
          :rid="reply.rid"
          :to-user="{ uid: reply.r_user.uid, name: reply.r_user.name }"
        />
      </div>
    </div>

    <KunSkeletonTopicReply v-if="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.other-topic-container {
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  &:last-child {
    margin-bottom: 20px;
  }
}

.floor {
  width: 100%;
  display: flex;
  font-weight: bold;
  font-style: oblique;
  color: var(--kungalgame-red-3);
  border-bottom: none;
  filter: drop-shadow(1px 2px 2px var(--kungalgame-trans-blue-4));
  margin: 5px 0;

  span {
    padding: 0 30px;
    text-align: center;
    background-color: var(--kungalgame-trans-white-2);
    font-size: 20px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0 50%);
  }
}

.container {
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  border-radius: 5px;
  border: 2px solid var(--kungalgame-trans-blue-2);

  &:hover {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.content {
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}

.article {
  display: flex;
  flex-grow: 1;
}

.bottom {
  display: flex;
  justify-content: space-between;

  .time {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--kungalgame-font-color-1);
    padding: 0 17px;
    margin-top: 5px;

    .rewrite {
      display: none;
      color: var(--kungalgame-blue-5);
    }
  }
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  letter-spacing: 1px;
}

.reply,
.reply-mobile {
  font-size: 17px;
  color: var(--kungalgame-font-color-3);

  span {
    color: var(--kungalgame-blue-5);
    font-weight: 500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
  }
}

.reply-mobile {
  display: none;
  margin-left: 17px;
}

.comment {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
  margin-right: 17px;
}

.active-upvote .container {
  border: 2px solid var(--kungalgame-red-4);
}

.active .container {
  border: 2px solid var(--kungalgame-red-4);
  border-radius: 10px;
  box-shadow: -3px 0 0 0 var(--kungalgame-red-4);
}

@media (max-width: 1000px) {
  .top {
    flex-direction: column;
  }

  .bottom {
    flex-direction: column;
  }
}

@media (max-width: 700px) {
  .other-topic-container {
    min-height: initial;
  }

  .article {
    flex-direction: column;
  }

  .top {
    display: none;
  }

  .bottom {
    .time {
      .rewrite {
        display: block;
      }
    }
  }

  .icon {
    font-size: initial;
  }

  .reply-mobile {
    display: block;
  }
}
</style>
