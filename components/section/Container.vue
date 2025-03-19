<script setup lang="ts">
import { KUN_TOPIC_CATEGORY, KUN_TOPIC_SECTION } from '~/constants/topic'
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '~/constants/section'

const props = defineProps<{
  section: string
}>()
const page = ref(1)

const categoryMap: Record<string, string> = {
  g: 'Galgame',
  t: 'Technique',
  o: 'Others'
}

const { data, status } = await useFetch(`/api/section`, {
  method: 'GET',
  query: {
    section: props.section,
    order: 'desc',
    page,
    limit: 23
  },
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
  <KunCard :is-hoverable="false" :is-transparent="false">
    <KunHeader
      :name="KUN_TOPIC_SECTION[section]"
      :description="KUN_TOPIC_SECTION_DESCRIPTION_MAP[section]"
    />

    <NuxtLink
      class="section"
      v-for="(sec, index) in data?.topics"
      :to="`/topic/${sec.tid}`"
      :key="index"
    >
      <KunAvatar :user="sec.user" />

      <div class="topic">
        <div class="user">
          <div class="name">{{ sec.user.name }}</div>
          <div class="time">
            {{ formatDate(sec.time, { isShowYear: true, isPrecise: true }) }}
          </div>
        </div>

        <div class="title">{{ sec.title }}</div>
        <TopicTags :tags="sec.tags" :is-show-icon="false" />

        <div class="content">{{ markdownToText(sec.content) }}</div>

        <div class="status">
          <span>
            <Icon class="icon" name="lucide:eye" />
            <span>{{ sec.views }}</span>
          </span>
          <span>
            <Icon class="icon" name="lucide:thumbs-up" />
            <span>
              {{ sec.likes }}
            </span>
          </span>
          <span>
            <Icon class="icon" name="carbon:reply" />
            <span>{{ sec.replies }}</span>
          </span>
        </div>
      </div>
    </NuxtLink>

    <KunPagination
      class="pagination"
      v-if="data?.totalCount"
      :page="page"
      :limit="23"
      :sum="data?.totalCount"
      :status="status"
      @set-page="(newPage) => (page = newPage)"
    />
  </KunCard>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  padding: 17px;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);

  &:hover {
    background-color: var(--kungalgame-trans-blue-1);
    transition: all 0.2s;
  }
}

.avatar {
  display: flex;
  justify-content: center;
  margin-right: 7px;

  img {
    border-radius: 50%;
    display: inline-block;
  }

  span {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);
    font-weight: bold;
  }
}

.user {
  display: flex;
  align-items: center;

  .name {
    font-weight: bold;
    margin-right: 5px;
  }

  .time {
    font-size: small;
    color: var(--kungalgame-font-color-0);
  }
}

.title {
  color: var(--kungalgame-blue-5);
  margin: 5px 0;
}

.content {
  word-break: break-all;
  font-size: small;
  margin: 7px 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.status {
  display: flex;
  color: var(--kungalgame-font-color-1);

  .icon {
    margin-right: 3px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 17px;
  }
}

.pagination {
  margin: 50px 0;
}

@media (max-width: 700px) {
  .pagination {
    margin: 17px 0;
  }
}
</style>
