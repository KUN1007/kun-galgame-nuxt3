<script setup lang="ts">
import type {
  SearchResultTopic,
  SearchResultGalgame,
  SearchResultUser,
  SearchResultReply,
  SearchResultComment,
  SearchResult
} from '~/types/api/search'

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
    <div class="space-y-3" v-if="props.type === 'topic'">
      <HomeTopicCard
        v-for="(topic, index) in results"
        :key="index"
        @click="handleClick"
        :topic="topic as SearchResultTopic"
      />
    </div>

    <div class="space-y-3" v-if="props.type === 'galgame'">
      <HomeGalgameCard
        v-for="(galgame, index) in results"
        :key="index"
        @click="handleClick"
        :galgame="galgame as SearchResultGalgame"
      />
    </div>

    <div class="space-y-3" v-if="props.type === 'user'">
      <SearchUserCard
        v-for="(user, index) in results"
        :key="index"
        :user="user as SearchResultUser"
      />
    </div>

    <div class="space-y-3" v-if="props.type === 'reply'">
      <SearchReplyCommentCard
        v-for="(reply, index) in results"
        :key="index"
        :data="reply as SearchResultReply"
        type="reply"
      />
    </div>

    <div class="space-y-3" v-if="props.type === 'comment'">
      <SearchReplyCommentCard
        v-for="(comment, index) in results"
        :key="index"
        :data="comment as SearchResultComment"
        type="comment"
      />
    </div>
  </div>
</template>
