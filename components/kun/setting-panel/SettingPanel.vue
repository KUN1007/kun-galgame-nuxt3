<script setup lang="ts">
const localePath = useLocalePath()

const showItemIndex = ref(1)

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
        <span>
          <Icon
            @click="navigateTo(localePath('/rss'))"
            class="rss-icon"
            name="lucide:rss"
          />
          <Icon class="settings-icon" name="uiw:setting-o" />
        </span>
      </div>

      <KunSettingPanelComponentsMode />

      <KunSettingPanelComponentsSwitchLanguage />

      <div class="switch">
        <div class="menu">
          <span
            :class="showItemIndex === 1 ? 'active' : ''"
            @click="showItemIndex = 1"
          >
            <Icon name="mdi:circle-transparent" />
          </span>
          <span
            :class="showItemIndex === 2 ? 'active' : ''"
            @click="showItemIndex = 2"
          >
            <Icon name="tabler:blur" />
          </span>
          <span
            :class="showItemIndex === 3 ? 'active' : ''"
            @click="showItemIndex = 3"
          >
            <Icon name="ci:font" />
          </span>
        </div>

        <TransitionGroup name="item" tag="div">
          <div class="item" v-if="showItemIndex === 1">
            <KunSettingPanelComponentsTransparency />
          </div>

          <div class="item" v-if="showItemIndex === 2">
            <KunSettingPanelComponentsBlur />
          </div>

          <div class="item" v-else-if="showItemIndex === 3">
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
  display: flex;
  border: 1px solid var(--kungalgame-blue-2);

  @include kun-blur;
  backdrop-filter: blur(10px);
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

  .rss-icon {
    cursor: pointer;
    margin-right: 17px;
  }

  .settings-icon {
    animation: settings 3s linear infinite;
  }
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
    margin-bottom: 17px;

    span {
      cursor: pointer;
      border-radius: 10px;
      padding: 5px 7px;
      font-size: 20px;

      @include kun-center;
    }

    .active {
      box-shadow: var(--shadow);
      background-color: var(--kungalgame-trans-blue-0);
      color: var(--kungalgame-blue-5);
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
