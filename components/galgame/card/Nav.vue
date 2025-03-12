<script setup lang="ts">
import {
  typeOptions,
  languageOptions,
  platformOptions,
  sortFieldOptions
} from '~/components/galgame/utils/options'
import type {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP,
  KUN_GALGAME_RESOURCE_SORT_FIELD_MAP
} from '~/constants/galgame'

const { page, type, language, platform, sortField, sortOrder } = storeToRefs(
  useTempGalgameStore()
)

watch(
  () => [
    type.value,
    language.value,
    platform.value,
    sortField.value,
    sortOrder.value
  ],
  () => {
    page.value = 1
  }
)
</script>

<template>
  <div
    class="bg-background z-10 flex w-full shrink-0 items-center justify-start rounded-lg border p-3 shadow"
  >
    <div
      class="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <KunSelect
        :model-value="type"
        :options="typeOptions"
        @set="(newVal) => (type = newVal as TypeOptions)"
      >
        {{ KUN_GALGAME_RESOURCE_TYPE_MAP[type] }}
      </KunSelect>

      <KunSelect
        :options="languageOptions"
        :model-value="language"
        @set="(newVal) => (language = newVal as LanguageOptions)"
      >
        {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[language] }}
      </KunSelect>

      <KunSelect
        :options="platformOptions"
        :model-value="platform"
        @set="(newVal) => (platform = newVal as PlatformOptions)"
      >
        {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform] }}
      </KunSelect>

      <KunSelect
        :options="sortFieldOptions"
        :model-value="sortField"
        @set="(value) => (sortField = value as 'time' | 'views')"
      >
        <span>{{ KUN_GALGAME_RESOURCE_SORT_FIELD_MAP[sortField] }}</span>
      </KunSelect>

      <div class="flex items-center gap-2">
        <KunButton
          :is-icon-only="true"
          :variant="sortOrder === 'desc' ? 'flat' : 'light'"
          size="lg"
          @click="sortOrder = 'desc'"
        >
          <Icon class="text-inherit" name="lucide:arrow-down" />
        </KunButton>

        <KunButton
          :is-icon-only="true"
          :variant="sortOrder === 'asc' ? 'flat' : 'light'"
          size="lg"
          @click="sortOrder = 'asc'"
        >
          <Icon class="text-inherit" name="lucide:arrow-up" />
        </KunButton>
      </div>
    </div>
  </div>
</template>
