<script setup lang="ts">
const { searchHistory } = storeToRefs(usePersistKUNGalgameSearchStore())
const { keywords } = storeToRefs(useTempSearchStore())

const handleClickHistory = (index: number) => {
  keywords.value = searchHistory.value[index]
}

const clearSearchHistory = () => {
  searchHistory.value = []
}

const handleDeleteHistory = (historyIndex: number) => {
  searchHistory.value.splice(historyIndex, 1)
}
</script>

<template>
  <div class="mt-4 w-full">
    <div v-if="searchHistory.length" class="mb-3 flex justify-between text-sm">
      <span>搜索历史</span>
      <button
        @click="clearSearchHistory"
        class="hover:text-primary transition-colors"
      >
        清除所有历史
      </button>
    </div>

    <div v-if="searchHistory.length" class="flex flex-col text-sm">
      <div
        v-for="(history, index) in searchHistory"
        :key="index"
        class="search-history-item hover:bg-default-100 flex items-center gap-2 rounded-lg p-2"
        @click="handleClickHistory(index)"
      >
        <span>{{ history }}</span>
        <KunButton
          :is-icon-only="true"
          variant="light"
          @click.stop="handleDeleteHistory(index)"
        >
          <KunIcon name="lucide:x" class="h-4 w-4" />
        </KunButton>
      </div>
    </div>

    <KunNull v-if="!searchHistory.length" />
  </div>
</template>
