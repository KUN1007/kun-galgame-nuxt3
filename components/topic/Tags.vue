<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  isShowIcon: boolean
}>()
</script>

<template>
  <div class="tags" v-if="$props.tags.length">
    <Icon v-if="props.isShowIcon" class="tag" name="mingcute:tag-2-fill" />
    <ul>
      <li v-for="(tag, index) in tags" :key="index">{{ tag }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  align-items: center;
  color: var(--kungalgame-font-color-3);

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    max-height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;

    li {
      margin: 3px;
      font-size: small;
      padding: 3px 17px;
      background-color: var(--kungalgame-trans-blue-0);
      border: 1px solid var(--kungalgame-blue-4);
      border-radius: 14px;
      overflow-y: scroll;
      cursor: pointer;

      &:hover {
        color: var(--kungalgame-white);
        background-color: var(--kungalgame-blue-4);
      }
    }
  }
}

.tag {
  font-size: 23px;
  margin: 0 20px;
  color: var(--kungalgame-blue-4);
  flex-shrink: 0;
}
</style>
