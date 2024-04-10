<script setup lang="ts">
import type {
  GalgameResource,
  GalgameResourceDetails
} from '~/types/api/galgame-resource'

const props = defineProps<{
  link: GalgameResource
  refresh: () => {}
}>()

const iconMap: Record<string, string> = {
  game: 'lucide:box',
  patch: 'lucide:puzzle',
  collection: 'lucide:boxes',
  voice: 'lucide:music-4',
  image: 'lucide:image',
  ai: 'simple-icons:openai',
  others: 'lucide:ellipsis'
}

const details = ref<GalgameResourceDetails>()
const { rewriteResourceId } = storeToRefs(useTempGalgameResourceStore())
const isFetching = ref(false)

const handleGetDetail = async (grid: number) => {
  if (details.value) {
    return
  }
  isFetching.value = true
  const { data } = await useFetch(`/api/galgame/${props.link.gid}/resource`, {
    query: { grid },
    method: 'GET',
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (data.value) {
    details.value = data.value
  }
}

watch(
  () => rewriteResourceId.value,
  () => {
    details.value = undefined
  }
)
</script>

<template>
  <div class="link">
    <div class="base">
      <div class="info">
        <span class="rewrite" v-if="link.grid === rewriteResourceId">
          <Icon name="svg-spinners:12-dots-scale-rotate" />
          <span>正在编辑中</span>
        </span>
        <span>
          <Icon :name="iconMap[link.type]" />
          <span>{{ $t(`edit.galgame.resource.type.${link.type}`) }}</span>
        </span>
        <span>
          <Icon name="lucide:database" />
          <span>{{ link.size }}</span>
        </span>
        <span>
          {{ $t(`edit.galgame.resource.language.${link.language}`) }}
        </span>
        <span>{{ $t(`edit.galgame.platform.${link.platform}`) }}</span>
      </div>

      <div class="status">
        <KunButton
          v-if="link.grid !== rewriteResourceId"
          @click="handleGetDetail(link.grid)"
          :pending="isFetching"
        >
          获取链接
        </KunButton>

        <GalgameResourceLike
          :gid="link.gid"
          :grid="link.grid"
          :to-uid="link.uid"
          :likes="link.likes"
          v-tooltip="{
            message: { en: 'Like', zh: '点赞' },
            position: 'bottom'
          }"
        />

        <NuxtLinkLocale
          to="/report"
          v-tooltip="{
            message: { en: 'Report violation', zh: '举报违规' },
            position: 'bottom'
          }"
        >
          <Icon name="lucide:triangle-alert" />
        </NuxtLinkLocale>

        <span class="status-dot" :class="`status-${link.status}`"></span>
      </div>
    </div>

    <GalgameResourceDetails
      v-if="details"
      :details="details"
      :refresh="refresh"
    />

    <KunDivider margin="0 0 17px 0" />
  </div>
</template>

<style lang="scss" scoped>
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

  .rewrite {
    user-select: none;
    color: var(--kungalgame-red-5);
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

  .kun-button {
    margin-right: 17px;
    padding: 3px 10px;
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
  background-color: var(--kungalgame-gray-4);
  border-radius: 50%;
}

.status-2 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-red-4);
  border-radius: 50%;
}
</style>
