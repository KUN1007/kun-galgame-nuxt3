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
  <ul class="history-list" v-if="updateLogs && updateLogs.length">
    <li v-for="kun in updateLogs" :key="kun.upid">
      <span class="type">{{ $t(`update.${kun.type}`) }}</span>
      <pre>{{ kun.description }}</pre>
      <span class="time">{{ kun.time }} - Version {{ kun.version }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.history-list {
  height: calc(100% - 80px);
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

li {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;

  &:first-child {
    margin-top: 10px;
  }
}

.type {
  color: var(--kungalgame-blue-5);
  font-weight: bold;
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
