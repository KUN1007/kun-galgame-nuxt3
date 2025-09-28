<script setup lang="ts">
import type {
  CreateWebsiteTagPayload,
  UpdateWebsiteTagPayload
} from '~/components/website/modal/types'

const route = useRoute()
const tagName = computed(() => {
  return (route.params as { name: string }).name
})

const showTagModal = ref(false)
const editingTag = ref<UpdateWebsiteTagPayload>({} as UpdateWebsiteTagPayload)

const { data } = await useFetch(`/api/website-tag/${tagName.value}`, {
  method: 'GET',
  watch: false,
  query: { name: tagName.value },
  ...kungalgameResponseHandler
})

const openEditTagModal = () => {
  if (!data.value) {
    return
  }
  editingTag.value = {
    name: data.value.name,
    label: data.value.label,
    level: data.value.level,
    tagId: data.value.id,
    description: data.value.description
  } satisfies UpdateWebsiteTagPayload
  showTagModal.value = true
}

const handleTagSubmit = async (
  data: CreateWebsiteTagPayload | UpdateWebsiteTagPayload
) => {
  if ('tagId' in data) {
    const result = await $fetch(`/api/website-tag`, {
      method: 'PUT',
      watch: false,
      body: data,
      ...kungalgameResponseHandler
    })

    if (result) {
      useMessage('重新编辑成功', 'success')
    }
  }
}

if (data.value) {
  useKunSeoMeta({
    title: data.value.name,
    description: data.value.description,
    articlePublishedTime: data.value.created.toString(),
    articleModifiedTime: data.value.updated.toString()
  })
}
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
    v-if="data"
  >
    <KunHeader
      :name="`${data.label}的 Galgame 网站`"
      :description="data.description"
    >
      <template #endContent>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <KunBadge color="primary">标签价值 {{ data.level }}</KunBadge>

            <KunBadge>
              更新于 {{ formatDate(data.updated, { isShowYear: true }) }}
            </KunBadge>
          </div>

          <div class="flex justify-end">
            <KunButton @click="openEditTagModal">编辑标签</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <WebsiteModalTag
      v-model="showTagModal"
      :initial-data="editingTag"
      @submit="handleTagSubmit"
    />

    <div v-if="data.websites.length">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WebsiteCard
          v-for="website in data.websites"
          :key="website.id"
          :website="website"
        />
      </div>
    </div>

    <KunNull v-else :description="`${data.label} 标签下暂无网站`" />
  </KunCard>
</template>
