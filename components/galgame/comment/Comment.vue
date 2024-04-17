<script setup lang="ts">
import type { SerializeObject } from 'nitropack'
import type { GalgameComment } from '~/types/api/galgame-comment'

defineProps<{
  comment: SerializeObject<GalgameComment>
}>()

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const { locale } = useI18n()
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
        <span v-if="comment.toUser">{{ ` => ${comment.toUser.name}` }}</span>

        <span class="reply">
          <Icon name="lucide:reply" />
        </span>
      </div>

      <div class="action">
        <GalgameCommentLike :comment="comment" />
      </div>
    </div>
    <pre class="content">{{ comment.content }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.info {
  display: flex;
  margin-bottom: 10px;

  .user {
    display: flex;
    align-items: center;

    .kun-avatar {
      margin-right: 10px;
    }

    .time {
      font-size: small;
      margin-left: 10px;
      color: var(--kungalgame-font-color-0);
    }

    .reply {
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
  margin-bottom: 17px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
