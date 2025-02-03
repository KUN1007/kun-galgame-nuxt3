<script setup lang="ts">
import type { HomeMessage } from '~/types/api/home'

const iconMap: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'lucide:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow'
}

const messageData = ref<HomeMessage[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, status } = await useFetch(`/api/home/message`, {
  method: 'GET',
  query: pageData
})
messageData.value = data.value

watch(
  () => [pageData.page, status.value],
  () => {
    if (data.value && status.value !== 'pending' && pageData.page > 1) {
      messageData.value = messageData.value?.concat(data.value)
    }
  }
)

const handleClose = () => {
  messageData.value = messageData.value?.slice(0, 10)
  pageData.page = 1
}
</script>

<template>
  <div class="recent" v-if="messageData">
    <div class="message" v-for="(message, index) in messageData" :key="index">
      <Icon class="icon" :name="iconMap[message.type]" />
      <NuxtLink class="user" :to="`/kungalgamer/${message.uid}/info`">
        {{ message.name }}
      </NuxtLink>
      <NuxtLink
        class="link"
        :to="message.tid ? `/topic/${message.tid}` : `/galgame/${message.gid}`"
      >
        <span>{{ message.content }}</span>
        <span>{{ formatTimeDifference(message.time) }}</span>
      </NuxtLink>
    </div>
  </div>

  <HomeLoader v-model="pageData.page" :status="status">
    <span v-if="pageData.page !== 1" class="close" @click="handleClose">
      折叠为初始状态
    </span>
  </HomeLoader>
</template>

<style lang="scss" scoped>
.recent {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  font-size: 16px;
}

.message {
  margin-bottom: 8px;
  word-break: break-all;

  .user {
    color: var(--kungalgame-font-color-3);

    &::after {
      content: '-';
      color: var(--kungalgame-gray-4);
      margin: 0 4px;
    }
  }

  .icon {
    margin-right: 5px;
    color: var(--kungalgame-blue-5);
  }

  .link {
    color: var(--kungalgame-font-color-0);

    &:hover {
      color: var(--kungalgame-blue-5);
    }

    span:last-child {
      font-size: 12px;
      font-weight: initial;
      margin-left: 7px;
    }
  }
}

.close {
  margin-left: 17px;
  cursor: pointer;
  padding-right: 17px;

  &:hover {
    color: var(--kungalgame-blue-5);
  }
}

@media (max-width: 700px) {
  .recent {
    font-size: 15px;
  }
}
</style>
