<script setup lang="ts">
const { locale } = useI18n()

const iconMap: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'lucide:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow'
}

const { data } = await useLazyFetch(`/api/message/home`, {
  method: 'GET'
})
</script>

<template>
  <div class="recent" v-if="data">
    <div class="message" v-for="(message, index) in data" :key="index">
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
</template>

<style lang="scss" scoped>
.recent {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 107px;
  overflow-y: scroll;
  margin-bottom: 17px;
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

@media (max-width: 700px) {
  .recent {
    font-size: 14px;
  }
}
</style>
