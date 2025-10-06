<script setup lang="ts">
import {
  KUN_GALGAME_TOOLSET_TYPE_MAP,
  KUN_GALGAME_TOOLSET_LANGUAGE_MAP,
  KUN_GALGAME_TOOLSET_PLATFORM_MAP,
  KUN_GALGAME_TOOLSET_VERSION_MAP
} from '~/constants/toolset'
import { toolsetUpdateForm } from './rewriteStore'
import type {
  ToolsetDetail,
  ToolsetRating,
  ToolsetResource
} from '~/types/api/toolset'

const props = defineProps<{
  id: number
  toolset: ToolsetDetail
}>()

const { id: uid, role } = usePersistUserStore()
const data = computed(() => props.toolset)
const canManageToolset = computed(() => data.value.user.id === uid || role >= 2)

const isDeleting = ref(false)
const handleDeleteToolset = async () => {
  if (!uid) {
    useMessage('请登陆后再删除', 'warn', 7000)
    return
  }

  const moemoePointToConsume = 3 + data.value.resource.length * 3
  const res = await useComponentMessageStore().alert(
    '确定删除该工具？',
    `删除这个工具将会消耗 ${moemoePointToConsume} 萌萌点, 计算公式为 3 + 这个工具下所有的资源数 * 3, 删除是永久性的, 不可撤销`
  )
  if (!res) {
    return
  }

  isDeleting.value = true
  const ok = await $fetch(`/api/toolset/${data.value.id}`, {
    method: 'DELETE',
    query: { toolsetId: data.value.id },
    ...kungalgameResponseHandler
  })
  isDeleting.value = false

  if (ok) {
    useMessage('已删除该工具', 'success')
    navigateTo('/toolset')
  }
}

const handleRewriteToolset = () => {
  toolsetUpdateForm.toolsetId = data.value.id
  toolsetUpdateForm.name = data.value.name
  toolsetUpdateForm.description = data.value.contentMarkdown
  toolsetUpdateForm.language = data.value.language as 'zh-cn'
  toolsetUpdateForm.platform = data.value.platform as 'windows'
  toolsetUpdateForm.type = data.value.type as 'others'
  toolsetUpdateForm.version = data.value.version as 'rc'
  toolsetUpdateForm.homepage = data.value.homepage
  toolsetUpdateForm.aliases = data.value.aliases
  navigateTo('/edit/toolset/rewrite')
}

const showResourceModal = ref(false)
const handlePublishResource = () => {
  showResourceModal.value = true
}

const isSubmittingRate = ref(false)
const practicalityData = ref<ToolsetRating | null>(null)

