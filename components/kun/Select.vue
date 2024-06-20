<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = defineProps<{
  options: string[]
  styles?: CSSProperties
  i18n: string
  position?: 'top' | 'bottom'
  defaultValue?: string
}>()
const position = computed(() => (props.position ? props.position : 'bottom'))

const container = ref<HTMLElement>()
const isShowOptions = ref(false)
const checkedValue = ref(props.defaultValue ?? '')

const emit = defineEmits<{
  set: [value: string, index: number]
}>()

const handleClickShowLanguage = () => {
  isShowOptions.value = true
  container.value?.focus()
}

const handleSetOption = (value: string, index: number) => {
  emit('set', value, index)
  checkedValue.value = value
}
</script>

<template>
  <div class="kun-select" :style="props.styles">
    <div
      ref="container"
      tabindex="-1"
      @blur="isShowOptions = false"
      class="kun-chooser"
      @click="handleClickShowLanguage"
    >
      <slot />
      <Icon class="icon" name="lucide:chevron-down" />
    </div>

    <Transition :name="position">
      <div v-if="isShowOptions" class="options" :class="position">
        <span
          v-for="(kun, index) in props.options"
          :key="index"
          @click.stop.prevent="handleSetOption(kun, index)"
        >
          <span>{{ $t(`${i18n}.${kun}`) }}</span>
          <span v-if="checkedValue === kun">
            <Icon name="lucide:check" />
          </span>
        </span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.kun-select {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.kun-chooser {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon {
    font-size: 18px;
    color: var(--kungalgame-blue-5);
  }
}

.options {
  width: 100%;
  position: absolute;
  padding: 7px;
  border: 1px solid var(--kungalgame-trans-blue-1);
  z-index: 9999;

  @include kun-blur;

  & > span {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--kungalgame-blue-0);
    }
  }
}

.top {
  bottom: 100%;
}

.bottom {
  top: 100%;
}

.top-enter-active,
.top-leave-active {
  transition: all 0.2s ease-in-out;
}

.top-enter-from,
.top-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.bottom-enter-active,
.bottom-leave-active {
  transition: all 0.2s ease-in-out;
}

.bottom-enter-from,
.bottom-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
