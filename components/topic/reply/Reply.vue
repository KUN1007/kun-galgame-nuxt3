<script setup lang="ts">
import dayjs from 'dayjs'
import type { TopicReply } from '~/types/api/topic-reply'

const { scrollToReplyId } = storeToRefs(useTempReplyStore())

defineProps<{
  reply: TopicReply
  title: string
}>()
</script>

<template>
  <div
    class="reply"
    :class="hourDiff(reply.upvoteTime, 10) ? 'active-upvote' : ''"
    :id="`k${reply.floor}`"
  >
    <div class="floor">
      <NuxtLinkLocale :to="`/topic/${reply.tid}#k${reply.floor}`">
        {{ reply.floor }}
      </NuxtLinkLocale>
    </div>

    <div class="content">
      <div class="article">
        <TopicKUNGalgamerInfo :user="reply.user">
          <div class="reply-mobile">
            =>
            <span @click="scrollToReplyId = reply.toFloor">
              {{ reply.toUser.name }}
            </span>
          </div>
        </TopicKUNGalgamerInfo>

        <div class="right">
          <div class="reply-to">
            {{ `${$t('topic.panel.to')} @` }}
            <span @click="scrollToReplyId = reply.toFloor">
              {{ reply.toUser.name }}
            </span>
          </div>

          <KunContent :content="reply.content" />
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

    <TopicReplyFooter :reply="reply" :title="title" />

    <TopicComment :rid="reply.rid" :comments-data="reply.comment" />
  </div>
</template>

<style lang="scss" scoped>
.reply {
  width: 100%;
  flex-shrink: 0;
  padding: 10px;
  margin-bottom: 17px;
  position: relative;

  @include kun-blur;
  @include kun-center;
  flex-direction: column;
}

.floor {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  font-weight: bold;
  font-style: oblique;
  border-bottom: none;

  a {
    color: var(--kungalgame-gray-4);
    padding-left: 5px;
    text-align: center;
    font-size: 20px;
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
  flex-direction: column;
  justify-content: space-between;
  user-select: none;

  .time {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--kungalgame-font-color-1);
    padding: 0 17px;
    margin-top: 5px;

    .rewrite {
      color: var(--kungalgame-blue-5);
    }
  }
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;

  .reply-to {
    display: flex;
    align-items: center;
    margin: 10px 0;
    letter-spacing: 1px;

    span {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--kungalgame-blue-5);
      font-weight: bold;
      margin-left: 5px;

      &::after {
        content: '➢';
        color: var(--kungalgame-red-4);
        margin-left: 10px;
        transform: translateX(0);
        transition: transform 0.2s ease;
      }

      &:hover::after {
        transform: translateX(10px);
      }
    }
  }
}

.reply-mobile {
  font-size: 17px;
  display: none;
  margin-left: 17px;
  color: var(--kungalgame-font-color-3);
  align-items: center;

  span {
    color: var(--kungalgame-blue-5);
    margin-left: 10px;

    &::after {
      content: '➢';
      color: var(--kungalgame-red-4);
      margin-left: 10px;
    }
  }
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

.active {
  box-shadow: 0 0 0 2px var(--kungalgame-red-4) inset;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-blue-0);
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
  .reply {
    margin-bottom: 7px;
  }

  .other-topic-container {
    min-height: initial;
  }

  .article {
    flex-direction: column;
  }

  .reply-to {
    display: none !important;
  }

  .icon {
    font-size: initial;
  }

  .reply-mobile {
    display: flex;
  }
}
</style>
