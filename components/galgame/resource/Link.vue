<script setup lang="ts">
import { typeIconMap, platformIconMap } from '../utils/iconMap'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP
} from '~/constants/galgame'
import type {
  GalgameResource,
  GalgameResourceDetails
} from '~/types/api/galgame-resource'

const props = defineProps<{
  link: GalgameResource
  refresh: () => void
}>()

const details = ref<GalgameResourceDetails>()
const { uid } = usePersistUserStore()
const { rewriteResourceId } = storeToRefs(useTempGalgameResourceStore())
const isFetching = ref(false)

const handleGetDetail = async (grid: number) => {
  if (details.value) {
    return
  }
  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.link.gid}/resource`, {
    query: { grid },
    method: 'GET',
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    details.value = result
  }
}

const handleMarkValid = async (gid: number, grid: number) => {
  const res = await useComponentMessageStore().alert(
    '您确定重新标记资源链接有效吗？',
    '若您修复了资源链接，您可以重新标记资源链接有效。'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/resource/valid`, {
    method: 'PUT',
    query: { grid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(10548, 'success')
    props.refresh()
  }
}

watch(
  () => [rewriteResourceId.value, props.link],
  () => {
    details.value = undefined
  }
)
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap items-center justify-between space-y-2">
      <div class="flex flex-wrap items-center gap-1 rounded-lg">
        <KunBadge color="primary">
          <Icon :name="typeIconMap[link.type]" />
          {{ KUN_GALGAME_RESOURCE_TYPE_MAP[link.type] }}
        </KunBadge>
        <KunBadge color="warning">
          <Icon name="lucide:database" />
          {{ link.size }}
        </KunBadge>
        <KunBadge color="secondary">
          <Icon :name="platformIconMap[link.platform]" />
          {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[link.platform] }}
        </KunBadge>
        <KunBadge color="success">
          {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[link.language] }}
        </KunBadge>
      </div>

      <div class="flex items-center gap-1">
        <KunButton
          :is-icon-only="true"
          variant="light"
          color="default"
          rounded="full"
          v-if="details"
          @click="details = undefined"
        >
          <Icon name="lucide:x" />
        </KunButton>

        <KunButton
          v-if="uid === link.uid && link.status === 1"
          @click="handleMarkValid(link.gid, link.grid)"
          :pending="isFetching"
        >
          标记有效
        </KunButton>
        <KunButton
          size="sm"
          variant="flat"
          v-if="!details && link.grid !== rewriteResourceId"
          @click="handleGetDetail(link.grid)"
          :pending="isFetching"
        >
          获取链接
        </KunButton>

        <GalgameResourceLike
          v-if="uid !== link.uid"
          :gid="link.gid"
          :grid="link.grid"
          :to-uid="link.uid"
          :likes="link.likes"
        />

        <KunTooltip text="举报违规">
          <KunButton
            :is-icon-only="true"
            color="danger"
            variant="light"
            v-if="uid !== link.uid"
            href="/report"
          >
            <Icon name="lucide:triangle-alert" />
          </KunButton>
        </KunTooltip>

        <KunTooltip :text="link.status ? '链接过期' : '链接有效'">
          <span
            class="status-dot"
            :class="
              cn(
                'rounded0full h-2 w-2',
                link.status ? 'bg-danger' : 'bg-success'
              )
            "
          />
        </KunTooltip>
      </div>
    </div>

    <GalgameResourceDetails
      v-if="details"
      :details="details"
      :refresh="refresh"
    />

    <KunDivider margin="0 0 17px 0" />
  </div>
</template>
