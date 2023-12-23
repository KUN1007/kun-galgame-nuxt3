<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/en'

const props = defineProps<{
  time: number | string
}>()

const { locale, setLocale } = useI18n()

dayjs.locale('en')
const formattedCNDate = dayjs(props.time).format('YYYY年MM月DD日-HH:mm:ss')
const formattedENDate = dayjs(props.time).format('M / D, YYYY - h:mm:ss A')

const loliTime = computed(() => {
  if (locale.value === 'en') {
    return formattedENDate
  }

  if (locale.value === 'zh') {
    return formattedCNDate
  }

  return ''
})
</script>

<!-- Whether it's a rewrite -->
<!-- Why isn't there i18n here? Don't ask me why, the answer is Rewrite, ahahaha -->
<template>
  <span>{{ `Rewrite at ${loliTime}` }}</span>
</template>

<style lang="scss" scoped>
span {
  margin: 0 10px;
  font-size: 12px;
  letter-spacing: 1px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);
}

@media (max-width: 1000px) {
  span {
    margin-right: 10px;
  }
}
</style>
