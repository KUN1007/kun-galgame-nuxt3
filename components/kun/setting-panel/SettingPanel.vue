<script setup lang="ts">
const { showKUNGalgameBackLoli } = storeToRefs(usePersistSettingsStore())
const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <KunModal
    :modal-value="showKUNGalgamePanel"
    @update:modal-value="(value) => (showKUNGalgamePanel = value)"
    inner-class-name="overflow-visible"
  >
    <div class="relative flex justify-between">
      <div class="relative shrink-0 space-y-4">
        <div class="flex w-67 items-center gap-2 text-lg sm:w-58">
          <span>设置面板</span>

          <KunTooltip class-name="flex" text="设置面板帮助" position="bottom">
            <KunLink
              to="/doc/help/setting-panel-help"
              color="default"
              class="hover:text-primary"
            >
              <KunIcon name="lucide:circle-help" />
            </KunLink>
          </KunTooltip>
        </div>

        <KunSettingPanelComponentsMode />

        <KunSettingPanelComponentsConfigItems />

        <div class="ml-auto flex justify-between gap-2">
          显示琥珀
          <KunTooltip
            class-name="flex"
            text="是否显示网站右下角这只可爱的孩子"
            position="bottom"
          >
            <KunSwitch v-model="showKUNGalgameBackLoli" />
          </KunTooltip>
        </div>

        <KunSettingPanelComponentsNSFW />

        <KunSettingPanelComponentsBackground />

        <KunSettingPanelComponentsReset />
      </div>

      <KunSettingPanelComponentsLoli />
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
