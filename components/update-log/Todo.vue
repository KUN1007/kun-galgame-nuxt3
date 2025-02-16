<script setup lang="ts">
const iconMap: Record<number, string> = {
  0: 'lucide:circle-divide',
  1: 'lucide:loader',
  2: 'lucide:check',
  3: 'lucide:x'
}

const pageData = ref({
  page: 1,
  limit: 10,
  language: 'zh-cn'
})

const { data, status } = await useFetch(`/api/update/todo`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

watch(
  () => status.value,
  () => {
    if (status.value === 'success') {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <ul class="todo-list" v-if="data">
    <li
      :class="`status${kun.status}`"
      v-for="kun in data.todos"
      :key="kun.todoId"
    >
      <pre>{{ kun.content['zh-cn'] }}</pre>

      <div class="status">
        <span class="time">
          {{
            formatDate(kun.time, {
              isPrecise: true
            })
          }}
        </span>

        <span class="description">
          <span v-if="kun.completedTime">
            {{
              formatDate(kun.completedTime, {
                isPrecise: true
              })
            }}
          </span>
          <Icon class="icon" :name="iconMap[kun.status]" />
          <span>{{ KUN_UPDATE_LOG_STATUS_MAP[kun.status] }}</span>
        </span>
      </div>
    </li>
  </ul>

  <KunPagination
    class="pagination"
    v-if="data && data.totalCount > 10"
    :page="pageData.page"
    :limit="pageData.limit"
    :sum="data.totalCount"
    :status="status"
    @set-page="(newPage) => (pageData.page = newPage)"
  />
</template>

<style lang="scss" scoped>
.todo-list {
  padding: 10px;
}

li {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 17px;

  &:first-child {
    margin-top: 10px;
  }
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
}

.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;

  .time {
    color: var(--kungalgame-font-color-1);
  }

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    border-radius: 15px;

    span {
      &:nth-child(1) {
        margin-right: 5px;
      }
    }

    .icon {
      margin-right: 5px;
    }
  }
}

.status0 {
  border-left: 5px solid var(--kungalgame-blue-5);

  .description {
    color: var(--kungalgame-blue-5);
  }
}

.status1 {
  border-left: 5px solid var(--kungalgame-pink-4);

  .description {
    color: var(--kungalgame-pink-4);
  }
}

.status2 {
  border-left: 5px solid var(--kungalgame-green-4);

  .description {
    color: var(--kungalgame-green-4);
  }
}

.status3 {
  border-left: 5px solid var(--kungalgame-gray-4);

  .description {
    color: var(--kungalgame-gray-4);
  }
}
</style>
