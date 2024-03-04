<script setup lang="ts">
import 'animate.css'

const { autosaveCount } = storeToRefs(useTempEditStore())
const isShowSettingsMenu = ref(false)
const settingsPanelActive = ref('')

const handelClickSettings = () => {
  isShowSettingsMenu.value = !isShowSettingsMenu.value
  if (isShowSettingsMenu.value) {
    settingsPanelActive.value = 'settings-icon-active'
  } else {
    settingsPanelActive.value = ''
  }
}

const handelCloseSettingsMenu = () => {
  isShowSettingsMenu.value = false
  settingsPanelActive.value = ''
}
</script>

<template>
  <div class="container">
    <div class="settings">
      <span
        @click="handelClickSettings"
        class="settings-icon"
        :class="settingsPanelActive"
      >
        <Icon name="uiw:setting-o" />
      </span>

      <span class="save">
        {{ `${$t('edit.save')} × ${autosaveCount}` }}
      </span>
    </div>

    <KunMilkdownComponentsMenu
      @close="handelCloseSettingsMenu"
      :is-show-settings-menu="isShowSettingsMenu"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings {
  color: var(--kungalgame-font-color-1);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .settings-icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .save {
    margin-left: 17px;
    font-size: 15px;
  }
}

.settings-icon-active {
  color: var(--kungalgame-blue-5);
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
</style>
