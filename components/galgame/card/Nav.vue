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
import { usePersistKUNGalgameAdvancedFilterStore } from '~/store/modules/galgame'
import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
} from '~/constants/galgame'

const props = withDefaults(
  defineProps<{
    isShowAdvanced?: boolean
  }>(),
  { isShowAdvanced: false }
)

const { page, type, language, platform, sortField, sortOrder } = storeToRefs(
  useTempGalgameStore()
)

const advStore = usePersistKUNGalgameAdvancedFilterStore()
const { includeProviders, excludeOnlyProviders } = storeToRefs(advStore)
const hasAdvanceFilter = computed(
  () => !!includeProviders.value.length || !!excludeOnlyProviders.value.length
)

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

const toggleIncludeProvider = (key: ProviderKey) => {
  advStore.toggleIncludeProvider(key)
}

const toggleExcludeOnlyProvider = (key: ProviderKey) => {
  advStore.toggleExcludeOnlyProvider(key)
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
        v-if="props.isShowAdvanced"
        :auto-position="true"
        position="bottom-end"
        :inner-class="'min-w-64 p-3'"
      >
        <template #trigger>
          <KunButton
            :color="hasAdvanceFilter ? 'warning' : 'primary'"
            :variant="hasAdvanceFilter ? 'flat' : 'light'"
          >
            <KunIcon
              :name="hasAdvanceFilter ? 'lucide:check' : 'lucide:filter'"
              class="mr-2"
            />
            <span>高级筛选</span>
          </KunButton>
        </template>

        <div class="space-y-3">
          <div>
            <div class="mb-2 text-sm font-medium">
              必须含有下面网盘下载的 Galgame
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

          <KunDivider />

          <div class="text-default-500 text-sm">
            网站是聪明的萝莉, 她会记住您的高级筛选, 下次使用时仍会应用筛选
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
