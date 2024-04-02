<script setup lang="ts">
interface Items {
  i18n: string
  value: string
}

const props = defineProps<{
  items: Items[]
  defaultValue: string
}>()

const emits = defineEmits<{
  set: [value: string]
}>()
</script>

<template>
  <div class="kun-nav">
    <span
      v-for="(item, index) in items"
      :key="index"
      :class="defaultValue === item.value ? 'active' : ''"
      @click="emits('set', item.value)"
    >
      <span>
        {{ $t(`${item.i18n}`) }}
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.kun-nav {
  display: flex;
  align-items: center;

  & > span {
    cursor: pointer;
    padding: 3px 10px;

    &:first-child {
      padding-left: 0;
    }

    span {
      padding: 0 5px;
      padding-bottom: 5px;
    }
  }

  .active {
    span {
      color: var(--kungalgame-blue-5);
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}
</style>
