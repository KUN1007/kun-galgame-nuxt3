<script setup lang="ts">
import type {
  GalgameResource,
  GalgameResourceDetails
} from '~/types/api/galgame-resource'

const props = defineProps<{
  link: GalgameResource
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

const handleGetDetail = async (grid: number) => {
  if (details.value) {
    return
  }
  const { data } = await useFetch(`/api/galgame/${props.link.gid}/resource`, {
    query: { grid },
    method: 'GET',
    ...kungalgameResponseHandler
  })
  if (data.value) {
    details.value = data.value
  }
}
</script>

<template>
  <div class="link">
    <div class="base">
      <div class="info">
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
        <KunButton @click="handleGetDetail(link.grid)">获取链接</KunButton>
        <span>
          <Icon class="icon" name="lucide:thumbs-up" />
          <span v-if="link.likes">{{ link.likes }}</span>
        </span>
        <span class="status-dot" :class="`status-${link.status}`"></span>
      </div>
    </div>

    <GalgameResourceDetails v-if="details" :details="details" />

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
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: auto;

  & > span {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .kun-button {
    margin-right: 17px;
    padding: 3px 10px;
  }

  .icon {
    margin-right: 3px;
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
