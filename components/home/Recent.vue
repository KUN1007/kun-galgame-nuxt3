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
  <div v-if="messageData" class="w-full space-y-3 rounded-lg">
    <h2 class="text-xl font-semibold">最新动态</h2>

    <div class="rounded-lg border shadow">
      <div
        v-for="(message, index) in messageData"
        :key="index"
        class="group flex items-start space-x-3 rounded-lg p-3 transition-colors"
      >
        <div
          class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        >
          <Icon :name="iconMap[message.type]" class="text-primary h-4 w-4" />
        </div>

        <div class="space-y-2">
          <NuxtLink
            :to="
              message.tid ? `/topic/${message.tid}` : `/galgame/${message.gid}`
            "
            class="hover:text-primary line-clamp-3 break-all transition-colors"
          >
            {{ message.content }}
          </NuxtLink>

          <div class="flex items-center space-x-2">
            <NuxtLink
              :to="`/kungalgamer/${message.uid}/info`"
              class="hover:text-foreground text-sm font-medium text-gray-600 transition-colors"
            >
              {{ message.name }}
            </NuxtLink>
            <span class="text-sm text-gray-500">
              {{ formatTimeDifference(message.time) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
