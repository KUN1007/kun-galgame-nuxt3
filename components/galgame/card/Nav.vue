<script setup lang="ts">
import {
  typeOptions,
  languageOptions,
  platformOptions
} from '~/components/galgame/utils/options'
import type {
  TypeOptions,
  LanguageOptions,
  PlatformOptions
} from '~/components/galgame/utils/options'

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
  <div class="nav">
    <KunSelect
      :styles="{ width: '150px' }"
      :options="typeOptions"
      i18n="galgame.resource.type"
      @set="(newVal) => (type = newVal as TypeOptions)"
      position="bottom"
    >
      {{ $t(`galgame.resource.type.${type}`) }}
    </KunSelect>

    <KunSelect
      :styles="{ width: '150px' }"
      :options="languageOptions"
      i18n="galgame.resource.language"
      @set="(newVal) => (language = newVal as LanguageOptions)"
      position="bottom"
    >
      {{ $t(`galgame.resource.language.${language}`) }}
    </KunSelect>

    <KunSelect
      :styles="{ width: '150px' }"
      :options="platformOptions"
      i18n="galgame.resource.platform"
      @set="(newVal) => (platform = newVal as PlatformOptions)"
      position="bottom"
    >
      {{ $t(`galgame.resource.platform.${platform}`) }}
    </KunSelect>

    <KunSelect
      :styles="{ width: '150px' }"
      :options="['views', 'time']"
      :default-value="sortField"
      i18n="galgame.resource.sort"
      @set="(value) => (sortField = value as 'time' | 'views')"
      position="bottom"
    >
      <span>{{ $t(`galgame.resource.sort.${sortField}`) }}</span>
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
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  box-shadow: var(--shadow);
  margin-bottom: 10px;
  z-index: 10;
  position: relative;
  max-width: 100%;
  padding: 10px 17px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 10px;
    backdrop-filter: blur(var(--kun-background-blur));
    will-change: transform;
  }
}

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
