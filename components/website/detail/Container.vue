<script setup lang="ts">
const props = defineProps<{
  domain: string
}>()

const { data, refresh } = await useFetch(`/api/website/${props.domain}`, {
  method: 'GET',
  watch: false,
  query: { domain: props.domain },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div v-if="data" class="grid grid-cols-1 gap-3 lg:grid-cols-3">
    <div class="space-y-3 lg:col-span-2">
      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        :is-pressable="false"
        class-name="p-6"
        content-class="space-y-6"
      >
        <div class="flex items-start space-x-6">
          <div class="flex-shrink-0">
            <NuxtImg
              :src="data.icon"
              :alt="data.name"
              class="h-20 w-20 rounded-2xl object-cover shadow-md"
            />
          </div>
          <div class="space-y-3">
            <h1 class="text-default-900 text-3xl font-bold">
              {{ data.name }}
            </h1>

            <div class="text-default-500 flex items-center space-x-6 text-sm">
              <div class="flex items-center space-x-1">
                <KunIcon name="lucide:eye" />
                <span>{{ formatNumber(data.view) }} 次访问</span>
              </div>
              <div class="flex items-center space-x-1">
                <KunIcon name="lucide:clock" />
                <span>更新于 {{ formatDate(data.updated) }}</span>
              </div>
            </div>
          </div>
        </div>

        <p class="text-default-600 text-lg leading-relaxed">
          {{ data.description }}
        </p>

        <WebsiteOperation :website="data" @refresh="refresh" />
      </KunCard>

      <WebsiteCommentContainer :website-id="data.id" />
    </div>

    <div class="space-y-3">
      <WebsiteDetailInfo :data="data" />

      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        :is-pressable="false"
        class-name="p-6"
      >
        <h3 class="text-default-900 mb-4 text-lg font-semibold">相关标签</h3>
        <div class="flex flex-wrap gap-2">
          <WebsiteTag :tags="data.tags" :is-nav="true" />
        </div>
      </KunCard>

      <WebsiteDetailStats :data="data" />
    </div>
  </div>
</template>
