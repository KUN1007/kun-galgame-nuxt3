<script setup lang="ts">
import {
  typeIconMap,
  platformIconMap
} from '~/components/galgame/utils/iconMap'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP
} from '~/constants/galgame'
import type { HomeGalgameResources } from '~/types/api/home'

defineProps<{
  link: HomeGalgameResources
}>()

const { uid } = usePersistUserStore()
const { rewriteResourceId } = storeToRefs(useTempGalgameResourceStore())
</script>

<template>
  <div class="title">
    <NuxtLink :to="`/galgame/${link.gid}`">
      {{ link.name['zh-cn'] }}
    </NuxtLink>
    <span class="time">
      {{ formatTimeDifference(link.time) }}
    </span>
  </div>

  <div class="link">
    <div class="base">
      <div class="info">
        <span class="rewrite" v-if="link.grid === rewriteResourceId">
          <Icon class="icon" name="svg-spinners:12-dots-scale-rotate" />
          <span>编辑中...</span>
        </span>
        <span>
          <Icon class="icon" :name="typeIconMap[link.type]" />
          <span>{{ KUN_GALGAME_RESOURCE_TYPE_MAP[link.type] }}</span>
        </span>
        <span>
          <Icon class="icon" name="lucide:database" />
          <span>{{ link.size }}</span>
        </span>
        <span>
          <Icon class="icon" :name="platformIconMap[link.platform]" />
          <span>{{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[link.platform] }}</span>
        </span>
        <span>
          {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[link.language] }}
        </span>
      </div>

      <div class="status">
        <GalgameResourceLike
          v-if="uid !== link.uid"
          :gid="link.gid"
          :grid="link.grid"
          :to-uid="link.uid"
          :likes="link.likes"
          v-tooltip="{
            message: '点赞',
            position: 'bottom'
          }"
        />

        <NuxtLink
          v-if="uid !== link.uid"
          to="/report"
          aria-label="Report violation"
          v-tooltip="{
            message: '举报违规',
            position: 'bottom'
          }"
        >
          <Icon class="icon" name="lucide:triangle-alert" />
        </NuxtLink>

        <span
          class="status-dot"
          :class="`status-${link.status}`"
          v-tooltip="{
            message: link.status ? '链接过期' : '链接有效',
            position: 'bottom'
          }"
        />
      </div>
    </div>

    <KunDivider margin="0 0 17px 0" color="var(--kungalgame-trans-blue-1)" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  width: 100%;
  font-size: 18px;
  margin-bottom: 7px;

  a {
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .time {
    color: var(--kungalgame-font-color-0);
    font-size: small;
    font-weight: initial;
    margin-left: 17px;
    white-space: nowrap;
  }
}

.base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-bottom: 10px;

  & > span {
    padding: 3px 7px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: medium;
    margin-right: 5px;
  }
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: auto;

  & > span,
  a {
    color: var(--kungalgame-font-color-3);
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-0 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-green-4);
  border-radius: 50%;
}

.status-1 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-red-4);
  border-radius: 50%;
}
</style>
