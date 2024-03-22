<script setup lang="ts">
import dayjs from 'dayjs'
import type { Todo } from '~/types/api/update-log'

const { locale } = useI18n()

const iconMap: Record<number, string> = {
  0: 'lucide:circle-divide',
  1: 'lucide:loader',
  2: 'lucide:check',
  3: 'lucide:x'
}

const page = ref(1)

const todos = ref<Todo[] | null>([])

const maxPage = ref(0)

const getTodosPage = async () => {
  const res = await useFetch<{
    data: Todo[]
    rows: number
  }>(`/api/update/todo`, {
    method: 'GET',
    query: { page: page.value, limit: 8, language: locale.value },
    watch: false,
    ...kungalgameResponseHandler
  })

  todos.value = res.data.value?.data ? res.data.value?.data : null
  maxPage.value = res.data.value?.rows ? res.data.value?.rows : 0
}

const increasePage = async () => {
  // const targetValue = page.value + 1
  // if (targetValue > maxPage.value) {
  //   outOfPageIndexMessage()
  //   page.value = maxPage.value
  // } else {
  //   page.value++
  // }
  // await getTodosPage()
  page.value++
  await changePage()
}
const decreasePage = async () => {
  // const targetValue = page.value - 1
  // if (targetValue < 1) {
  //   outOfPageIndexMessage()
  //   page.value = 1
  // } else {
  //   page.value--
  // }
  // await getTodosPage()
  page.value--
  await changePage()
}
const changePage = async () => {
  if (page.value > maxPage.value) {
    outOfPageIndexMessage()
    page.value = maxPage.value
  } else if (page.value < 1) {
    outOfPageIndexMessage()
    page.value = 1
  }
  await getTodosPage()
}

const outOfPageIndexMessage = () => {
  useMessage('This is the last page!', '没有更多内容啦！', 'warn')
}

onMounted(async () => {
  await getTodosPage()
})
</script>

<template>
  <ul class="todo-list" v-if="todos && todos.length">
    <li :class="`status${kun.status}`" v-for="kun in todos" :key="kun.todoId">
      <p>{{ kun.content }}</p>

      <div class="status">
        <span class="time">{{ dayjs(kun.time).format('MM/D - HH:mm') }}</span>

        <span class="description">
          <span v-if="kun.completedTime">
            {{ `${dayjs(kun.completedTime).format('MM/D - HH:mm')}` }}
          </span>
          <Icon class="icon" :name="iconMap[kun.status]" />
          <span>{{ $t(`update.status${kun.status}`) }}</span>
        </span>
      </div>

      <div class="user-info">
        <span class="creator">{{
          $t('update.creator') + ' - ' + kun.creator
        }}</span>
        <span class="completer" v-if="kun.status === 2">
          {{ $t('update.completer') + ' - ' + kun.completer }}
        </span>
      </div>
    </li>
  </ul>
  <div class="todo-page">
    <div class="todo-page-content">
      <span class="to-prev" @click="decreasePage()">
        <Icon name="lucide:circle-arrow-left"> </Icon>
      </span>
      <div class="input-line">
        <div class="input-container">
          <input
            class="input"
            type="text"
            v-model="page"
            @blur="changePage"
            @keydown.enter="changePage"
          />
        </div>
        <div>/ {{ maxPage }}</div>
      </div>
      <span class="to-next" @click="increasePage()">
        <Icon name="lucide:circle-arrow-right"> </Icon>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  height: calc(100% - 80px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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

p {
  word-break: break-all;
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

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;

  .completer {
    padding: 3px 10px;
    color: var(--kungalgame-green-4);
  }
}

.todo-page {
  position: relative;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .todo-page-content {
    font-size: 18px;
    display: flex;
    align-items: center;

    .to-prev,
    .to-next {
      padding: 0 20px;
      color: var(--kungalgame-font-color-1);
      :hover {
        color: var(--kungalgame-font-color-3);
        cursor: pointer;
      }
    }

    .input-line {
      display: flex;
      align-items: center;

      .input {
        background-color: var(--kungalgame-trans-white-9);
        font-size: 18px;
        flex-grow: 1;
        border: none;
        border-bottom: 1px dotted var(--kungalgame-blue-5);
        padding: 7px;
        text-align: center;
        width: 40px;
        height: 20px;
        color: var(--kungalgame-font-color-3);
      }
      .input:focus {
        border-bottom: 1px solid var(--kungalgame-blue-5);
      }
    }
  }
}
</style>