const loadPracticalityMine = async () => {
  const res = await $fetch(`/api/toolset/${props.id}/practicality`, {
    method: 'GET',
    query: { toolsetId: props.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (res) {
    practicalityData.value = res
  }
}

onMounted(loadPracticalityMine)

const handleSetStar = async (val: number) => {
  if (!uid) {
    useMessage('请登陆后再评分, 否则我们无法统计数据', 'warn', 7000)
    return
  }
  isSubmittingRate.value = true
  await $fetch(`/api/toolset/${props.id}/practicality`, {
    method: 'PUT',
    body: { toolsetId: props.id, rate: val },
    watch: false,
    ...kungalgameResponseHandler
  })

  useMessage(`已评分: ${val} 星`, 'success')
  isSubmittingRate.value = false
  await loadPracticalityMine()
}

const handleResourceDeleted = (toolsetResourceId: number) => {
  data.value.resource = data.value.resource.filter(
    (r) => r.id !== toolsetResourceId
  )
}

const handleResourceUpdated = (res: ToolsetResource) => {
  const idx = data.value.resource.findIndex((r) => r.id === res.id)
  if (idx !== -1) {
    data.value.resource[idx] = res
  }
}
</script>

<template>
  <div class="space-y-4">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="space-y-6"
    >
      <div class="space-y-3">
        <h1 class="text-2xl leading-tight font-bold">{{ data.name }}</h1>
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <KunBadge color="secondary" size="sm">
            {{ KUN_GALGAME_TOOLSET_VERSION_MAP[data.version] }}
          </KunBadge>
          <KunBadge color="success" size="sm">
            {{ KUN_GALGAME_TOOLSET_PLATFORM_MAP[data.platform] }}
          </KunBadge>
          <KunBadge color="primary" size="sm">
            {{ KUN_GALGAME_TOOLSET_LANGUAGE_MAP[data.language] }}
          </KunBadge>
          <KunBadge color="danger" size="sm">
            {{ KUN_GALGAME_TOOLSET_TYPE_MAP[data.type] }}
          </KunBadge>
        </div>

        <KunDivider class-name="my-6" />

        <KunContent :content="data.contentHtml" />
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="space-y-3 md:col-span-2">
          <template v-if="practicalityData">
            <ToolsetPracticalityChart
              :practicality-data="practicalityData"
              :id="data.id"
            />
          </template>
          <div v-else class="h-[306px] w-full">
            <KunLoading />
          </div>
        </div>

        <div class="space-y-6 md:col-span-1">
          <div class="space-y-2">
            <h3 class="font-semibold">发布者</h3>
            <KunUser :user="data.user" />
          </div>

          <div v-if="data.homepage.length" class="space-y-2">
            <h3 class="font-semibold">主页 / 项目</h3>
            <div class="flex flex-col gap-2">
              <KunLink
                v-for="(url, idx) in data.homepage"
                :key="idx"
                :to="url"
                target="_blank"
                underline="hover"
              >
                {{ url }}
              </KunLink>
            </div>
          </div>

          <div v-if="data.aliases.length" class="space-y-2">
            <h3 class="font-semibold">别名</h3>
            <div class="flex flex-wrap items-center gap-2">
              <KunBadge
                v-for="(a, i) in data.aliases"
                :key="i"
                color="default"
                size="sm"
              >
                {{ a }}
              </KunBadge>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold">实用性评分</h3>
            <p class="text-default-500 text-sm">点击以评分</p>
            <div v-if="practicalityData" class="flex items-center gap-2">
              <KunRating
                :model-value="practicalityData.mine"
                @set="handleSetStar"
              />
              <KunBadge size="sm" variant="flat">
                {{ practicalityData.mine }} / 5
              </KunBadge>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="text-default-500 text-sm">
          {{ `${formatNumber(data.view)} 浏览` }}
          ·
          {{ `${formatNumber(data.download)} 下载` }}
        </div>
        <div class="flex gap-1">
          <KunButton @click="handlePublishResource">上传 / 添加资源</KunButton>
          <KunButton
            v-if="canManageToolset"
            variant="flat"
            @click="handleRewriteToolset"
          >
            修改
          </KunButton>
          <KunButton
            v-if="canManageToolset"
            color="danger"
            variant="flat"
            :loading="isDeleting"
            @click="handleDeleteToolset"
          >
            删除
          </KunButton>
        </div>
      </div>
    </KunCard>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="space-y-3"
    >
      <ToolsetResourceList
        :toolset-id="data.id"
        :resources="data.resource"
        @deleted="handleResourceDeleted"
        @updated="handleResourceUpdated"
      />
    </KunCard>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="space-y-3"
    >
      <ToolsetCommentContainer :toolset-id="data.id" :owner-id="data.user.id" />
    </KunCard>

    <KunModal
      :modal-value="showResourceModal"
      @update:modal-value="(v) => (showResourceModal = v)"
      :is-dismissable="false"
    >
      <ToolsetResourceContainer
        :toolset-id="data.id"
        @on-close="() => (showResourceModal = false)"
        @on-success="(value) => data!.resource.push(value)"
      />
    </KunModal>
  </div>
</template>
