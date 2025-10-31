<script setup lang="ts">
import type { UpdateGalgameOfficialPayload } from '~/components/galgame/types'
import {
  KUN_GALGAME_OFFICIAL_CATEGORY_MAP,
  type KUN_GALGAME_OFFICIAL_TYPE
} from '~/constants/galgameOfficial'

const { role } = usePersistUserStore()
const route = useRoute()
const officialId = computed(() => {
  return Number((route.params as { id: string }).id)
})

const { page, limit, type, language, platform, sortField, sortOrder } =
  storeToRefs(useTempGalgameStore())

const showOfficialModal = ref(false)
const editingOfficial = ref<UpdateGalgameOfficialPayload>(
  {} as UpdateGalgameOfficialPayload
)

const { data, status } = await useFetch(
  `/api/galgame-official/${officialId.value}`,
  {
    method: 'GET',
    query: {
      page,
      limit,
      type,
      language,
      platform,
      sortField,
      sortOrder,
      officialId
    },
    ...kungalgameResponseHandler
  }
)

const openEditOfficialModal = () => {
  if (!data.value) {
    return
  }
  const res = data.value
  editingOfficial.value = {
    name: res.name,
    officialId: res.id,
    link: res.link,
    lang: res.lang,
    description: res.description,
    category: res.category as (typeof KUN_GALGAME_OFFICIAL_TYPE)[number],
    alias: res.alias
  } satisfies UpdateGalgameOfficialPayload
  showOfficialModal.value = true
}

const handleUpdateOfficial = async (data: UpdateGalgameOfficialPayload) => {
  const result = await $fetch(`/api/galgame-official`, {
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
  title: `${data.value?.name} 会社`,
  description: `${data.value?.name}${data.value?.alias ? `, 即 ${data.value?.alias.join('| ')}` : ''}, 查看会社 ${data.value?.name} 制作的所有 Galgame`
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
      :name="`${data.name} 制作的 Galgame`"
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
            会社类别
            <KunBadge
              :color="
                data.category === 'company'
                  ? 'primary'
                  : data.category === 'individual'
                    ? 'secondary'
                    : 'success'
              "
            >
              {{ KUN_GALGAME_OFFICIAL_CATEGORY_MAP[data.category] }}
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
            <KunButton @click="openEditOfficialModal">编辑会社</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <GalgameCardNav :show-advanced="false" />

    <GalgameOfficialModal
      v-model="showOfficialModal"
      :initial-data="editingOfficial"
      @submit="handleUpdateOfficial"
    />

    <GalgameCard
      :is-transparent="true"
      v-if="data.galgame.length"
      :galgames="data.galgame"
    />

    <KunPagination
      v-if="data.galgameCount > limit"
      v-model:current-page="page"
      :total-page="Math.ceil(data.galgameCount / limit)"
      :is-loading="status === 'pending'"
    />

    <KunNull
      v-if="!data.galgameCount"
      :description="`${data.name} 会社下暂无 Galgame`"
    />
  </KunCard>
</template>
