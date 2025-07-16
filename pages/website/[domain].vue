<script setup lang="ts">
import {
  KUN_WEBSITE_CATEGORY_MAP,
  KUN_WEBSITE_LANGUAGE_MAP,
  KUN_WEBSITE_ACG_LIMIT_MAP
} from '~/constants/website'

const route = useRoute()

const domain = computed(() => {
  return (route.params as { domain: string }).domain
})

const { data, refresh } = await useFetch(`/api/website/${domain.value}`, {
  method: 'GET',
  watch: false,
  query: { domain: domain.value },
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
      >
        <div class="flex items-start space-x-6">
          <div class="flex-shrink-0">
            <NuxtImg
              :src="data.icon"
              :alt="data.name"
              class="h-20 w-20 rounded-2xl object-cover shadow-md"
            />
          </div>
          <div class="min-w-0 flex-1">
            <h1 class="text-default-900 mb-2 text-3xl font-bold">
              {{ data.name }}
            </h1>
            <p class="text-default-600 mb-4 text-lg leading-relaxed">
              {{ data.description }}
            </p>

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

        <WebsiteOperation :website="data" @refresh="refresh" />
      </KunCard>

      <WebsiteCommentContainer :website-id="data.id" />
    </div>

    <div class="space-y-3">
      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        :is-pressable="false"
        class-name="p-6"
      >
        <h3 class="text-default-900 mb-4 text-lg font-semibold">网站信息</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-default-500 text-sm">分类</span>
            <KunLink
              :to="`/website-category/${data.category.name}`"
              underline="none"
            >
              <KunBadge class-name="cursor-pointer" color="primary">
                {{ KUN_WEBSITE_CATEGORY_MAP[data.category.name] }}
              </KunBadge>
            </KunLink>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-default-500 text-sm">语言</span>
            <KunBadge color="secondary">
              {{ KUN_WEBSITE_LANGUAGE_MAP[data.language] }}
            </KunBadge>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-default-500 text-sm">年龄限制</span>
            <KunBadge
              :variant="data.ageLimit === 'all' ? 'flat' : 'solid'"
              :color="data.ageLimit === 'all' ? 'success' : 'danger'"
            >
              {{ KUN_WEBSITE_ACG_LIMIT_MAP[data.ageLimit] }}
            </KunBadge>
          </div>

          <div>
            <span class="text-default-500 text-sm">域名列表</span>
            <div class="mt-1 space-y-1">
              <div
                v-for="(dom, index) in data.domain"
                :key="index"
                class="text-default-900 font-mono text-sm"
              >
                {{ dom }}
              </div>
            </div>
          </div>
        </div>
      </KunCard>

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

      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        :is-pressable="false"
        class-name="p-6"
      >
        <h3 class="text-default-900 mb-4 text-lg font-semibold">统计信息</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-default-600">总访问量</span>
            <span class="text-default-900 font-semibold">
              {{ formatNumber(data.view) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-default-600">点赞数</span>
            <span class="text-default-900 font-semibold">
              {{ formatNumber(data.likeCount) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-default-600">收藏数</span>
            <span class="text-default-900 font-semibold">
              {{ formatNumber(data.favoriteCount) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-default-600">创建时间</span>
            <span class="text-default-900 font-semibold">
              {{ formatDate(data.created) }}
            </span>
          </div>
        </div>
      </KunCard>
    </div>
  </div>
</template>
