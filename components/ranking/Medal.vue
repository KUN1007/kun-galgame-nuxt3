<script setup lang="ts">
defineProps<{
  index: number
}>()

const getIndexClasses = (index: number) => {
  if (index === 0) {
    return 'text-warning-700 bg-warning-500/50'
  }
  if (index === 1) {
    return 'text-default-700 bg-default-500/50'
  }
  if (index === 2) {
    return 'text-info-700 bg-info-500/50'
  }
  return 'text-sm text-default-700 bg-default-500/50 px-1.5'
}
</script>

<template>
  <div class="contents">
    <div class="absolute right-1 bottom-1 flex sm:hidden">
      <span
        :class="
          cn(
            'text-default-500 flex items-center justify-center rounded-full px-2 text-xl font-bold',
            getIndexClasses(index)
          )
        "
      >
        {{ index + 1 }}
      </span>
    </div>

    <div class="hidden w-10 shrink-0 items-center justify-center sm:flex">
      <Icon
        v-if="index === 0"
        name="fluent-emoji-flat:1st-place-medal"
        class="h-8 w-8"
      />
      <Icon
        v-else-if="index === 1"
        name="fluent-emoji-flat:2nd-place-medal"
        class="h-8 w-8"
      />
      <Icon
        v-else-if="index === 2"
        name="fluent-emoji-flat:3rd-place-medal"
        class="h-8 w-8"
      />
      <span v-else class="text-default-500 text-xl font-bold">
        {{ index + 1 }}
      </span>
    </div>
  </div>
</template>
