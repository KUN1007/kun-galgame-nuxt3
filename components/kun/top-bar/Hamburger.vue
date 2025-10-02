<script setup lang="ts">
const { showKUNGalgameHamburger } = storeToRefs(useTempSettingStore())

const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

const handleTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX
  startY.value = event.touches[0].clientY
  currentX.value = 0
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  const touchX = event.touches[0].clientX
  const touchY = event.touches[0].clientY
  const deltaX = touchX - startX.value
  const deltaY = touchY - startY.value

  if (deltaY < deltaX) {
    return
  }

  if (deltaX < 0) {
    requestAnimationFrame(() => {
      currentX.value = deltaX
    })
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
  const movedX = currentX.value
  if (Math.abs(movedX) > 30) {
    showKUNGalgameHamburger.value = false
  }
  currentX.value = 0
}

watch(
  () => showKUNGalgameHamburger.value,
  () => {
    if (showKUNGalgameHamburger.value) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }
)
</script>

<template>
  <Transition :duration="550" name="slide">
    <div
      v-if="showKUNGalgameHamburger"
      class="bg-default-800/70 dark:bg-background/70 fixed top-0 left-0 z-1007 flex h-[100dvh] w-full items-center justify-center p-3 transition-all"
      @click.stop
      @click="showKUNGalgameHamburger = false"
    >
      <div
        class="absolute top-0 left-0 container h-dvh w-64 rounded-r-lg"
        @click.stop
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <KunLayoutSidebar class-name="static" :force-expanded="true" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-leave-active {
  transition-delay: 0.25s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .container,
.slide-leave-active .container {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from .container,
.slide-leave-to .container {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
