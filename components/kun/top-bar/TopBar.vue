<script setup lang="ts">
import 'animate.css'

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
      <KeepAlive>
        <LazyKunSettingPanel
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  margin-bottom: 17px;
  flex-shrink: 0;
  color: var(--kungalgame-font-color-3);
  padding: 0 50px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    backdrop-filter: blur(var(--kun-background-blur));
    will-change: transform;
  }
}

.settings-panel {
  z-index: 999;
}

@media (max-width: 700px) {
  .header {
    margin-bottom: 5px;
    padding: 0 16px;
  }
}
</style>
