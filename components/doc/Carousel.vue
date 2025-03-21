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

// Autoplay
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
  <div class="relative overflow-hidden bg-white">
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
            :src="post.image || 'https://via.placeholder.com/1200x400'"
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
              <NuxtLink
                :to="post.path"
                class="inline-flex items-center rounded-lg bg-white px-4 py-2 text-gray-900 transition-colors hover:bg-gray-100"
              >
                Read More
                <svg
                  class="ml-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
    >
      <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
    >
      <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dots -->
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
