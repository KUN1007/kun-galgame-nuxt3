<script setup lang="ts">
import {
  KUN_DOC_CATEGORY_MAP,
  KUN_DOC_CATEGORY_COLOR_MAP
} from '~/constants/doc'

const { data: posts } = await useAsyncData(() => {
  return queryCollection('content').order('publishedTime', 'DESC').all()
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    class-name="min-h-[calc(100dvh-6rem)]"
    content-class="space-y-6"
  >
    <KunHeader
      name="关于我们"
      description="这里存放了网站的简介信息, 网站公告, 开发文档等等"
    />

    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <KunCard
        :is-pressable="true"
        :dark-border="true"
        v-for="post in posts"
        :key="post.id"
        :href="post.path"
        content-class="space-y-3"
      >
        <div class="flex items-center gap-3 text-sm">
          <KunBadge :color="KUN_DOC_CATEGORY_COLOR_MAP[post.category]">
            {{ KUN_DOC_CATEGORY_MAP[post.category] }}
          </KunBadge>

          <time
            :datetime="post.publishedTime.toString()"
            class="text-default-500"
          >
            {{ formatDate(post.publishedTime, { isShowYear: true }) }}
          </time>
        </div>

        <div class="group relative h-full space-y-3">
          <KunImage
            :alt="post.title"
            class="rounded-lg"
            :src="post.banner"
            width="100%"
            height="100%"
          />

          <h2
            class="group-hover:text-primary line-clamp-2 text-lg leading-6 font-semibold"
          >
            {{ post.title }}
          </h2>

          <p class="text-default-500 line-clamp-3 text-sm leading-6">
            {{ post.description }}
          </p>
        </div>
      </KunCard>
    </div>
  </KunCard>
</template>
