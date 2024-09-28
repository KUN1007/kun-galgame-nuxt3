<script setup lang="ts">
const props = defineProps<{
  size: number
  showHelp?: boolean
}>()

const isShow = ref(false)
const isShowHelp = computed(() => props.showHelp ?? false)
</script>

<template>
  <div class="kun-header" :class="`size-${size}`">
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

  &::before {
    content: '#';
    color: var(--kungalgame-blue-5);
    margin-right: 10px;
  }

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

.size-1 {
  font-size: 32px;
}

.size-2 {
  font-size: 24px;
}

.size-3 {
  font-size: 18px;
}
</style>
