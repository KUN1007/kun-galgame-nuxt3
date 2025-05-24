<script setup lang="ts">
defineProps<{
  className?: string
}>()

const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <div
    :class="
      cn(
        'scrollbar-hide sm:bg-default-100 bg-default-200 fixed z-50 flex h-full w-3xs shrink-0 -translate-x-1 flex-col justify-between overflow-y-scroll rounded-none border-none p-0 shadow-none sm:backdrop-blur-[var(--kun-background-blur)]',
        className
      )
    "
    @click.stop
  >
    <div class="space-y-3 p-3">
      <KunBrand />

      <KunLayoutSideBarNav />

      <KunButton
        :full-width="true"
        variant="light"
        @click="showKUNGalgamePanel = !showKUNGalgamePanel"
      >
        <span
          class="mr-3 flex items-center justify-center text-xl text-inherit"
        >
          <KunIcon class="text-inherit" name="lucide:settings" />
        </span>
        <span class="text-inherit">网站设置</span>
      </KunButton>
    </div>

    <div>
      <KunLayoutSideBarExternal />

      <div class="flex w-full justify-between px-7 py-6">
        <KunLink
          underline="none"
          color="default"
          class-name="flex-col gap-0"
          :to="kungal.github"
          target="_blank"
        >
          <KunIcon class="icon" name="lucide:github" />
          <span class="text-xs">GitHub</span>
        </KunLink>

        <KunLink
          underline="none"
          color="default"
          class-name="flex-col gap-0"
          to="/rss"
        >
          <KunIcon class="icon" name="lucide:rss" />
          <span class="text-xs">RSS</span>
        </KunLink>

        <KunLink
          underline="none"
          color="default"
          class-name="flex-col gap-0"
          :to="kungal.domain.telegram_group"
          target="_blank"
        >
          <KunIcon class="icon" name="ph:telegram-logo" />
          <span class="text-xs">Telegram</span>
        </KunLink>
      </div>
    </div>
  </div>
</template>
