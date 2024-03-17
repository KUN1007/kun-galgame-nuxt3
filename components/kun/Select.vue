<script setup lang="ts">
const container = ref<HTMLElement>()
const isShowOptions = ref(false)

const props = defineProps<{
  options: string[]
  position?: 'top' | 'bottom'
}>()
const position = computed(() => (props.position ? props.position : 'bottom'))

const emit = defineEmits<{
  set: [value: string]
}>()

const handleClickShowLanguage = () => {
  isShowOptions.value = true
  container.value?.focus()
}
</script>

<template>
  <div
    ref="container"
    tabindex="-1"
    @blur="isShowOptions = false"
    class="kun-select"
  >
    <div class="kun-chooser" @click="handleClickShowLanguage">
      <span>{{ $t(`header.settings.${props.options[0]}`) }}</span>
      <Icon class="icon" name="lucide:chevron-down" />
    </div>

    <Transition :name="position">
      <div v-if="isShowOptions" class="options" :class="position">
        <span
          v-for="(kun, index) in props.options"
          :key="index"
          @click.stop.prevent="emit('set', kun)"
          v-once
        >
          {{ $t(`header.settings.${kun}`) }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.kun-select {
  position: relative;
  cursor: pointer;
}

.kun-chooser {
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon {
    font-size: 18px;
    color: var(--kungalgame-blue-5);
  }
}

.options {
  width: 100px;
  position: absolute;
  padding: 7px;
  border: 1px solid var(--kungalgame-trans-blue-1);
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--shadow);

  span {
    font-size: 15px;
    display: flex;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--kungalgame-blue-0);
    }
  }
}

.top {
  bottom: 27px;
}

.bottom {
  top: 27px;
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
