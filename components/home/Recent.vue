<script setup lang="ts">
import type { HomeMessage } from '~/types/api/home'

const iconMap: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'carbon:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow'
}

const messageData = ref<HomeMessage[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, status } = await useFetch('/api/home/message', {
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
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="messageData"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <h2 class="text-xl font-semibold">最新动态</h2>

    <div
      v-for="(message, index) in messageData"
      :key="index"
      class="group flex items-start space-x-3 rounded-lg transition-colors"
    >
      <div
        class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      >
        <Icon :name="iconMap[message.type]" class="text-primary h-4 w-4" />
      </div>

      <div class="space-y-2">
        <KunLink
          underline="none"
          color="default"
          :to="
            message.tid ? `/topic/${message.tid}` : `/galgame/${message.gid}`
          "
          class-name="hover:text-primary line-clamp-3 break-all transition-colors"
        >
          {{ message.content }}
        </KunLink>

        <div class="flex items-center space-x-2">
          <KunLink
            underline="none"
            color="default"
            :to="`/user/${message.uid}/info`"
            class-name="hover:text-foreground text-default-500 text-sm font-medium transition-colors"
          >
            {{ message.name }}
          </KunLink>
          <span class="text-default-500 text-sm">
            {{ formatTimeDifference(message.time) }}
          </span>
        </div>
      </div>
    </div>
  </KunCard>
</template>
