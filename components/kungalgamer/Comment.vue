<script setup lang="ts">
const props = defineProps<{
  comment: number[]
}>()

const { data } = await useFetch('/api/user/comments', {
  method: 'GET',
  query: { cidArray: props.comment },
  watch: false,
  ...kungalgameResponseHandler,
})
</script>

<template>
  <div class="comment" v-if="data">
    <div class="item" v-for="(comment, index) in data" :key="index">
      <NuxtLinkLocale :to="`/topic/${comment.tid}`">
        <div class="title">
          {{ comment.content }}
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  width: 100%;
  margin-top: 17px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  cursor: pointer;

  a {
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    color: var(--kungalgame-font-color-3);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
