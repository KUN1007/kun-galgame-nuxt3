<script setup lang="ts">
const props = defineProps<{
  showHelp?: boolean
  classname?: string
}>()

const isShow = ref(false)
const isShowHelp = computed(() => props.showHelp ?? false)
</script>

<template>
  <div :class="cn('mt-4 flex items-center', classname)">
    <slot name="header" />
    <span v-if="isShowHelp" @click="isShow = !isShow">
      <Icon class="icon" name="lucide:circle-help" />
    </span>
  </div>

  <slot name="addition" />

  <p v-if="isShow" class="kun-header-help">
    <slot name="help" />
  </p>
</template>

<style lang="scss" scoped>
.kun-header {
  margin-bottom: 17px;
  font-weight: bold;
  display: flex;
  align-items: center;

  .icon {
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    font-size: large;
    margin-left: 10px;
  }
}

.kun-header-help {
  margin-bottom: 17px;
  font-size: small;
  color: var(--kungalgame-font-color-0);
  font-style: oblique;
}
</style>
