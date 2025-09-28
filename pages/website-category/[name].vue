<script setup lang="ts">
import type { UpdateWebsiteCategoryPayload } from '~/components/website/modal/types'

const route = useRoute()
const categoryName = computed(() => {
  return (route.params as { name: string }).name
})

const showCategoryModal = ref(false)
const editingCategory = ref<UpdateWebsiteCategoryPayload>(
  {} as UpdateWebsiteCategoryPayload
)

const { data } = await useFetch(`/api/website-category/${categoryName.value}`, {
  method: 'GET',
  watch: false,
  query: { name: categoryName.value },
  ...kungalgameResponseHandler
})

const openEditCategoryModal = () => {
  if (!data.value) {
    return
  }
  editingCategory.value = {
    name: data.value.name,
    label: data.value.label,
    categoryId: data.value.id,
    description: data.value.description
  } satisfies UpdateWebsiteCategoryPayload
  showCategoryModal.value = true
}

const handleUpdateCategory = async (data: UpdateWebsiteCategoryPayload) => {
  const result = await $fetch(`/api/website-category`, {
    method: 'PUT',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('重新编辑成功', 'success')
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
    <KunHeader :name="data.label" :description="data.description">
      <template #endContent>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <KunBadge color="primary">
              {{ `本 Wiki 拥有 ${data.websiteCount} 个 ${data.label}` }}
            </KunBadge>
            <KunBadge>
              更新于 {{ formatDate(data.updated, { isShowYear: true }) }}
            </KunBadge>
          </div>

          <div class="flex justify-end">
            <KunButton @click="openEditCategoryModal">编辑分类</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <WebsiteModalCategory
      v-model="showCategoryModal"
      :initial-data="editingCategory"
      @submit="handleUpdateCategory"
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

    <KunNull v-else :description="`${data.label} 分类下暂无网站`" />
  </KunCard>
</template>
