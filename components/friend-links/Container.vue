<script setup lang="ts">
import { friendArray } from '~/config/friend'
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    class-name="pb-12"
  >
    <KunHeader
      name="友情链接"
      description="我们非常重视合作, 因为在我们网站的建设过程中, 受到了来自世界各地朋友的帮助, 我们与下面的网站都是朋友关系, 我们衷心的为能和这些网站成为朋友感到荣幸"
    >
      <template #endContent>
        <b class="text-default-700">
          如果下列网站出现了任何的付费行为, 请随时联系我们撤销友情链接!
        </b>
      </template>
    </KunHeader>

    <template v-for="(friendGroup, index) in friendArray" :key="index">
      <h2 class="mb-4 text-2xl font-bold">
        {{ friendGroup.label }}
      </h2>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KunLink
          color="default"
          underline="none"
          v-for="(friend, i) in friendGroup.value"
          :key="i"
          :to="friend.link"
          target="_blank"
          class-name="block transform rounded-lg p-4 shadow transition-all duration-200 hover:-translate-y-2 hover:shadow-lg"
        >
          <div class="mb-2 flex items-center">
            <span class="text-lg font-bold">
              {{ friend.name }}
            </span>
            <span
              v-if="friend.status"
              class="ml-2 text-sm text-neutral-600 dark:text-neutral-400"
            >
              {{ friend.status }}
            </span>
          </div>
          <div class="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
            {{
              friend.label.length > 107
                ? `${friend.label.slice(0, 107)}...`
                : friend.label
            }}
          </div>
          <NuxtImg
            :src="`/friends/${friend.banner}.webp`"
            class="h-auto w-full rounded-md"
          />
        </KunLink>
      </div>
    </template>

    <div class="flex flex-col items-center justify-center gap-3">
      <KunLink underline="none" to="/doc/notice/contact">
        <h3 class="text-primary text-xl font-bold">加入我们</h3>
      </KunLink>

      <p class="text-sm text-neutral-600 dark:text-neutral-400">
        要加入我们, 请加入我们的群组, 提供您的网站链接
      </p>
    </div>
  </KunCard>
</template>
