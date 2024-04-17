<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { GalgameComment } from '~/types/api/galgame-comment'

defineProps<{
  comment: SerializeObject<GalgameComment>
  refresh: () => {}
}>()

const { locale } = useI18n()

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
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

        <span class="reply" @click="isShowComment = !isShowComment">
          <Icon name="lucide:reply" />
        </span>
      </div>

      <div class="action">
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

    .reply {
      cursor: pointer;
      color: var(--kungalgame-blue-5);
      font-size: 20px;
      margin-left: 10px;
    }
  }

  .action {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--kungalgame-font-color-2);
  }
}

.content {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
