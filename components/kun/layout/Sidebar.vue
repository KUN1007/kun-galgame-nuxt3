<script setup lang="ts">
const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <div
    class="scrollbar-hide bg-default-100 fixed z-50 flex h-full w-3xs shrink-0 flex-col justify-between overflow-y-scroll"
    @click.stop
  >
    <div>
      <div
        class="flex cursor-pointer items-center gap-3 p-3"
        @click="navigateTo('/')"
      >
        <!-- <NuxtImg class="size-10" src="/favicon.webp" :alt="kungal.titleShort" />
        <span class="text-xl">{{ kungal.name }}</span>
        <span
          class="bg-primary-100 text-primary rounded-full px-3 py-1 text-sm"
        >
          论坛
        </span> -->
        ACME
      </div>

      <KunLayoutSideBarNav />

      <KunButton
        :full-width="true"
        variant="light"
        @click="showKUNGalgamePanel = !showKUNGalgamePanel"
      >
        <span
          class="mr-3 flex items-center justify-center text-xl text-inherit"
        >
          <Icon class="text-inherit" name="lucide:settings" />
        </span>
        <span class="text-inherit">网站设置</span>
      </KunButton>
    </div>

    <div class="my-4 flex w-full justify-around">
      <a
        class="flex flex-col items-center justify-center"
        aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
        :href="kungal.github"
        target="_blank"
      >
        <span><Icon class="icon" name="lucide:github" /></span>
        <span class="text-xs">GitHub</span>
      </a>

      <NuxtLink class="flex flex-col items-center justify-center" to="/rss">
        <span><Icon class="icon" name="lucide:rss" /></span>
        <span class="text-xs">RSS</span>
      </NuxtLink>

      <a
        class="flex flex-col items-center justify-center"
        aria-label="KUN Visual Novel Official Telegram Group"
        :href="kungal.domain.telegram_group"
        target="_blank"
      >
        <span><Icon class="icon" name="ph:telegram-logo" /></span>
        <span class="text-xs">Telegram</span>
      </a>
    </div>
  </div>
</template>
