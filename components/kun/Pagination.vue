<script setup lang="ts">
interface PaginationProps {
  page: number
  limit: number
  sum: number
  status: UseFetchStatus
}

const props = defineProps<PaginationProps>()
const emit = defineEmits<{
  setPage: [page: number]
}>()

const pageInput = ref(props.page)
const currentPage = ref(props.page)
const totalPages = computed(() => Math.ceil(props.sum / props.limit))

const gotoPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    pageInput.value = page
    emit('setPage', currentPage.value)
  }
}

const handlePageInput = () => {
  const page = parseInt(pageInput.value.toString(), 10)
  if (!isNaN(page)) {
    gotoPage(page)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    pageInput.value = currentPage.value
    emit('setPage', currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    pageInput.value = currentPage.value
    emit('setPage', currentPage.value)
  }
}
</script>

<template>
  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      aria-label="previous"
    >
      <Icon class="icon" name="lucide:chevron-left" />
    </button>

    <div class="page">
      <input
        v-model="pageInput"
        @keyup.enter="handlePageInput"
        @blur="handlePageInput"
        type="number"
        :min="1"
        :max="totalPages"
      />
      <span class="separator">/</span>
      <span>{{ totalPages }}</span>
    </div>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      aria-label="next"
    >
      <Icon class="icon" name="lucide:chevron-right" />
    </button>

    <div class="loading" v-if="props.status === 'pending'"></div>
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
    @include kun-center;

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

  .page {
    padding: 8px 12px;
    border: 1.5px solid var(--kungalgame-trans-blue-2);
    border-radius: 10px;

    input {
      color: var(--kungalgame-font-color-3);
      width: 50px;
      font-size: 16px;
      border: none;
      background-color: transparent;
      padding: 0;
    }

    .separator {
      margin-right: 10px;
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
}
</style>
