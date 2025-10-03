<script setup lang="ts">
import {
  kunGalgameResourceTypeOptions,
  kunGalgameResourceLanguageOptions,
  kunGalgameResourcePlatformOptions,
  kunGalgameSortFieldOptions,
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP,
  KUN_GALGAME_RESOURCE_SORT_FIELD_MAP
} from '~/constants/galgame'
import {
  KUN_GALGAME_PROVIDER_LABEL_MAP,
  PROVIDER_KEY_OPTIONS,
  type ProviderKey
} from '~/constants/galgameResource'
import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'

const {
  page,
  type,
  language,
  platform,
  sortField,
  sortOrder,
  includeProviders,
  excludeOnlyProviders
} = storeToRefs(useTempGalgameStore())

watch(
  () => [
    type.value,
    language.value,
    platform.value,
    sortField.value,
    sortOrder.value,
    includeProviders.value.join(','),
    excludeOnlyProviders.value.join(',')
  ],
  () => {
    page.value = 1
  }
)

const toggleItemInArray = <T,>(arrayRef: Ref<T[]>, item: T) => {
  const index = arrayRef.value.indexOf(item)
  if (index === -1) {
    arrayRef.value.push(item)
  } else {
    arrayRef.value.splice(index, 1)
  }
}

const toggleIncludeProvider = (key: ProviderKey) => {
  toggleItemInArray(includeProviders as Ref<ProviderKey[]>, key)
}

const toggleExcludeOnlyProvider = (key: ProviderKey) => {
  toggleItemInArray(excludeOnlyProviders as Ref<ProviderKey[]>, key)
}
</script>

<template>
  <div
    class="flex w-full shrink-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-transparent sm:flex-nowrap"
  >
    <div class="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
      <KunSelect
        :model-value="type"
        :options="kunGalgameResourceTypeOptions"
        @set="(newVal) => (type = newVal as KunGalgameResourceTypeOptions)"
      >
        {{ KUN_GALGAME_RESOURCE_TYPE_MAP[type] }}
      </KunSelect>

      <KunSelect
        :options="kunGalgameResourceLanguageOptions"
        :model-value="language"
        @set="
          (newVal) => (language = newVal as KunGalgameResourceLanguageOptions)
        "
      >
        {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[language] }}
      </KunSelect>

      <KunSelect
        :options="kunGalgameResourcePlatformOptions"
        :model-value="platform"
        @set="
          (newVal) => (platform = newVal as KunGalgameResourcePlatformOptions)
        "
      >
        {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform] }}
      </KunSelect>

      <KunSelect
        :options="kunGalgameSortFieldOptions"
        :model-value="sortField"
        @set="(value) => (sortField = value as 'time' | 'view' | 'created')"
      >
        <span>{{ KUN_GALGAME_RESOURCE_SORT_FIELD_MAP[sortField] }}</span>
      </KunSelect>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <KunPopover
        :auto-position="true"
        position="bottom-end"
        :inner-class="'min-w-64 p-3'"
      >
        <template #trigger>
          <KunButton variant="light">
            <KunIcon name="lucide:filter" class="mr-2" />
            <span>网盘种类</span>
          </KunButton>
        </template>

        <div class="space-y-3">
          <div>
            <div class="mb-2 text-sm font-medium">
              资源链接必须含有下面网盘提供方的 Galgame (默认全选)
            </div>
            <div class="grid grid-cols-2 gap-2">
              <KunCheckBox
                v-for="key in PROVIDER_KEY_OPTIONS"
                :key="key"
                class-name="gap-2 last:col-span-2"
                color="primary"
                :model-value="includeProviders.includes(key)"
                @click="toggleIncludeProvider(key as ProviderKey)"
              >
                {{ KUN_GALGAME_PROVIDER_LABEL_MAP[key as ProviderKey] }}
              </KunCheckBox>
            </div>
          </div>
          <KunDivider />
          <div>
            <div class="mb-2 text-sm font-medium">
              排除仅含有以下网盘下载的 Galgame
            </div>
            <div class="grid grid-cols-2 gap-2">
              <KunCheckBox
                v-for="key in PROVIDER_KEY_OPTIONS"
                :key="key + '-ex'"
                class-name="gap-2 last:col-span-2"
                color="danger"
                :model-value="excludeOnlyProviders.includes(key)"
                @click="toggleExcludeOnlyProvider(key as ProviderKey)"
              >
                {{ KUN_GALGAME_PROVIDER_LABEL_MAP[key as ProviderKey] }}
              </KunCheckBox>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-1">
            <KunButton variant="light" size="sm" @click="includeProviders = []">
              清空包含
            </KunButton>
            <KunButton
              variant="light"
              size="sm"
              @click="excludeOnlyProviders = []"
            >
              清空排除
            </KunButton>
          </div>
        </div>
      </KunPopover>

      <KunButton
        :is-icon-only="true"
        :variant="sortOrder === 'desc' ? 'flat' : 'light'"
        size="lg"
        @click="sortOrder = 'desc'"
      >
        <KunIcon class="text-inherit" name="lucide:arrow-down" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        :variant="sortOrder === 'asc' ? 'flat' : 'light'"
        size="lg"
        @click="sortOrder = 'asc'"
      >
        <KunIcon class="text-inherit" name="lucide:arrow-up" />
      </KunButton>
    </div>
  </div>
</template>
