<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  isShowIcon: boolean
}>()
</script>

<template>
  <span class="tags" v-if="$props.tags.length">
    <span v-if="props.isShowIcon" class="label">
      <Icon class="icon" name="lucide:tags" />
    </span>
    <span class="tag-list" v-for="(tag, index) in tags" :key="index">
      {{ tag }}
    </span>
  </span>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  user-select: text;

  .tag-list {
    margin: 3px;
    font-size: small;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
  }
}

.label {
  font-size: 23px;
  margin: 0 20px;
  color: var(--kungalgame-blue-5);
  flex-shrink: 0;
}
</style>
