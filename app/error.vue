<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({ statusCode: 500 })
  }
})

const handleError = async () => {
  clearError({ redirect: '/' })
  await new Promise((resolve) => {
    setTimeout(resolve, 1007)
  })
  location.reload()
}
</script>

<template>
  <KunTopBar class-name="!pl-0" />

  <div
    class="flex min-h-dvh w-full items-center justify-center bg-white dark:bg-black"
  >
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="flex flex-col justify-center items-center gap-3"
    >
      <h1 class="text-danger text-3xl font-bold">{{ error.statusCode }}</h1>
      <KunNull
        :description="
          error.statusCode === 404
            ? '杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面不见了 ~ 是不是被你吃了?!'
            : '杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面出错了 ~ 是不是你干的?!'
        "
      />
      <div class="bg-default-100 w-full max-w-xl rounded-lg p-3 text-sm">
        {{ error.statusMessage }}
      </div>
      <KunButton variant="shadow" color="secondary" @click="handleError">
        一键转生为萝莉
      </KunButton>
    </KunCard>
  </div>
</template>
