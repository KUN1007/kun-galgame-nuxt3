<script setup lang="ts">
import { typeOptions, languageOptions, platformOptions } from '../utils/options'
import { checkGalgameResourcePublish } from '../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

const props = defineProps<{
  // For simplicity, the type is set to unknown here.
  refresh: () => Promise<unknown>
}>()

const { locale } = useI18n()
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
  link: '',
  language: locale.value,
  platform: 'windows',
  size: '',
  code: '',
  password: '',
  note: ''
}

const resourceLink = ref<GalgameResourceStoreTemp>({ ...defaultResourceLink })

const handlePublishResourceLink = async (method: 'POST' | 'PUT') => {
  if (!checkGalgameResourcePublish(resourceLink.value)) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${gid.value}/resource`, {
    method,
    query: rewriteResourceId.value ? { grid: rewriteResourceId.value } : {},
    body: resourceLink.value,
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    if (!rewriteResourceId.value) {
      useMessage(
        'Publish resource link successfully!',
        '发布资源链接成功!',
        'success'
      )
    } else {
      rewriteResourceId.value = 0
      useMessage(
        'Rewrite resource link successfully!',
        'Rewrite 资源链接成功!',
        'success'
      )
    }
    await props.refresh()
    resourceLink.value = { ...defaultResourceLink }
  }
}

const handleCancel = () => {
  rewriteResourceId.value = 0
  resourceLink.value = { ...defaultResourceLink }
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
  <GalgameResourceHelp />

  <div class="link">
    <KunInput
      :placeholder="`${$t('galgame.resource.placeholder.link')}`"
      v-model="resourceLink.link"
    />

    <div>
      <KunInput
        :placeholder="`${$t('galgame.resource.placeholder.size')}`"
        v-model="resourceLink.size"
      />
      <KunInput
        :placeholder="`${$t('galgame.resource.placeholder.extract')}`"
        v-model="resourceLink.code"
      />
      <KunInput
        :placeholder="`${$t('galgame.resource.placeholder.decompress')}`"
        v-model="resourceLink.password"
      />
    </div>
  </div>

  <div class="type">
    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="typeOptions"
      i18n="edit.galgame.resource.type"
      @set="(value) => (resourceLink.type = value)"
      position="top"
      default-value="game"
    >
      <div class="select">
        <span>{{ $t('galgame.resource.type') }}</span>
        <span v-if="resourceLink.type">
          {{ $t(`edit.galgame.resource.type.${resourceLink.type}`) }}
        </span>
      </div>
    </KunSelect>

    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="languageOptions"
      i18n="edit.galgame.resource.language"
      @set="(value) => (resourceLink.language = value)"
      position="top"
      :default-value="locale"
    >
      <div class="select">
        <span>{{ $t('galgame.resource.language') }}</span>
        <span v-if="resourceLink.language">
          {{ $t(`edit.galgame.resource.language.${resourceLink.language}`) }}
        </span>
      </div>
    </KunSelect>

    <KunSelect
      class="kun-select"
      :styles="{ width: '200px' }"
      :options="platformOptions"
      i18n="edit.galgame.platform"
      @set="(value) => (resourceLink.platform = value)"
      position="top"
      default-value="windows"
    >
      <div class="select">
        <span>{{ $t('galgame.resource.platform') }}</span>
        <span v-if="resourceLink.platform">
          {{ $t(`edit.galgame.platform.${resourceLink.platform}`) }}
        </span>
      </div>
    </KunSelect>
  </div>

  <div class="note">
    <KunInput
      :placeholder="`${$t('galgame.resource.placeholder.note')}`"
      v-model="resourceLink.note"
    />
  </div>

  <div class="btn">
    <KunButton
      @click="handlePublishResourceLink('POST')"
      type="primary"
      :pending="isFetching"
      v-if="!rewriteResourceId"
    >
      {{ $t('galgame.resource.create') }}
    </KunButton>

    <KunButton v-if="rewriteResourceId" @click="handleCancel">
      {{ $t('galgame.resource.cancelRewrite') }}
    </KunButton>

    <KunButton
      class="rewrite"
      @click="handlePublishResourceLink('PUT')"
      type="danger"
      :pending="isFetching"
      v-if="rewriteResourceId"
    >
      {{ $t('galgame.resource.confirmRewrite') }}
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: column;

  & > div {
    margin-top: 10px;

    input {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}

.type {
  display: flex;
  flex-wrap: wrap;
}

.kun-select {
  padding: 10px;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.select {
  display: flex;
  flex-direction: column;

  span {
    &:first-child {
      font-size: small;
      color: var(--kungalgame-font-color-0);
    }
  }
}

.note {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  button {
    margin: 17px 0;
  }
}

.btn {
  margin-bottom: 10px;
  display: flex;
  width: 100%;

  button {
    width: 100%;
  }

  .rewrite {
    margin-left: 10px;
  }
}
</style>
