<script setup lang="ts">
import type { UpdateGalgameTagPayload } from '~/components/galgame/types'
import {
  KUN_GALGAME_TAG_CATEGORY_MAP,
  type KUN_GALGAME_TAG_TYPE
} from '~/constants/galgameTag'

const { role } = usePersistUserStore()
const route = useRoute()
const tagId = computed(() => {
  return Number((route.params as { id: string }).id)
})

const pageData = reactive({
  page: 1,
  limit: 24,
  tagId: tagId.value
})

const showTagModal = ref(false)
const editingTag = ref<UpdateGalgameTagPayload>({} as UpdateGalgameTagPayload)

const { data, status } = await useFetch(`/api/galgame-tag/${tagId.value}`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const openEditTagModal = () => {
  if (!data.value) {
    return
  }
  const res = data.value
  editingTag.value = {
    name: res.name,
    tagId: res.id,
    description: res.description,
    category: res.category as (typeof KUN_GALGAME_TAG_TYPE)[number],
    alias: res.alias
  } satisfies UpdateGalgameTagPayload
  showTagModal.value = true
}

const handleUpdateTag = async (data: UpdateGalgameTagPayload) => {
  const result = await $fetch(`/api/galgame-tag`, {
    method: 'PUT',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('重新编辑成功', 'success')
  }
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
      :name="`含有标签 ${data.name} 的 Galgame`"
      :description="data.description"
    >
      <template #endContent>
        <div class="space-y-3">
          <p class="text-default-500">
            默认仅显示了 SFW 的 Galgame, 查看 NSFW Galgame 请在设置面板打开 NSFW
            开关。如果有数据错误请
            <KunLink to="/doc/notice/contact"> 联系我们 </KunLink>。
          </p>

          <div class="text-default-500">
            标签类别
            <KunBadge
              :color="
                data.category === 'content'
                  ? 'primary'
                  : data.category === 'sexual'
                    ? 'danger'
                    : 'success'
              "
            >
              {{ KUN_GALGAME_TAG_CATEGORY_MAP[data.category] }}
            </KunBadge>
          </div>
          <div
            v-if="data.alias.length"
            class="text-default-500 flex flex-wrap gap-2"
          >
            别名
            <KunBadge
              color="primary"
              v-for="(a, index) in data.alias"
              :key="index"
            >
              {{ a }}
            </KunBadge>
          </div>
          <div v-if="role > 2" class="flex justify-end">
            <KunButton @click="openEditTagModal">编辑标签</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <GalgameTagModal
      v-model="showTagModal"
      :initial-data="editingTag"
      @submit="handleUpdateTag"
    />

    <GalgameCard
      :is-transparent="true"
      v-if="data.galgame.length"
      :galgames="data.galgame"
    />

    <KunPagination
      v-if="data.galgameCount > pageData.limit"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.galgameCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />

    <KunNull
      v-if="!data.galgameCount"
      :description="`${data.name} 标签下暂无 Galgame`"
    />
  </KunCard>
</template>
