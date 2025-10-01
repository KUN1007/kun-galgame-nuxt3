<script setup lang="ts">
import type { KunFrontmatter } from '../type'

defineProps<{
  metadata: KunFrontmatter
}>()
</script>

<template>
  <KunCard :is-hoverable="false" class-name="border-none">
    <div class="relative mb-6 w-full overflow-hidden rounded-lg">
      <KunImage
        :alt="metadata.title"
        class="object-cover"
        :src="metadata.banner"
        width="100%"
        height="100%"
        data-kun-lazy-image
      />
    </div>

    <div class="flex flex-col gap-3">
      <h1 class="text-2xl font-bold tracking-tight sm:text-4xl">
        {{ metadata.title }}
      </h1>

      <div class="flex items-center gap-3">
        <KunAvatar
          size="xl"
          :user="{
            id: metadata.authorUid,
            name: metadata.authorName,
            avatar: metadata.authorAvatar
          }"
        />
        <div class="flex flex-col gap-1">
          <h2 class="text-small leading-none font-semibold">
            {{ metadata.authorName }}
          </h2>
          <div class="text-default-500 flex items-center gap-2">
            <KunIcon name="lucide:calendar-days" />
            <p class="text-small text-inherit">
              {{
                formatDate(metadata.publishedTime, {
                  isPrecise: true,
                  isShowYear: true
                })
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-primary/10 text-primary-700 rounded-lg p-3 text-sm">
        {{ metadata.description }}
      </div>
    </div>
  </KunCard>
</template>
