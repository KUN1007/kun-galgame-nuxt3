<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  rid: number
  commentsData: TopicComment[]
}>()

const comments = ref(props.commentsData)

const currentUserUid = usePersistUserStore().uid
const {
  rid: storeRid,
  toUid,
  toUsername,
  isShowPanel
} = storeToRefs(useTempCommentStore())

const handleClickComment = (comment: TopicComment) => {
  if (!currentUserUid) {
    useMessage('You need to login to comment', '您需要登录以评论', 'warn', 5000)
    return
  }

  storeRid.value = props.rid
  toUid.value = comment.user.uid
  toUsername.value = comment.user.name
  isShowPanel.value = !isShowPanel.value
}
</script>

<template>
  <div class="comment-container">
    <div class="container" v-if="comments?.length">
      <div class="title">
        <span>{{ $t('topic.content.comments') }}</span>
      </div>

      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <NuxtLinkLocale
          v-if="comment.user.avatar"
          :to="`/kungalgamer/${comment.user.uid}/info`"
        >
          <img
            :src="comment.user.avatar.replace(/\.webp$/, '-100.webp')"
            alt="KUN"
          />
        </NuxtLinkLocale>

        <div class="content">
          <div class="describe">
            <div class="name">
              {{ `${comment.user.name} ${$t('topic.content.comment')}` }}
              <NuxtLinkLocale :to="`/kungalgamer/${comment.toUser.uid}/info`">
                {{ comment.toUser.name }}
              </NuxtLinkLocale>
            </div>

            <div class="operate">
              <TopicCommentLike :comment="comment" />

              <span @click="handleClickComment(comment)">
                <Icon class="icon" name="uil:comment-dots" />
              </span>
            </div>
          </div>

          <pre class="text">{{ comment.content }}</pre>
        </div>
      </div>
    </div>

    <LazyTopicCommentPanel
      v-if="isShowPanel && rid === storeRid"
      :rid="rid"
      @get-comment="(newComment) => comments.push(newComment)"
    />
  </div>
</template>

<style lang="scss" scoped>
.title {
  border-top: 1px solid var(--kungalgame-trans-blue-2);
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

.operate {
  display: flex;
  span {
    display: flex;
    justify-content: center;
    align-items: center;

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
