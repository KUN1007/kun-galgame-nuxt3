<script setup lang="ts">
const iconMap: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'carbon:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow'
}

const { data } = await useFetch('/api/home/message', {
  method: 'GET',
  query: {
    page: 1,
    limit: 10
  }
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="data"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新动态</h2>
      <KunLink
        underline="none"
        class-name="text-default-500 hover:text-primary text-sm transition-colors"
        to="/activity"
      >
        查看更多 >
      </KunLink>
    </div>

    <div
      v-for="(message, index) in data"
      :key="index"
      class="group flex items-start space-x-3 rounded-lg transition-colors"
    >
      <div
        class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      >
        <KunIcon :name="iconMap[message.type]" class="text-primary h-4 w-4" />
      </div>

      <div class="space-y-2">
        <KunLink
          underline="none"
          color="default"
          :to="message.link"
          class-name="hover:text-primary line-clamp-3 break-all transition-colors"
        >
          {{ message.content }}
        </KunLink>

        <div class="flex items-center space-x-2">
          <KunLink
            underline="none"
            color="default"
            :to="`/user/${message.user.id}/info`"
            class-name="hover:text-foreground text-default-500 text-sm font-medium transition-colors"
          >
            {{ message.user.name }}
          </KunLink>
          <span class="text-default-500 text-sm">
            {{ formatTimeDifference(message.created) }}
          </span>
        </div>
      </div>
    </div>
  </KunCard>
</template>
