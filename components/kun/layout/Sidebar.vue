<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    className?: string
    forceExpanded?: boolean
  }>(),
  { className: '', forceExpanded: false }
)

const { showKUNGalgameSidebarCollapsed } = storeToRefs(
  usePersistSettingsStore()
)

const isCollapsed = computed(
  () => !props.forceExpanded && showKUNGalgameSidebarCollapsed.value
)
</script>

<template>
  <div
    :class="
      cn(
        'scrollbar-hide sm:bg-default-100 bg-default-200 border-default/20 fixed z-20 flex h-full shrink-0 -translate-x-1 flex-col justify-between rounded-none border-r p-0 transition-all duration-300 sm:backdrop-blur-[var(--kun-background-blur)]',
        isCollapsed ? 'w-20' : 'w-3xs overflow-y-scroll',
        className
      )
    "
    @click.stop
  >
    <div class="space-y-3 p-3">
      <template v-if="!isCollapsed">
        <KunBrand />
      </template>
      <template v-else>
        <KunLink
          class-name="flex justify-center items-center gap-0"
          underline="none"
          to="/"
        >
          <KunImage
            class="size-12"
            src="/favicon.webp"
            :alt="kungal.titleShort"
          />
        </KunLink>
      </template>

      <Transition name="sidebar-switch" mode="out-in">
        <template v-if="!isCollapsed">
          <KunLayoutSideBarNav />
        </template>
        <template v-else>
          <KunLayoutSideBarCollapsed />
        </template>
      </Transition>
    </div>

    <div>
      <template v-if="!isCollapsed">
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
      </template>
      <template v-else>
        <div class="flex flex-col items-center gap-2 px-3 pb-4">
          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            class-name="flex-col gap-0"
            :href="kungal.github"
            target="_blank"
            title="GitHub"
          >
            <KunIcon class="icon text-xl" name="lucide:github" />
          </KunButton>

          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            class-name="flex-col gap-0"
            href="/rss"
            title="RSS"
            target="_blank"
          >
            <KunIcon class="icon text-xl" name="lucide:rss" />
          </KunButton>

          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            class-name="flex-col gap-0"
            :href="kungal.domain.telegram_group"
            target="_blank"
            title="Telegram"
          >
            <KunIcon class="icon text-xl" name="ph:telegram-logo" />
          </KunButton>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.sidebar-switch-enter-active,
.sidebar-switch-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.sidebar-switch-enter-from,
.sidebar-switch-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
