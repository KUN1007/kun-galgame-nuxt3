<script setup lang="ts">
const { data: pinnedPosts } = await useAsyncData('pinned-posts', () =>
  queryCollection('content').where('pin', '=', true).all()
)

const currentSlide = ref(0)
const autoplayInterval = ref<NodeJS.Timeout>()

const nextSlide = () => {
  if (!pinnedPosts.value) return
  currentSlide.value = (currentSlide.value + 1) % pinnedPosts.value.length
}

const prevSlide = () => {
  if (!pinnedPosts.value) return
  currentSlide.value =
    (currentSlide.value - 1 + pinnedPosts.value.length) %
    pinnedPosts.value.length
}

onMounted(() => {
  autoplayInterval.value = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
})
</script>

<template>
  <div class="bg-background relative overflow-hidden">
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="post in pinnedPosts"
        :key="post.path"
        class="w-full flex-shrink-0"
      >
        <div class="relative h-[400px] w-full">
          <img
            :src="post.image || '/kungalgame.webp'"
            :alt="post.title"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          >
            <div class="absolute right-0 bottom-0 left-0 p-8">
              <h2 class="mb-4 text-3xl font-bold text-white">
                {{ post.title }}
              </h2>
              <p class="mb-4 line-clamp-2 text-gray-200">
                {{ post.description }}
              </p>
              <KunLink :to="post.path">阅读更多 ></KunLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="bg-background absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-white"
    >
      <Icon name="lucide:chevron-left" />
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
    >
      <Icon name="lucide:chevron-right" />
    </button>

    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
      <button
        v-for="(_, index) in pinnedPosts"
        :key="index"
        @click="currentSlide = index"
        class="h-2 w-2 rounded-full transition-colors"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
      />
    </div>
  </div>
</template>
