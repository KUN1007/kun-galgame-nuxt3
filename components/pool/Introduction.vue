<script setup lang="ts">
const props = defineProps<{
  section: string[]
  tags: string[]
}>()
</script>

<template>
  <div class="introduction">
    <TopicSection :section="props.section" />

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

  .tags {
    margin: 3px;
    padding: 3px 17px;
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
  }
}
</style>
