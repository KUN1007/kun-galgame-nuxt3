<script setup lang="ts">
const props = defineProps<{
  time: number
}>()

const { locale } = useI18n()
const { formattedENDate, formattedCNDate } = formatTimeI18n(props.time)

const loliTime = computed(() => {
  if (locale.value === 'en-us') {
    return formattedENDate
  }

  if (locale.value === 'zh-cn') {
    return formattedCNDate
  }

  return ''
})
</script>

<template>
  <div class="time">
    <span>{{ loliTime }}</span>
  </div>
</template>

<style lang="scss" scoped>
.time {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: small;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  color: var(--kungalgame-font-color-3);
  div {
    padding-right: 20px;
  }
}
</style>
