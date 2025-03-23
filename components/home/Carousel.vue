<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

const { data: pinnedPosts } = await useAsyncData('pinned-posts', () =>
  queryCollection('content').where('pin', '=', true).all()
)

const currentSlide = ref(0)
const autoplayInterval = ref<NodeJS.Timeout>()
const carouselRef = ref<HTMLElement | null>(null)
const { isOutside } = useMouseInElement(carouselRef)

const AUTOPLAY_DELAY = 3000

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

const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval.value = setInterval(nextSlide, AUTOPLAY_DELAY)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = undefined
  }
}

const manualSlide = (direction: 'next' | 'prev') => {
  if (direction === 'next') {
    nextSlide()
  } else {
    prevSlide()
  }
  startAutoplay()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  startAutoplay()
}

watch(isOutside, (outside) => {
  if (outside) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    ref="carouselRef"
    class-name="group relative overflow-hidden p-0"
  >
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="post in pinnedPosts"
        :key="post.path"
        class="w-full flex-shrink-0"
      >
        <div class="relative h-[200px] w-full sm:h-[300px]">
          <img
            :src="post.banner || '/kungalgame.webp'"
            :alt="post.title"
            class="h-full w-full object-cover opacity-[var(--kun-global-opacity)]"
          />
          <KunCard
            :is-transparent="false"
            class-name="absolute right-0 bottom-0 left-0 m-3"
            content-class="gap-3"
          >
            <h1 class="text-3xl font-bold">
              {{ post.title }}
            </h1>
            <p class="text-default-500 line-clamp-2">
              {{ post.description }}
            </p>
            <KunLink class-name="ml-auto" underline="hover" :to="post.path">
              阅读更多 >
            </KunLink>
          </KunCard>
        </div>
      </div>
    </div>

    <KunButton
      :is-icon-only="true"
      color="default"
      variant="flat"
      @click="manualSlide('prev')"
      class-name="absolute hidden group-hover:flex top-1/2 left-3 -translate-y-1/2 rounded-full transition-colors"
    >
      <Icon name="lucide:chevron-left" />
    </KunButton>
    <KunButton
      :is-icon-only="true"
      color="default"
      variant="flat"
      @click="manualSlide('next')"
      class-name="absolute hidden group-hover:flex top-1/2 right-3 -translate-y-1/2 rounded-full transition-colors"
    >
      <Icon name="lucide:chevron-right" />
    </KunButton>

    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
      <button
        v-for="(_, index) in pinnedPosts"
        :key="index"
        @click="goToSlide(index)"
        class="h-2 w-2 rounded-full transition-colors"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
      />
    </div>
  </KunCard>
</template>
