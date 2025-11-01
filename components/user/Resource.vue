<script setup lang="ts">
import {
  GALGAME_RESOURCE_PROVIDER_MAP,
  GALGAME_RESOURCE_TYPE_ICON_MAP,
  GALGAME_RESOURCE_PLATFORM_ICON_MAP
} from '~/constants/galgameResource'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP
} from '~/constants/galgame'
import {
  kunUserGalgameResourceNavItem,
  type KUN_USER_PAGE_GALGAME_RESOURCE_TYPE
} from '~/constants/user'

const props = defineProps<{
  uid: number
  type: (typeof KUN_USER_PAGE_GALGAME_RESOURCE_TYPE)[number]
}>()

const isCurrentUser = computed(() => usePersistUserStore().id === props.uid)
const activeTab = ref(props.type)
const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type,
  userId: props.uid
})

const { data, status, refresh } = await useFetch(
  `/api/user/${props.uid}/resources`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)

const draftLinks = ref<string[]>([])

watch(
  () => data.value?.resources,
  (list) => {
    if (!list) {
      return
    }
    draftLinks.value = list.map((res) => (res.link ? res.link.join('\n') : ''))
  },
  { immediate: true }
)

const submitFix = async (index: number) => {
  if (!data.value) {
    return
  }
  const res = data.value.resources[index]
  if (!res?.id || !res?.galgameId) {
    return
  }

  const linkArray = draftLinks.value[index]
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  const payload = {
    galgameId: res.galgameId,
    galgameResourceId: res.id,
    type: res.type,
    language: res.language,
    platform: res.platform,
    size: res.size,
    link: linkArray,
    code: res.code || '',
    password: res.password || '',
    note: res.note || ''
  }

  await Promise.all([
    $fetch(`/api/galgame/${res.galgameId}/resource`, {
      method: 'PUT',
      body: payload,
      watch: false,
      ...kungalgameResponseHandler
    }),
    $fetch(`/api/galgame/${res.galgameId}/resource/valid`, {
      method: 'PUT',
      watch: false,
      body: { galgameResourceId: res.id },
      ...kungalgameResponseHandler
    })
  ])

  useMessage('更新资源链接成功', 'success')
  refresh()
}
</script>

<template>
  <div class="space-y-3">
    <KunHeader name="Galgame 资源" description="管理你发布的 Galgame 资源" />

    <KunTab
      :items="kunUserGalgameResourceNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.resources.length">
      <template v-if="props.type !== 'galgame_resource_like' && isCurrentUser">
        <KunCard
          :is-pressable="false"
          :is-hoverable="false"
          v-for="(res, index) in data.resources"
          :key="index"
        >
          <div class="mb-2 text-lg font-medium">
            {{ getPreferredLanguageText(res.galgameName) }}
          </div>

          <div class="mb-2 flex flex-wrap items-center gap-2">
            <KunBadge color="primary">
              <KunIcon :name="GALGAME_RESOURCE_TYPE_ICON_MAP[res.type]" />
              {{ KUN_GALGAME_RESOURCE_TYPE_MAP[res.type] }}
            </KunBadge>
            <KunBadge color="warning">
              <KunIcon name="lucide:database" />
              {{ res.size }}
            </KunBadge>
            <KunBadge color="success">
              <KunIcon
                :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[res.platform]"
              />
              {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[res.platform] }}
            </KunBadge>
            <KunBadge color="secondary">
              {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[res.language] }}
            </KunBadge>
            <KunBadge color="danger">链接过期</KunBadge>
            <div class="text-default-500 text-sm">
              {{ `创建于 ${formatDate(res.created, { isShowYear: true })}` }}
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-default-500 text-sm">
              资源链接 (如果有多个资源链接, 请使用英语逗号分隔每一个链接)
            </div>
            <KunTextarea v-model="draftLinks[index]" :rows="2" auto-grow />
            <div class="flex justify-end">
              <KunButton
                :color="props.type === 'expire' ? 'success' : 'primary'"
                @click="submitFix(index)"
              >
                {{
                  props.type === 'expire'
                    ? '确定更改并将资源标记为有效'
                    : '更改链接'
                }}
              </KunButton>
            </div>
          </div>
        </KunCard>
      </template>

      <template v-else>
        <KunCard
          :is-pressable="true"
          v-for="(res, index) in data.resources"
          :key="index"
          :href="`/galgame/${res.galgameId}`"
        >
          <div>
            {{ getPreferredLanguageText(res.galgameName) }}
          </div>

          <div class="flex items-center justify-between">
            <div class="space-x-2">
              <KunBadge color="primary">
                <KunIcon
                  :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[res.platform]"
                />
                {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[res.platform] }}
              </KunBadge>

              <KunBadge :color="res.status ? 'danger' : 'success'">
                {{ res.status ? '链接过期' : '链接有效' }}
              </KunBadge>
            </div>

            <div class="text-default-500 text-sm">
              {{ formatDate(res.created, { isShowYear: true }) }}
            </div>
          </div>
        </KunCard>
      </template>

      <KunPagination
        v-if="data.totalCount > pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>

    <KunNull
      v-if="data && !data.resources.length"
      description="这里暂无相关 Galgame 资源"
    />
  </div>
</template>
