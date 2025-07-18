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
import type {
  KunGalgameResourceTypeOptions,
  KunGalgameResourceLanguageOptions,
  KunGalgameResourcePlatformOptions
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
    class="bg-background dark:border-default-200 z-10 flex w-full shrink-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-transparent p-3 shadow backdrop-blur-[var(--kun-background-blur)] sm:flex-nowrap"
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

    <div class="flex items-center gap-2">
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
