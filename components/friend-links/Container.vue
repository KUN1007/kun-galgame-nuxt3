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
        <KunCard
          :is-pressable="true"
          :dark-border="true"
          v-for="(friend, i) in friendGroup.value"
          :key="i"
          :to="friend.link"
          target="_blank"
        >
          <div class="mb-2 flex items-center gap-2">
            <span class="text-lg font-bold">
              {{ friend.name }}
            </span>
            <KunBadge v-if="friend.status" color="danger">已下线</KunBadge>
          </div>
          <div class="text-default-600 mb-3 text-sm">
            {{
              friend.label.length > 107
                ? `${friend.label.slice(0, 107)}...`
                : friend.label
            }}
          </div>
          <KunImage
            :src="`/friends/${friend.banner}.webp`"
            class="h-auto w-full rounded-md"
          />
        </KunCard>
      </div>
    </template>

    <div class="flex flex-col items-center justify-center gap-3">
      <KunLink underline="none" to="/doc/notice/contact">
        <h3 class="text-primary text-xl font-bold">加入我们</h3>
      </KunLink>

      <p class="text-default-600 text-sm">
        要加入我们, 请加入我们的群组, 提供您的网站链接
      </p>
    </div>
  </KunCard>
</template>
