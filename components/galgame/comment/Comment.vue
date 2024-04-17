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
      </div>

      <div class="action">
        <span>
          <Icon name="lucide:reply" />
        </span>
        <span>
          <Icon name="lucide:thumbs-up" />
        </span>
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

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .kun-avatar {
      margin-right: 10px;
    }

    .time {
      font-size: small;
      margin-left: 10px;
      color: var(--kungalgame-font-color-0);
    }
  }

  .action {
    margin-left: auto;
    color: var(--kungalgame-font-color-2);

    span {
      margin-right: 10px;
    }
  }
}

.content {
  margin: 0;
  margin-bottom: 17px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
