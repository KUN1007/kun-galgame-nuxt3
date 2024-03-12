<script setup lang="ts">
const { data: updateLogs } = await useFetch(`/api/update/history`, {
  method: 'GET',
  query: { page: 0, limit: 0 },
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="article-history">
    <ul class="history-list" v-if="updateLogs && updateLogs.length">
      <li v-for="kun in updateLogs" :key="kun.upid">
        <div>
          <p v-html="kun.description"></p>
        </div>

        <div class="time">
          <span>{{ kun.time }} - Version {{ kun.version }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.article-history {
  border-left: 1px solid var(--kungalgame-blue-5);
  height: 75%;
  padding: 10px;
}

.history-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: thin;
}

li {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid var(--kungalgame-blue-5);
  &:first-child {
    margin-top: 10px;
  }
}

p {
  margin: 5px 0;
}

.time {
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  margin-top: 7px;
  margin-right: 10px;
  letter-spacing: 1px;
}
</style>
