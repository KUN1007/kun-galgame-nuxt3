<script setup lang="ts">
import {
  kunGalgameResourceTypeOptions,
  kunGalgameResourceLanguageOptions,
  kunGalgameResourcePlatformOptions,
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP
} from '~/constants/galgame'
import { checkGalgameResourcePublish } from '../utils/checkGalgameResourcePublish'
import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

const props = defineProps<{
  // For simplicity, the type is set to unknown here.
  refresh: () => Promise<unknown>
}>()

const emits = defineEmits<{
  close: []
}>()

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const { resources, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)
const isFetching = ref(false)

const defaultResourceLink: GalgameResourceStoreTemp = {
  type: 'game',
  link: [],
  language: 'zh-cn',
  platform: 'windows',
  size: '',
  code: '',
  password: '',
  note: ''
}

const resourceLink = ref<GalgameResourceStoreTemp>({
  ...defaultResourceLink
})

const handlePublishResourceLink = async (method: 'POST' | 'PUT') => {
  if (!checkGalgameResourcePublish(resourceLink.value)) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${gid.value}/resource`, {
    method,
    body: {
      ...resourceLink.value,
      galgameId: gid.value,
      galgameResourceId: rewriteResourceId.value
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    if (!rewriteResourceId.value) {
      useMessage(10549, 'success')
    } else {
      rewriteResourceId.value = 0
      useMessage(10550, 'success')
    }
    await props.refresh()
    resourceLink.value = defaultResourceLink
    emits('close')
  }
}

const handleCancel = () => {
  rewriteResourceId.value = 0
  resourceLink.value = defaultResourceLink
  resources.value[0] = resourceLink.value
}

watch(
  () => rewriteResourceId.value,
  () => {
    if (rewriteResourceId.value) {
      resourceLink.value = resources.value[0]
    }
  }
)

onMounted(() => {
  if (rewriteResourceId.value) {
    resourceLink.value = resources.value[0]
  }
})
</script>

<template>
  <div class="space-y-3">
    <GalgameResourceHelp />

    <KunTextarea
      placeholder="资源链接 (网盘 | 磁链 | 网址) 等, 如果同一资源有多个链接，请用英语逗号分隔每个链接"
      :model-value="resourceLink.link.toString()"
      @update:model-value="
        (value) =>
          (resourceLink.link = value
            .toString()
            .split(',')
            .map((l) => l.trim()))
      "
    />

    <div class="space-y-3">
      <KunInput placeholder="资源体积 (MB 或 GB)" v-model="resourceLink.size" />
      <KunInput placeholder="资源提取码 (可选)" v-model="resourceLink.code" />
      <KunInput
        placeholder="资源解压码 (可选)"
        v-model="resourceLink.password"
      />
    </div>

    <KunSelect
      label="资源链接的类型"
      :model-value="resourceLink.type"
      :options="
        kunGalgameResourceTypeOptions.filter((item) => item.value !== 'all')
      "
      @set="
        (value) => (resourceLink.type = value as KunGalgameResourceTypeOptions)
      "
    >
      <span>
        {{ KUN_GALGAME_RESOURCE_TYPE_MAP[resourceLink.type] }}
      </span>
    </KunSelect>

    <KunSelect
      label="资源链接的语言"
      :model-value="resourceLink.language"
      :options="
        kunGalgameResourceLanguageOptions.filter((item) => item.value !== 'all')
      "
      @set="
        (value) =>
          (resourceLink.language = value as KunGalgameResourceLanguageOptions)
      "
    >
      <span>
        {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[resourceLink.language] }}
      </span>
    </KunSelect>

    <KunSelect
      label="资源链接的平台"
      :model-value="resourceLink.platform"
      :options="
        kunGalgameResourcePlatformOptions.filter((item) => item.value !== 'all')
      "
      @set="
        (value) =>
          (resourceLink.platform = value as KunGalgameResourcePlatformOptions)
      "
    >
      <span>
        {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[resourceLink.platform] }}
      </span>
    </KunSelect>

    <KunTextarea
      placeholder="资源备注, 可以填写资源的注意事项, 资源的介绍信息, 作者信息等等 (可选)"
      v-model="resourceLink.note"
    />

    <div class="flex justify-end gap-1">
      <KunButton
        variant="light"
        color="danger"
        v-if="!rewriteResourceId"
        @click="emits('close')"
      >
        取消
      </KunButton>
      <KunButton
        v-if="!rewriteResourceId"
        :loading="isFetching"
        @click="handlePublishResourceLink('POST')"
      >
        创建资源链接
      </KunButton>

      <KunButton
        variant="light"
        color="danger"
        v-if="rewriteResourceId"
        @click="handleCancel"
      >
        取消 Rewrite
      </KunButton>

      <KunButton
        @click="handlePublishResourceLink('PUT')"
        :loading="isFetching"
        v-if="rewriteResourceId"
      >
        确定 Rewrite
      </KunButton>
    </div>
  </div>
</template>
