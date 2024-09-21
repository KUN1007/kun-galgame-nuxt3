<script setup lang="ts">
import type { SearchResultReply, SearchResultComment } from '~/types/api/search'

const { locale } = useI18n()

const props = defineProps<{
  data: SearchResultReply | SearchResultComment
  type: 'reply' | 'comment'
}>()

const content = computed(() =>
  props.type === 'reply'
    ? markdownToText(props.data.content)
    : props.data.content
)
</script>

<template>
  <NuxtLinkLocale :to="`/topic/${data.tid}`" v-kun-gradient>
    <div class="title">
      <span>
        <Icon :name="type === 'reply' ? 'lucide:reply' : 'uil:comment-dots'" />
      </span>
      <span>{{ data.title }}</span>
      <span>{{ formatTimeDifference(data.time, locale) }}</span>
    </div>

    <div class="content">
      {{ content }}
    </div>

    <div class="users">
      <div class="user">
        <KunAvatar :user="data.user" size="30px" />
        <span class="username">{{ data.user.name }}</span>
      </div>
      <div class="arrow">-></div>
      <div class="user">
        <KunAvatar :user="data.toUser" size="30px" />
        <span class="username">{{ data.toUser.name }}</span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
a {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  padding: 10px;
  border-radius: 10px;
}

.title {
  width: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;

  span {
    &:first-child {
      display: flex;
      margin-right: 5px;
    }

    &:last-child {
      color: var(--kungalgame-font-color-0);
      font-size: small;
      font-weight: initial;
      margin-left: 17px;
      white-space: nowrap;
    }
  }
}

.content {
  border-left: 3px solid var(--kungalgame-blue-5);
  background-color: var(--kungalgame-trans-blue-0);
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  font-size: small;
}

.users {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .arrow {
    margin: 0 5px;
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: small;

    .username {
      margin-left: 5px;
    }
  }
}
</style>
