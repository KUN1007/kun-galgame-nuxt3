<script setup lang="ts">
import type { GalgameResourceStorePersist } from '~/store/types/galgame/resource'

const props = defineProps<{
  resources: GalgameResourceStorePersist[]
}>()
</script>

<template>
  <div class="links">
    <div v-for="(resource, index) in resources" :key="index">
      <div class="title">
        <span class="link">{{ resource.link }}</span>
        <span>提取码: {{ resource.code }}</span>
        <span>解压码: {{ resource.password }}</span>
      </div>

      <div class="info">
        <span>{{ $t(`edit.galgame.resource.type.${resource.type}`) }}</span>
        <span>
          {{ $t(`edit.galgame.resource.language.${resource.language}`) }}
        </span>
        <span>{{ $t(`edit.galgame.platform.${resource.platform}`) }}</span>
        <span>{{ resource.size }}</span>
      </div>

      <div class="note">{{ resource.note }}</div>

      <div>
        <KunButton>编辑</KunButton>
        <KunButton>删除</KunButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.links {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.title {
  .link {
    color: var(--kungalgame-blue-5);
    font-weight: bold;
    font-style: oblique;
    font-size: large;
  }

  span {
    margin-right: 17px;

    &:first-child {
      word-break: break-all;
    }
  }
}

.info {
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: small;

  span {
    padding: 3px 7px;
    background-color: var(--kungalgame-trans-blue-0);
    color: var(--kungalgame-blue-5);
    margin-right: 10px;
    border-radius: 10px;
  }
}

.note {
  font-size: small;
}
</style>
