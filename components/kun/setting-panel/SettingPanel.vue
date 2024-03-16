<script setup lang="ts">
const isShowTransparency = ref(true)

const emits = defineEmits<{
  close: [showKUNGalgamePanel: boolean]
}>()

const handelCloseSettingsPanel = () => {
  emits('close', false)
}
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">
        <span>{{ $t('header.settings.name') }}</span>
        <span><Icon class="settings-icon" name="uiw:setting-o" /></span>
      </div>

      <KunSettingPanelComponentsMode />

      <KunSettingPanelComponentsSwitchLanguage />

      <div class="switch">
        <div class="menu">
          <span
            :class="isShowTransparency ? 'active' : ''"
            @click="isShowTransparency = true"
          >
            {{ $t('header.settings.trans') }}
          </span>
          <span
            :class="isShowTransparency ? '' : 'active'"
            @click="isShowTransparency = false"
          >
            {{ $t('header.settings.font') }}
          </span>
        </div>

        <TransitionGroup name="item" tag="div">
          <div class="item" v-if="isShowTransparency">
            <KunSettingPanelComponentsTransparency />
          </div>

          <div class="item" v-else-if="!isShowTransparency">
            <KunSettingPanelComponentsFont />
          </div>
        </TransitionGroup>
      </div>

      <KunSettingPanelComponentsBackground />

      <KunSettingPanelComponentsReset />
    </div>

    <KunSettingPanelComponentsLoli class="loli" />

    <div class="close">
      <Icon @click="handelCloseSettingsPanel" name="lucide:x" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  top: 75px;
  right: 0;
  position: absolute;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  box-shadow: var(--shadow);
  border-radius: 10px;
  display: flex;
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-blue-2);
}

.container {
  position: relative;
  margin: 20px;
  font-size: 17px;
}

.title {
  font-size: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
}

.settings-icon {
  animation: settings 3s linear infinite;
}

@keyframes settings {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.switch {
  display: flex;
  flex-direction: column;

  .menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 17px;
    border: 1px solid var(--kungalgame-blue-5);

    span {
      cursor: pointer;
      width: 100%;
      padding: 2px;
      display: flex;
      font-size: 15px;
      justify-content: center;
      color: var(--kungalgame-blue-5);
      transition: all 0.2s;

      &:nth-child(1) {
        border-right: 1px solid var(--kungalgame-blue-5);
      }
    }

    .active {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }
  }

  .item {
    width: 100%;
    height: 73px;
  }
}

.close {
  font-size: 25px;
  width: 270px;
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  cursor: pointer;
}

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

@media (max-width: 1000px) {
  .root {
    display: none;
  }
}
@media (max-height: 600px) {
  .root {
    right: -600px;
    transition: 0.5s;
  }
}
</style>
