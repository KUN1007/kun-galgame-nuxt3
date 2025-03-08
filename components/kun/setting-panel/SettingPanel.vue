<script setup lang="ts">
const { showKUNGalgameBackLoli } = storeToRefs(usePersistSettingsStore())
const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <KunModal
    :modal-value="showKUNGalgamePanel"
    @update-value="(value) => (showKUNGalgamePanel = value)"
  >
    <div class="relative flex justify-between">
      <div class="relative shrink-0 space-y-4">
        <div class="flex items-center gap-2 text-lg">
          <span>设置面板</span>
          <Icon
            class="hover:text-primary cursor-pointer"
            name="lucide:circle-help"
          />
        </div>

        <KunSettingPanelComponentsMode />

        <KunSettingPanelComponentsConfigItems />

        <div class="ml-auto flex justify-between gap-2">
          显示琥珀
          <KunSwitch v-model="showKUNGalgameBackLoli" />
        </div>

        <KunSettingPanelComponentsBackground />

        <KunSettingPanelComponentsReset />
      </div>

      <KunSettingPanelComponentsLoli />

      <KunButton
        color="default"
        variant="light"
        class-name="absolute right-0"
        rounded="full"
        size="lg"
        :is-icon-only="true"
        @click="showKUNGalgamePanel = false"
      >
        <Icon class="icon" name="lucide:x" />
      </KunButton>
    </div>
  </KunModal>
</template>

<style lang="scss" scoped>
.item-move,
.item-enter-active,
.item-leave-active {
  transition: all 0.5s ease;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateY(77px);
}

.item-leave-active {
  position: absolute;
}
</style>
