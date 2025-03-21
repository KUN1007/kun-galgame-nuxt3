<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('content').order('date', 'DESC').all()
)
const hasPinnedPosts = computed(() => posts.value?.some((post) => post.pin))
</script>

<template>
  <!-- Hero Carousel -->
  <!-- <DocCarousel v-if="hasPinnedPosts" class="mb-16" /> -->

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

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <KunCard
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col items-start"
      >
        <div class="flex items-center gap-x-4 text-xs">
          <KunBadge>
            {{ post.category }}
          </KunBadge>

          <time :datetime="post.date.toString()" class="text-gray-500">
            {{ formatDate(post.date, { isShowYear: true }) }}
          </time>
        </div>
        <div class="group relative">
          <h3
            class="mt-3 text-lg leading-6 font-semibold text-gray-900 group-hover:text-gray-600"
          >
            <NuxtLink :to="post.path">
              <span class="absolute inset-0"></span>
              {{ post.title }}
            </NuxtLink>
          </h3>
          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {{ post.description }}
          </p>
        </div>
      </KunCard>
    </div>
  </KunCard>
</template>
