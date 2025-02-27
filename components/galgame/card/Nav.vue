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
      class="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <KunSelect
        label="游戏类型"
        :model-value="type"
        :options="typeOptions"
        @set="(newVal) => (type = newVal as TypeOptions)"
        position="bottom"
      >
        {{ KUN_GALGAME_RESOURCE_TYPE_MAP[type] }}
      </KunSelect>

      <KunSelect
        label="游戏语言"
        :options="languageOptions"
        :model-value="language"
        @set="(newVal) => (language = newVal as LanguageOptions)"
        position="bottom"
      >
        {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[language] }}
      </KunSelect>

      <KunSelect
        label="游戏平台"
        :options="platformOptions"
        :model-value="platform"
        @set="(newVal) => (platform = newVal as PlatformOptions)"
        position="bottom"
      >
        {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform] }}
      </KunSelect>

      <KunSelect
        label="排序"
        :options="sortFieldOptions"
        :model-value="sortField"
        @set="(value) => (sortField = value as 'time' | 'views')"
        position="bottom"
      >
        <span>{{ KUN_GALGAME_RESOURCE_SORT_FIELD_MAP[sortField] }}</span>
      </KunSelect>

      <div class="order">
        <span
          :class="sortOrder === 'asc' ? 'active' : ''"
          @click="sortOrder = 'asc'"
        >
          <Icon class="icon" name="lucide:arrow-up" />
        </span>
        <span
          :class="sortOrder === 'desc' ? 'active' : ''"
          @click="sortOrder = 'desc'"
        >
          <Icon class="icon" name="lucide:arrow-down" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order {
  display: flex;
  margin-left: auto;

  .icon {
    font-size: 20px;
  }

  & > span {
    display: flex;
    cursor: pointer;
    padding: 3px 10px;
    margin-right: 5px;
    border-radius: 10px;
  }

  .active {
    box-shadow: var(--shadow);
    color: var(--kungalgame-blue-5);
  }
}

@media (max-width: 700px) {
  .nav {
    padding: 10px 5px;
    margin: 0 5px;
    margin-bottom: 5px;
  }
}
</style>
