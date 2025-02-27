<script setup lang="ts">
const showItemIndex = ref(1)
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex items-center justify-between">
      可配置选项

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
      </div>
    </div>

    <TransitionGroup name="item" tag="div">
      <div class="w-full" v-if="showItemIndex === 1">
        <KunSettingPanelComponentsTransparency />
      </div>

      <div class="w-full" v-if="showItemIndex === 2">
        <KunSettingPanelComponentsBlur />
      </div>

      <div class="w-full" v-else-if="showItemIndex === 3">
        <KunSettingPanelComponentsFont />
      </div>
    </TransitionGroup>
  </div>
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
