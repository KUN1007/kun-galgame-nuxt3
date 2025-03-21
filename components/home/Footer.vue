<script setup lang="ts">
const siteList = [
  { name: '补丁', href: kungal.domain.patch },
  { name: '表情包', href: kungal.domain.sticker },
  { name: '导航网站', href: kungal.domain.nav },
  { name: '开发文档', href: kungal.domain.doc }
]
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false">
    <footer class="space-y-2 text-sm">
      <div class="flex justify-center gap-2">
        <a
          v-for="(site, index) in siteList"
          :key="index"
          :href="site.href"
          target="_blank"
          class="text-primary underline underline-offset-3"
        >
          {{ site.name }}
        </a>
      </div>

      <div class="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <div class="flex items-center gap-2">
          <a :href="kungal.domain.main" target="_blank">
            <NuxtImg
              class="h-8 w-8"
              src="/favicon.webp"
              :aria-label="kungal.titleShort"
              :alt="kungal.titleShort"
            />
          </a>
          <span>{{ `© 2024 ${kungal.titleShort}` }}</span>
        </div>

        <div class="flex items-center gap-1">
          <a
            class="text-primary underline underline-offset-3"
            :href="kungal.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {{
            `开源 | 版本 ${useRuntimeConfig().public.KUN_VISUAL_NOVEL_VERSION}`
          }}
        </div>
      </div>
    </footer>
  </KunCard>
</template>
