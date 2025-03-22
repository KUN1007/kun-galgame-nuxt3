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

    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <KunCard
        :is-pressable="true"
        v-for="post in posts"
        :key="post.id"
        :href="post.path"
        content-class="space-y-3"
      >
        <div class="flex items-center gap-3 text-sm">
          <KunBadge>
            {{ post.category }}
          </KunBadge>

          <time :datetime="post.date.toString()" class="text-default-500">
            {{ formatDate(post.date, { isShowYear: true }) }}
          </time>
        </div>

        <div class="group relative space-y-3">
          <img
            :alt="post.title"
            class="rounded-lg"
            :src="post.banner"
            width="100%"
            height="100%"
          />

          <h2 class="group-hover:text-primary text-lg leading-6 font-semibold">
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
