<script setup lang="ts">
import type { KunLanguage } from '~/types/i18n'

const props = defineProps<{
  name: KunLanguage
}>()

const title = ref(props.name)
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>{{ $t('edit.galgame.title.name') }}</template>

    <template #help>{{ $t('edit.galgame.title.help') }}</template>
  </KunHeader>

  <div class="titles">
    <KunInput
      :placeholder="$t('edit.galgame.introduction.en-us')"
      v-model="title['en-us']"
    />
    <KunInput
      :placeholder="$t('edit.galgame.introduction.ja-jp')"
      v-model="title['ja-jp']"
    />
    <KunInput
      :placeholder="$t('edit.galgame.introduction.zh-cn')"
      v-model="title['zh-cn']"
    />
  </div>
</template>

<style lang="scss" scoped>
.titles {
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;

  input {
    margin-bottom: 7px;
  }
}
</style>
