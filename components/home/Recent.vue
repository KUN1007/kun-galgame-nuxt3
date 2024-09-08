<script setup lang="ts">
import type { HomeMessage } from '~/types/api/home'

const { locale } = useI18n()

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

const { data, pending } = await useFetch(`/api/home/message`, {
  method: 'GET',
  query: pageData
})
messageData.value = data.value

watch(
  () => [pageData.page, pending.value],
  () => {
    if (data.value && !pending.value && pageData.page > 1) {
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
      <NuxtLinkLocale class="user" :to="`/kungalgamer/${message.uid}/info`">
        {{ message.name }}
      </NuxtLinkLocale>
      <span><Icon :name="iconMap[message.type]" /></span>
      <NuxtLinkLocale
        v-if="message.tid"
        class="link"
        :to="
          message.tid > 0 ? `/topic/${message.tid}` : `/galgame/${-message.tid}`
        "
      >
        <span>{{ message.content }}</span>
        <span>{{ formatTimeDifferenceHint(message.time, locale) }}</span>
      </NuxtLinkLocale>
    </div>
  </div>

  <HomeLoader v-model="pageData.page" :pending="pending">
    <span v-if="pageData.page !== 1" class="close" @click="handleClose">
      {{ $t('home.fold') }}
    </span>
  </HomeLoader>
</template>

<style lang="scss" scoped>
.recent {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  font-size: 15px;
}

.message {
  margin-bottom: 5px;
  word-break: break-all;

  .user {
    margin-right: 5px;
    color: var(--kungalgame-blue-5);
  }

  .icon {
    margin-right: 5px;
  }

  .link {
    color: var(--kungalgame-blue-5);

    span:last-child {
      color: var(--kungalgame-font-color-0);
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
    font-size: 14px;
  }
}
</style>
