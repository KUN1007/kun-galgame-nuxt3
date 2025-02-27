<script setup lang="ts">
const { showKUNGalgameBackLoli } = storeToRefs(usePersistSettingsStore())

const showItemIndex = ref(1)

const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <KunModal
    :modal-value="showKUNGalgamePanel"
    @update-value="(value) => (showKUNGalgamePanel = value)"
  >
    <div class="relative flex justify-between">
      <div class="relative">
        <div class="flex items-center justify-between text-lg">
          <span>设置面板</span>
          <span>
            <Icon
              @click="navigateTo('/rss')"
              class="rss-icon"
              name="lucide:rss"
            />
            <Icon class="settings-icon" name="uiw:setting-o" />
          </span>
        </div>

        <KunSettingPanelComponentsMode />

        <div class="flex flex-col space-y-4">
          <div class="flex items-center">
            <span
              :class="
                cn(
                  'flex rounded-lg p-2 transition-colors',
                  showItemIndex === 1 ? 'bg-primary-50 text-primary shadow' : ''
                )
              "
              @click="showItemIndex = 1"
            >
              <Icon class="text-inherit" name="mdi:circle-transparent" />
            </span>
            <span
              :class="
                cn(
                  'flex rounded-lg p-2 transition-colors',
                  showItemIndex === 2 ? 'bg-primary-50 text-primary shadow' : ''
                )
              "
              @click="showItemIndex = 2"
            >
              <Icon class="text-inherit" name="tabler:blur" />
            </span>
            <span
              :class="
                cn(
                  'flex rounded-lg p-2 transition-colors',
                  showItemIndex === 3 ? 'bg-primary-50 text-primary shadow' : ''
                )
              "
              @click="showItemIndex = 3"
            >
              <Icon class="text-inherit" name="ci:font" />
            </span>

            <span
              class="loli"
              v-tooltip="{
                message: '是否显示琥珀',
                position: 'bottom'
              }"
            >
              <KunSwitch v-model="showKUNGalgameBackLoli" />
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

        <KunSettingPanelComponentsBackground class="background" />

        <KunSettingPanelComponentsReset />
      </div>

      <KunSettingPanelComponentsLoli />

      <div class="absolute right-0">
        <Icon
          class="icon"
          @click="showKUNGalgamePanel = false"
          name="lucide:x"
        />
      </div>
    </div>
  </KunModal>
</template>

<style lang="scss" scoped>
.switch {
  display: flex;
  flex-direction: column;

  .menu {
    display: flex;
    align-items: center;
    margin-bottom: 17px;

    span {
      cursor: pointer;
      border-radius: 10px;
      padding: 5px 7px;
      font-size: 20px;
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
</style>
