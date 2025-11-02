<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    headline?: string
    description?: string
    icon?: string
  }>(),
  {
    headline: kungal.title,
    description: kungal.description,
    icon: `${kungal.domain.main}/apple-touch-icon.png`
  }
)
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center bg-white py-8"
  >
    <img
      :src="`${kungal.domain.main}/og-bg.png`"
      class="absolute opacity-20"
      alt="og background"
    />

    <div
      class="mx-auto flex size-full max-w-[1000px] flex-row items-center justify-between"
    >
      <div class="flex flex-col gap-3">
        <h1
          class="m-0 flex max-w-[850px] items-center text-[65px] font-semibold"
        >
          <span>{{ title }}</span>
        </h1>
        <p
          v-if="description"
          class="max-w-[700px] text-[34px] leading-tight text-[#4c4c52]"
        >
          {{ description.slice(0, 200) }}
        </p>

        <p
          v-if="headline"
          class="max-w-[700px] text-[26px] font-semibold text-[#0070f0]"
        >
          {{ headline.slice(0, 60) }}
        </p>
      </div>
      <div class="flex justify-center">
        <img :src="icon" :alt="title" class="size-40" />
      </div>
    </div>
  </div>
</template>
