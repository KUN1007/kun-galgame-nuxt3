<script setup lang="ts">
import { typeOptions, languageOptions, platformOptions } from '../utils/options'
import { checkGalgameResourcePublish } from '../utils/checkGalgameResourcePublish'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

const { locale } = useI18n()
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data: resourceData } = await useLazyFetch(
  `/api/galgame/${gid.value}/resource/all`,
  {
    method: 'GET',
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="resource">
    <h2>{{ $t('edit.galgame.resource.name') }}</h2>
    <div class="links">
      <div v-for="(resource, index) in resourceData" :key="index">
        <GalgameResourceLink :link="resource" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resource {
  width: 100%;
  display: flex;
  flex-direction: column;
}

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

.type {
  display: flex;
}

.note {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
