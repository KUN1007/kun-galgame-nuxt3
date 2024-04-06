<script setup lang="ts">
const props = defineProps<{
  info: {
    tid: number
    rid: number
    likes: number[]
    dislikes: number[]
    upvotes: number[]
  }
  content: {
    title: string
    content: string
    tags: string[]
    category: string[]
    section?: string[]
  }
  toUser: {
    uid: number
    name: string
  }
  toFloor: number
}>()

const info = computed(() => props.info)
const content = computed(() => props.content)
const toUser = computed(() => props.toUser)

/**
 * For simplicity, we don't display the "rewrite" option here.
 * In reality, if users modify the information saved in local storage,
 * this validation will become ineffective, but the validation logic is on the backend.
 */
// Current user's UID
const currUserUid = usePersistUserStore().uid

// Share
const handleClickShare = () => {
  const shareLink = `${props.content.title}: https://www.kungal.com/topic/${props.info.tid}`

  navigator.clipboard
    .writeText(shareLink)
    .then(() => {
      useMessage(
        'Share Link copied successfully!',
        '分享链接复制成功',
        'success'
      )
    })
    .catch(() => {
      useMessage(
        'Share Link copy failed! Please switch to a more modern browser!',
        '分享链接复制失败! 请更换更现代的浏览器!',
        'error'
      )
    })
}
</script>

<template>
  <div class="footer">
    <div class="left">
      <ul>
        <TopicFooterUpvote
          :uid="currUserUid"
          :tid="info.tid"
          :rid="info.rid"
          :upvotes="info.upvotes"
          :to-uid="toUser.uid"
          v-tooltip="{
            message: { en: 'Upvote', zh: '推话题' },
            position: 'bottom'
          }"
        />

        <!-- Like -->
        <TopicFooterLike
          :uid="currUserUid"
          :tid="info.tid"
          :rid="info.rid"
          :likes="info.likes"
          :to-uid="toUser.uid"
          v-tooltip="{
            message: { en: 'Like', zh: '点赞' },
            position: 'bottom'
          }"
        />

        <!-- Dislike -->
        <TopicFooterDislike
          :uid="currUserUid"
          :tid="info.tid"
          :rid="info.rid"
          :dislikes="info.dislikes"
          :to-uid="toUser.uid"
          v-tooltip="{
            message: { en: 'Dislike', zh: '点踩' },
            position: 'bottom'
          }"
        />

        <!-- Favorite slot -->
        <slot name="favorite" />
      </ul>
    </div>

    <!-- Right part of the bottom (reply, comment, view only, edit) -->
    <div class="right">
      <TopicFooterReply
        :tid="info.tid"
        :to-user-name="toUser.name"
        :to-uid="toUser.uid"
        :to-floor="toFloor"
      />

      <!-- Share -->
      <span
        @click="handleClickShare"
        class="icon"
        v-tooltip="{
          message: { en: 'Share', zh: '分享' },
          position: 'bottom'
        }"
      >
        <Icon name="lucide:share-2" />
      </span>

      <!-- View Only (TODO) -->
      <!-- <span class="icon"><Icon icon="ph:user-focus-duotone" /></span> -->

      <!-- Edit -->
      <TopicFooterRewrite
        :tid="info.tid"
        :rid="info.rid"
        :uid="currUserUid"
        :title="content.title"
        :content="content.content"
        :tags="content.tags"
        :category="content.category"
        :section="content.section"
        :to-uid="toUser.uid"
        v-tooltip="{
          message: { en: 'Rewrite', zh: 'Rewrite' },
          position: 'bottom'
        }"
      />

      <!-- Comment slot -->
      <slot name="comment" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 7px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-left: 17px;

    span {
      display: flex;
      margin-right: 3px;
    }

    &:nth-child(1) span {
      color: var(--kungalgame-red-4);
    }
  }
}

.views {
  margin-left: 17px;
}

.icon {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    margin-right: 17px;
  }
}

.active {
  color: var(--kungalgame-blue-5);
}

@media (max-width: 700px) {
  .reply {
    margin-right: 0;
  }
  .icon {
    font-size: initial;
  }
  .left ul {
    li {
      margin: 0;
      margin-left: 17px;
    }
  }
}
</style>
