<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { GalgameComment } from '~/types/api/galgame-comment'

defineProps<{
  comment: SerializeObject<GalgameComment>
  refresh: () => {}
}>()

const { locale } = useI18n()
const isShowComment = ref(false)
</script>

<template>
  <div class="comment">
    <div class="info">
      <div class="user">
        <KunAvatar :user="comment.user" size="30px" />
        <span>{{ comment.user.name }}</span>
        <span class="time">
          {{ formatTimeDifferenceHint(comment.time, locale) }}
        </span>

        <div v-if="comment.toUser">
          <span>=> </span>
          <NuxtLinkLocale :to="`/kungalgamer/${comment.toUser.uid}/info`">
            {{ `${comment.toUser.name}` }}
          </NuxtLinkLocale>
        </div>
      </div>

      <div class="action">
        <span class="reply" @click="isShowComment = !isShowComment">
          <Icon name="lucide:reply" />
        </span>
        <GalgameCommentLike :comment="comment" />
      </div>
    </div>
    <pre class="content">{{ comment.content }}</pre>

    <GalgameCommentPanel
      v-if="isShowComment"
      :to-user="comment.user"
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
  margin-bottom: 10px;

  .user {
    display: flex;
    align-items: center;

    a {
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
  }
}

.content {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
