<script setup lang="ts">
import type { TopicReply } from '~/types/api/reply'

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
  <Transition
    enter-active-class="animate__animated animate__fadeInUp animate__faster"
    appear
  >
    <div>
      <div
        class="other-topic-container"
        v-for="(reply, index) in replies"
        :class="hourDiff(reply.upvote_time, 10) ? 'active-upvote' : ''"
        :key="index"
        :id="`kungalgame-reply-${reply.floor}`"
      >
        <div class="floor" :class="reply.edited ? 'rewrite' : ''">
          <span>K{{ reply.floor }}</span>
        </div>

        <div class="container">
          <div class="content">
            <div class="article">
              <TopicKUNGalgamerInfo :user="reply.r_user" />

              <div class="right">
                <div class="top">
                  <div class="reply">
                    {{ `${$tm('topic.panel.to')} @` }}

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
              <TopicTags :tags="reply.tags" />
              <TopicTime :time="reply.time" />
            </div>
          </div>

          <TopicFooter
            :info="{
              tid: reply.tid,
              rid: reply.rid,
              views: 0,
              likes: reply.likes,
              dislikes: reply.dislikes,
              upvotes: reply.upvotes,
            }"
            :content="{
              title: props.title,
              content: reply.content,
              tags: reply.tags,
              category: [],
            }"
            :to-user="{
              uid: reply.r_user.uid,
              name: reply.r_user.name,
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
                class="icon"
                v-tooltip="{
                  message: { en: 'Comment', zh: '评论' },
                  position: 'bottom',
                }"
              >
                <Icon name="fa-regular:comment-dots" />
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
  </Transition>
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

  &:last-child {
    margin-bottom: 20px;
  }
}

.floor {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  font-style: oblique;
  color: var(--kungalgame-red-3);
  border-bottom: none;
  filter: drop-shadow(1px 2px 2px var(--kungalgame-trans-blue-4));
  margin: 5px 0;

  span {
    transform: rotate(10deg) translateY(40px);
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
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--shadow);
  transition: all 0.5s;
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
  border-top: 1px solid var(--kungalgame-blue-1);
  border-bottom: 1px solid var(--kungalgame-blue-1);
  display: flex;
  justify-content: space-between;
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

.reply {
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

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
  margin-right: 17px;
}

.rewrite {
  span {
    transform: rotate(0) translateY(0) translateX(-7px);
  }
}

.active-upvote .container {
  border: 1px solid var(--kungalgame-red-4);
}

.active .container {
  border: 1px solid var(--kungalgame-red-3);
  background-color: var(--kungalgame-trans-red-1);
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
  .article {
    flex-direction: column;
  }
  .top {
    margin: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--kungalgame-blue-1);
  }
}
</style>
