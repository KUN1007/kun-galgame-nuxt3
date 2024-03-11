<script setup lang="ts">
const props = defineProps<{
  category: string[]
  tags: string[]
}>()
</script>

<template>
  <div class="introduction">
    <span
      class="category"
      v-for="(cat, index) in props.category"
      :key="index"
      :class="cat.toLowerCase()"
    >
      {{ $t(`edit.${cat}`) }}
    </span>

    <span class="tags" v-for="(tag, index) in props.tags" :key="index">
      {{ tag }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.introduction {
  display: flex;
  flex-wrap: wrap;
  font-size: small;

  .category {
    margin: 3px;
    display: flex;
    align-items: center;
    color: var(--kungalgame-white);
    padding: 3px 10px;
    border-radius: 7px;
    margin-right: 5px;
  }

  .tags {
    margin: 3px;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
    cursor: pointer;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.galgame {
  background-color: var(--kungalgame-blue-5);
}

.technique {
  background-color: var(--kungalgame-green-4);
}

.others {
  background-color: var(--kungalgame-yellow-3);
}
</style>
