<script setup lang="ts">
import type {
  SearchResultTopic,
  SearchResultGalgame,
  SearchResultUser,
  SearchResultReply,
  SearchResultComment,
  SearchResult
} from '~/types/api/search'

const localePath = useLocalePath()
const { searchHistory } = storeToRefs(usePersistKUNGalgameSearchStore())
const { keywords } = storeToRefs(useTempSearchStore())

const props = defineProps<{
  results: SearchResult[]
  type: 'topic' | 'galgame' | 'user' | 'reply' | 'comment'
}>()

const handleClick = () => {
  if (!searchHistory.value.includes(keywords.value)) {
    searchHistory.value.push(keywords.value)
  }
}
</script>

<template>
  <div class="result">
    <div class="container" v-if="props.type === 'topic'">
      <div v-for="(topic, index) in results" :key="index">
        <HomeTopicCard
          @click="handleClick"
          :topic="topic as SearchResultTopic"
        />

        <KunDivider margin="0 7px" />
      </div>
    </div>

    <div class="container" v-if="props.type === 'galgame'">
      <div v-for="(galgame, index) in results" :key="index">
        <HomeGalgameCard
          @click="handleClick"
          :galgame="galgame as SearchResultGalgame"
        />

        <KunDivider margin="0 7px" />
      </div>
    </div>

    <div class="container" v-if="props.type === 'user'">
      <div v-for="(galgame, index) in results" :key="index">
        <HomeGalgameCard
          @click="handleClick"
          :galgame="galgame as SearchResultGalgame"
        />

        <KunDivider margin="0 7px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  width: 100%;
  margin-top: 17px;
}
</style>
