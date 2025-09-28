<script setup lang="ts">
interface Props {
  text?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  position: 'top',
  className: ''
})

const isVisible = ref(false)

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-2'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-2'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-2'
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2'
  }
})

const arrowPositionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-[-4px] left-1/2 -translate-x-1/2'
    case 'bottom':
      return 'top-[-4px] left-1/2 -translate-x-1/2'
    case 'left':
      return 'right-[-4px] top-1/2 -translate-y-1/2'
    case 'right':
      return 'left-[-4px] top-1/2 -translate-y-1/2'
    default:
      return 'bottom-[-4px] left-1/2 -translate-x-1/2'
  }
})

const transitionClasses = computed(() => {
  const common = 'opacity-0'
  switch (props.position) {
    case 'top':
      return { from: `${common} translate-y-1`, to: `${common} translate-y-1` }
    case 'bottom':
      return {
        from: `${common} -translate-y-1`,
        to: `${common} -translate-y-1`
      }
    case 'left':
      return { from: `${common} translate-x-1`, to: `${common} translate-x-1` }
    case 'right':
      return {
        from: `${common} -translate-x-1`,
        to: `${common} -translate-x-1`
      }
    default:
      return { from: `${common} translate-y-1`, to: `${common} translate-y-1` }
  }
})

const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}
</script>

<template>
  <div
    :class="cn('relative inline-block', className)"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <Transition
      enter-active-class="transition duration-200 ease-out"
      :enter-from-class="transitionClasses.from"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      :leave-to-class="transitionClasses.to"
    >
      <div
        v-if="isVisible"
        :class="
          cn(
            'absolute z-50 hidden rounded-lg border bg-white px-3 py-2 text-sm font-medium whitespace-nowrap sm:block dark:bg-black',
            positionClasses
          )
        "
        role="tooltip"
      >
        <slot name="content">
          {{ text }}
        </slot>

        <div
          :class="
            cn(
              'absolute h-2 w-2 rotate-45 transform bg-white dark:bg-black',
              arrowPositionClasses
            )
          "
        />
      </div>
    </Transition>
  </div>
</template>
