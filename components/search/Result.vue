<script setup lang="ts">
import type {
  SearchResultTopic,
  SearchResultGalgame,
  SearchResultUser,
  SearchResultReply,
  SearchResultComment,
  SearchType,
  SearchResult
} from '~/types/api/search'

const props = defineProps<{
  type: SearchType
  results: SearchResult[]
}>()

const isTopicResults = (results: unknown[]): results is SearchResultTopic[] =>
  props.type === 'topic'
const isGalgameResults = (
  results: unknown[]
): results is SearchResultGalgame[] => props.type === 'galgame'
const isUserResults = (results: unknown[]): results is SearchResultUser[] =>
  props.type === 'user'
const isReplyResults = (results: unknown[]): results is SearchResultReply[] =>
  props.type === 'reply'
const isCommentResults = (
  results: unknown[]
): results is SearchResultComment[] => props.type === 'comment'
</script>

<template>
  <div class="result">
    <div v-if="isTopicResults(results)" class="space-y-3">
      <KunCard v-for="(topic, index) in results" :key="index">
        <HomeTopicCard :topic="topic" />
      </KunCard>
    </div>

    <GalgameCard
      :is-transparent="true"
      v-if="isGalgameResults(results)"
      :galgames="results"
    />

    <div v-if="isUserResults(results)" class="space-y-3">
      <SearchUserCard
        v-for="(user, index) in results"
        :key="index"
        :user="user"
      />
    </div>

    <div v-if="isReplyResults(results)" class="space-y-3">
      <KunCard v-for="(reply, index) in results" :key="index">
        <SearchReplyCard :reply="reply" />
      </KunCard>
    </div>

    <div v-if="isCommentResults(results)" class="space-y-3">
      <KunCard v-for="(comment, index) in results" :key="index">
        <SearchCommentCard :comment="comment" />
      </KunCard>
    </div>
  </div>
</template>
