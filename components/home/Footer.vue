<script setup lang="ts">
const siteList = [
  { name: '补丁站', href: kungal.domain.patch },
  { name: '表情包', href: kungal.domain.sticker },
  { name: '导航网站', href: kungal.domain.nav },
  { name: '开发文档', href: kungal.domain.doc }
]
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false">
    <footer class="space-y-2 text-sm">
      <div class="flex justify-center gap-2">
        <KunLink
          size="sm"
          v-for="(site, index) in siteList"
          :key="index"
          :to="site.href"
          target="_blank"
        >
          {{ site.name }}
        </KunLink>
      </div>

      <div class="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <div class="flex items-center gap-2">
          <a :href="kungal.domain.main" target="_blank">
            <KunImage
              class="h-8 w-8 rounded-2xl"
              src="/favicon.webp"
              :aria-label="kungal.titleShort"
              :alt="kungal.titleShort"
            />
          </a>
          <span>{{ `© 2023 ~ Forever! ${kungal.titleShort}` }}</span>
        </div>

        <div class="flex items-center gap-1">
          <KunLink
            :to="kungal.github"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </KunLink>
          {{
            `开源 | 版本 ${useRuntimeConfig().public.KUN_VISUAL_NOVEL_VERSION}`
          }}
        </div>
      </div>
    </footer>
  </KunCard>
</template>
