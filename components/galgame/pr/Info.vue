<script setup lang="ts">
import dayjs from 'dayjs'
import type { GalgamePR, GalgamePRDetails } from '~/types/api/galgame-pr'

const props = defineProps<{
  gid: number
  pr: GalgamePR
}>()

const iconMap: Record<number, string> = {
  0: 'lucide:loader',
  1: 'lucide:check',
  2: 'lucide:x'
}

const { locale } = useI18n()
const details = ref<Partial<GalgamePRDetails>>()

const handleGetDetails = async (gprid: number) => {
  if (details.value) {
    return
  }
  const { data } = await useFetch(`/api/galgame/${props.gid}/pr`, {
    method: 'GET',
    query: { gprid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    details.value = data.value
  }
}
</script>

<template>
  <div class="pr">
    <div class="info" :class="`status${pr.status}`">
      <KunAvatar :user="pr.user" size="30px" />
      <NuxtLinkLocale :to="`/kungalgamer/${pr.user.uid}/info`">
        {{ pr.user.name }}
      </NuxtLinkLocale>
      <span>提出更新请求</span>

      <span class="time">
        {{ formatTimeDifferenceHint(pr.time, locale) }}
      </span>

      <span class="description">
        <span v-if="pr.completedTime">
          {{ `${dayjs(pr.completedTime).format('MM/D - HH:mm')}` }}
        </span>
        <Icon class="icon" :name="iconMap[pr.status]" />
        <span>{{ $t(`galgame.pr.status${pr.status}`) }}</span>
      </span>
    </div>

    <div class="btn">
      <KunButton v-if="!details" @click="handleGetDetails(pr.gprid)">
        查看请求
      </KunButton>
    </div>
  </div>

  <GalgamePrDetails v-if="details" :details="details" />
</template>

<style lang="scss" scoped>
.pr {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;

  a {
    margin-left: 10px;
    color: var(--kungalgame-blue-5);
  }

  .time {
    color: var(--kungalgame-font-color-1);
    margin-left: 10px;
  }

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;

    span {
      &:nth-child(1) {
        margin-right: 5px;
      }
    }

    .icon {
      margin-right: 5px;
    }
  }
}

.btn {
  .kun-button {
    margin-right: 17px;
    padding: 3px 10px;
  }
}

.status0 {
  .description {
    color: var(--kungalgame-blue-5);
  }
}

.status1 {
  .description {
    color: var(--kungalgame-pink-4);
  }
}

.status2 {
  .description {
    color: var(--kungalgame-green-4);
  }
}

.status3 {
  .description {
    color: var(--kungalgame-gray-4);
  }
}
</style>
