<script setup lang="ts">
import img from './loli'
import 'animate.css'

const { showInfo, infoMsg, durations } = storeToRefs(useComponentMessageStore())

const { loli, name } = img
const timer = ref<NodeJS.Timeout | null>()
const progressWidth = ref('')

const handleClose = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }

  showInfo.value = false
}

watch(
  () => showInfo.value,
  (newValue) => {
    if (newValue) {
      const startTime = Date.now()
      timer.value = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        const elapsedPercentage = (elapsedTime / durations.value) * 100
        const remainingPercentage = Math.max(1, 100 - elapsedPercentage)
        progressWidth.value = remainingPercentage + '%'
        if (remainingPercentage <= 1 && timer.value) {
          clearInterval(timer.value)
          timer.value = null
          showInfo.value = false
        }
      }, 10)
    } else if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
)
</script>

<template>
  <Teleport to="body" :disabled="!showInfo">
    <Transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div
        class="bg-background fixed right-0 bottom-0 left-0 z-2000 min-h-30 w-full border-t"
        v-if="showInfo"
      >
        <Transition
          enter-active-class="animate__animated animate__swing"
          appear
        >
          <div class="loli absolute -top-10 pl-24 text-lg sm:pl-32">
            <span
              class="bg-background px-10 py-1 text-center text-lg sm:text-2xl"
            >
              {{ name }}
            </span>
          </div>
        </Transition>

        <div class="pointer-events-none absolute mt-2 ml-6 select-none">
          <NuxtImg class="h-16 w-full sm:h-24" :src="loli" />
        </div>

        <Transition
          enter-active-class="animate__animated animate__bounceInRight animate__faster"
          appear
        >
          <!-- A ha ha ha! You probably didn't expect that this was inspired by しゅがてん！-Sugarfull tempering- -->
          <div class="info mt-4 mr-8 ml-24 text-base sm:ml-32 sm:text-lg">
            {{ `「 ${infoMsg} 」` }}
          </div>
        </Transition>

        <KunButton
          color="default"
          variant="light"
          class-name="absolute top-0 right-0"
          rounded="full"
          size="lg"
          :is-icon-only="true"
          @click="handleClose"
        >
          <Icon name="lucide:x" />
        </KunButton>

        <span
          :style="{
            width: progressWidth
          }"
          class="bg-primary absolute top-0 right-0 h-1.5"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.loli {
  filter: drop-shadow(2px 4px 3px var(--color-primary-300));

  span {
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0 50%);
  }
}

.info {
  color: var(--color-white);
  text-shadow:
    0 1px var(--color-foreground),
    1px 0 var(--color-foreground),
    -1px 0 var(--color-foreground),
    0 -1px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground),
    1px 2px var(--color-foreground);
}
</style>
