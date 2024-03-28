<script setup lang="ts">
import { ref, computed } from 'vue'

interface PaginationProps {
  page: number
  limit: number
  sum: number
  loading: boolean
}

const props = defineProps<PaginationProps>()
const emit = defineEmits<{
  setPage: [page: number]
}>()

const currentPage = ref(props.page)
const totalPages = computed(() => Math.ceil(props.sum / props.limit))
const visiblePages = computed(() => {
  const pages: number[] = []
  const pageCount = 5

  let start = Math.max(1, currentPage.value - Math.floor(pageCount / 2))
  const end = Math.min(totalPages.value, start + pageCount - 1)

  if (end - start + 1 < pageCount) {
    start = Math.max(1, end - pageCount + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const gotoPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit('setPage', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('setPage', currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('setPage', currentPage.value)
  }
}
</script>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">
      <Icon name="lucide:chevron-left" />
    </button>

    <button @click="gotoPage(1)" :class="{ active: currentPage === 1 }">
      1
    </button>

    <template
      v-for="pageNumber in visiblePages.slice(1, visiblePages.length - 1)"
      :key="pageNumber"
    >
      <button
        @click="gotoPage(pageNumber)"
        :class="{ active: currentPage === pageNumber }"
      >
        {{ pageNumber }}
      </button>
    </template>

    <button
      v-if="totalPages !== 1"
      @click="gotoPage(totalPages)"
      :class="{ active: currentPage === totalPages }"
    >
      {{ totalPages }}
    </button>

    <button @click="nextPage" :disabled="currentPage === totalPages">
      <Icon name="lucide:chevron-right" />
    </button>

    <div class="loading" v-if="props.loading"></div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 17px 0;
  position: relative;

  button {
    padding: 5px 10px;
    border-radius: 10px;
    margin: 0 7px;
    border: none;
    background-color: transparent;
    font-size: medium;
    color: var(--kungalgame-font-color-3);

    &:hover {
      background-color: var(--kungalgame-trans-blue-1);
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
        background-color: transparent;
      }
    }
  }

  .active {
    background-color: var(--kungalgame-blue-5);
    color: var(--kungalgame-white);

    &:hover {
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.loading {
  position: absolute;
  bottom: -10px;
  width: 300px;
  border: 2px dotted var(--kungalgame-blue-5);
  animation: scaleXAnimation 1s infinite alternate;

  span {
    position: absolute;
  }
}

@keyframes scaleXAnimation {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
