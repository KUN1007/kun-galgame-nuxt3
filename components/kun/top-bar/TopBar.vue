<script setup lang="ts">
import 'animate.css'

const KUNGalgameSettingsPanel = defineAsyncComponent(
  () => import('../setting-panel/SettingPanel.vue')
)

const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <div class="header">
    <KunTopBarNav />

    <KunTopBarAvatar />
  </div>

  <div class="settings-panel">
    <Transition
      enter-active-class="animate__animated animate__jackInTheBox animate__faster"
      leave-active-class="animate__animated animate__fadeOutRight animate__faster"
    >
      <KeepAlive :exclude="['PageWidth', 'Font']">
        <KUNGalgameSettingsPanel
          v-if="showKUNGalgamePanel"
          @close="showKUNGalgamePanel = false"
        />
      </KeepAlive>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 58px;
  box-shadow: 0 2px 4px 0 var(--kungalgame-trans-blue-1);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  margin-bottom: 17px;
  flex-shrink: 0;
  color: var(--kungalgame-font-color-3);
}

.settings-panel {
  z-index: 999;
}
</style>
