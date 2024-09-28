<script setup lang="ts">
interface Items {
  i18n?: string
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
  <div class="kun-nav">
    <span
      v-for="(item, index) in items"
      :key="index"
      :class="defaultValue === item.value ? 'active' : ''"
      @click="emits('set', item.value)"
    >
      <span v-if="item.icon" :style="{ 'font-size': iconSize }">
        <Icon class="icon" :name="item.icon" />
      </span>
      <span v-if="item.i18n">
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

    &:hover {
      color: var(--kungalgame-blue-5);
    }

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
      border-bottom: 3px solid var(--kungalgame-blue-5);
    }
  }
}
</style>
