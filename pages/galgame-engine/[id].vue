<script setup lang="ts">
import type { UpdateGalgameEnginePayload } from '~/components/galgame/types'

const { role } = usePersistUserStore()
const route = useRoute()
const engineId = computed(() => {
  return Number((route.params as { id: string }).id)
})

const pageData = reactive({
  page: 1,
  limit: 24,
  engineId: engineId.value
})

const showEngineModal = ref(false)
const editingEngine = ref<UpdateGalgameEnginePayload>(
  {} as UpdateGalgameEnginePayload
)

const { data, status } = await useFetch(
  `/api/galgame-engine/${engineId.value}`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)

const openEditEngineModal = () => {
  if (!data.value) {
    return
  }
  const res = data.value
  editingEngine.value = {
    engineId: res.id,
    name: res.name,
    description: res.description,
    alias: res.alias
  } satisfies UpdateGalgameEnginePayload
  showEngineModal.value = true
}

const handleUpdateEngine = async (data: UpdateGalgameEnginePayload) => {
  const result = await $fetch(`/api/galgame-engine`, {
    method: 'PUT',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('重新编辑成功', 'success')
  }
}

useKunSeoMeta({
  title: `${data.value?.name} 引擎`,
  description: `查看所有使用 ${data.value?.name} 引擎制作的 Galgame`
})
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
      :name="`${data.name} 引擎制作的 Galgame`"
      :description="data.description"
    >
      <template #endContent>
        <div class="space-y-3">
          <p class="text-default-500">
            默认仅显示了 SFW 的 Galgame, 查看 NSFW Galgame 请在设置面板打开 NSFW
            开关。如果有数据错误请
            <KunLink to="/doc/notice/contact"> 联系我们 </KunLink>。
          </p>

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
            <KunButton @click="openEditEngineModal">编辑引擎</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <GalgameEngineModal
      v-model="showEngineModal"
      :initial-data="editingEngine"
      @submit="handleUpdateEngine"
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
      :description="`${data.name} 引擎下暂无 Galgame`"
    />
  </KunCard>
</template>
