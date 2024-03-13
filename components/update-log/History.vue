<script setup lang="ts">
const { locale } = useI18n()

const { data: updateLogs } = await useFetch(`/api/update/history`, {
  method: 'GET',
  query: { page: 0, limit: 0, language: locale.value },
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="article-history">
    <ul class="history-list" v-if="updateLogs && updateLogs.length">
      <li v-for="kun in updateLogs" :key="kun.upid">
        <pre>{{ kun.description }}</pre>
        <span class="time">{{ kun.time }} - Version {{ kun.version }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.article-history {
  height: calc(100% - 80px);
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
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 10px;

  &:first-child {
    margin-top: 10px;
  }
}

pre {
  white-space: pre-wrap;
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
