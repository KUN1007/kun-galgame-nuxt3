<script setup lang="ts">
import { typeIconMap, platformIconMap } from '../utils/iconMap'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP,
  KUN_GALGAME_RESOURCE_SORT_FIELD_MAP
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
  <div class="link">
    <div class="base">
      <div class="info">
        <span class="rewrite" v-if="link.grid === rewriteResourceId">
          <Icon class="icon" name="svg-spinners:12-dots-scale-rotate" />
          <span>编辑中...</span>
        </span>
        <span>
          <Icon class="icon" :name="typeIconMap[link.type]" />
          <span>{{ KUN_GALGAME_RESOURCE_TYPE_MAP[link.type] }}</span>
        </span>
        <span>
          <Icon class="icon" name="lucide:database" />
          <span>{{ link.size }}</span>
        </span>
        <span>
          <Icon class="icon" :name="platformIconMap[link.platform]" />
          <span>{{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[link.platform] }}</span>
        </span>
        <span>
          {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[link.language] }}
        </span>
      </div>

      <div class="status">
        <span v-if="details" class="close" @click="details = undefined">
          <Icon class="icon" name="lucide:x" />
        </span>

        <KunButton
          class="valid"
          v-if="uid === link.uid && link.status === 1"
          @click="handleMarkValid(link.gid, link.grid)"
          :pending="isFetching"
        >
          标记有效
        </KunButton>
        <KunButton
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
          v-tooltip="{
            message: '点赞',
            position: 'bottom'
          }"
        />

        <NuxtLink
          v-if="uid !== link.uid"
          to="/report"
          v-tooltip="{
            message: '举报违规',
            position: 'bottom'
          }"
        >
          <Icon class="icon" name="lucide:triangle-alert" />
        </NuxtLink>

        <span
          class="status-dot"
          :class="`status-${link.status}`"
          v-tooltip="{
            message: link.status ? '链接过期' : '链接有效',
            position: 'bottom'
          }"
        />
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

<style lang="scss" scoped>
.base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-bottom: 10px;

  & > span {
    padding: 3px 7px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: medium;
    margin-right: 5px;
  }

  .rewrite {
    user-select: none;
    color: var(--kungalgame-red-5);
  }
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: auto;

  & > span,
  a {
    color: var(--kungalgame-font-color-3);
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .kun-button {
    margin-right: 17px;
    padding: 3px 10px;
  }

  .close {
    cursor: pointer;
    margin-right: 17px;
    font-size: 20px;
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-0 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-green-4);
  border-radius: 50%;
}

.status-1 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-red-4);
  border-radius: 50%;
}
</style>
