<script setup lang="ts">
import { KUN_TOPIC_CATEGORY, KUN_TOPIC_SECTION } from '~/constants/topic'
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '~/constants/section'

const props = defineProps<{
  section: string
}>()
const page = ref(1)

const categoryMap: Record<string, string> = {
  g: 'galgame',
  t: 'technique',
  o: 'others'
}
const category = computed(
  () => KUN_TOPIC_CATEGORY[categoryMap[props.section[0]]]
)

const { data, status } = await useFetch(`/api/section`, {
  method: 'GET',
  query: {
    section: props.section,
    order: 'desc',
    page,
    limit: 30
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
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <KunHeader :description="KUN_TOPIC_SECTION_DESCRIPTION_MAP[section]">
      <template #title>
        <div class="flex items-center gap-2">
          <KunLink
            underline="hover"
            :to="`/category/${categoryMap[props.section[0]]}`"
            class-name="text-2xl font-medium"
          >
            {{ category }}
          </KunLink>
          /
          <span class="text-lg">{{ KUN_TOPIC_SECTION[section] }}</span>
        </div>
      </template>
    </KunHeader>

    <KunLink
      color="default"
      underline="none"
      v-for="(topic, index) in data?.topics"
      :key="index"
      :to="`/topic/${topic.id}`"
      class-name="hover:bg-primary/10 items-start flex flex-nowrap gap-2 rounded-lg p-4 transition-colors duration-200"
    >
      <KunAvatar :user="topic.user" />

      <div class="w-full space-y-2">
        <div class="flex items-center">
          <div class="mr-2 font-bold">{{ topic.user.name }}</div>
          <div class="text-default-500 text-sm">
            {{
              formatDate(topic.created, { isShowYear: true, isPrecise: true })
            }}
          </div>
        </div>

        <h2 class="hover:text-primary text-lg transition-colors">
          {{ topic.title }}
        </h2>

        <TopicTagGroup :section="topic.section" :tags="topic.tag" />

        <div class="text-default-500 line-clamp-2 text-sm break-all">
          {{ markdownToText(topic.content) }}
        </div>

        <div class="text-default-700 flex gap-4 text-sm">
          <div class="flex items-center gap-2 text-inherit">
            <KunIcon name="lucide:eye" />
            {{ topic.view }}
          </div>
          <div class="flex items-center gap-2 text-inherit">
            <KunIcon name="lucide:thumbs-up" />
            {{ topic.like }}
          </div>
          <div class="flex items-center gap-2 text-inherit">
            <KunIcon name="carbon:reply" />
            {{ topic.reply }}
          </div>
        </div>
      </div>
    </KunLink>

    <KunPagination
      v-if="data"
      v-model:current-page="page"
      :total-page="Math.ceil(data.totalCount / 30)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
