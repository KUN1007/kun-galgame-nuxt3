<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  isShowIcon: boolean
}>()
</script>

<template>
  <div class="tags" v-if="$props.tags.length">
    <Icon v-if="props.isShowIcon" class="tag" name="mingcute:tag-2-fill" />
    <span v-for="(tag, index) in tags" :key="index">{{ tag }}</span>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--kungalgame-font-color-3);

  span {
    margin: 3px;
    font-size: small;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.tag {
  font-size: 23px;
  margin: 0 20px;
  color: var(--kungalgame-blue-5);
  flex-shrink: 0;
}
</style>
