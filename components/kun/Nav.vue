<script setup lang="ts">
interface Items {
  textValue?: string
  icon?: string
  value: string
}

defineProps<{
  items: Items[]
  defaultValue: string
  iconSize?: string
}>()

const emits = defineEmits<{
  set: [value: string]
}>()
</script>

<template>
  <div class="inline-flex">
    <div
      class="scrollbar-hide bg-default-100 flex h-fit flex-nowrap items-center gap-2 overflow-x-scroll rounded-lg p-1"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        @click="emits('set', item.value)"
        class="py-1"
      >
        <span v-if="item.icon" class="p-2" :style="{ 'font-size': iconSize }">
          <Icon class="icon" :name="item.icon" />
        </span>
        <span
          :class="
            cn(
              defaultValue === item.value
                ? 'bg-primary text-white'
                : 'hover:text-primary',
              'cursor-pointer rounded-lg px-3 py-2 transition-colors'
            )
          "
          v-if="item.textValue"
        >
          {{ item.textValue }}
        </span>
      </div>
    </div>
  </div>
</template>
