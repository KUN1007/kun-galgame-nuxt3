<script setup lang="ts">
import type { GalgamePR, GalgamePRDetails } from '~/types/api/galgame-pr'

const props = defineProps<{
  gid: number
  pr: GalgamePR
  status: UseFetchStatus
  refresh: () => void
}>()

const iconMap: Record<number, string> = {
  0: 'lucide:loader',
  1: 'lucide:check',
  2: 'lucide:x'
}

const { locale } = useI18n()
const details = ref<Partial<GalgamePRDetails>>()
const isFetching = ref(false)

const handleGetDetails = async (gprid: number) => {
  if (details.value) {
    return
  }
  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.gid}/pr`, {
    method: 'GET',
    query: { gprid },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    details.value = result
  }
}

watch(
  () => props.status,
  () => {
    if (props.status === 'pending') {
      details.value = undefined
    }
  }
)
</script>

<template>
  <div class="pr">
    <div class="info">
      <KunAvatar :user="pr.user" size="30px" />
      <NuxtLinkLocale :to="`/kungalgamer/${pr.user.uid}/info`">
        {{ pr.user.name }}
      </NuxtLinkLocale>
      <span>{{ $t('galgame.pr.request') }}</span>

      <span class="time">
        {{ formatTimeDifference(pr.time, locale) }}
      </span>
    </div>

    <div class="btn">
      <span class="description" :class="`status${pr.status}`">
        <span v-if="pr.completedTime">
          {{
            formatDate(pr.completedTime, locale, {
              isShowYear: true,
              isPrecise: true
            })
          }}
        </span>
        <Icon class="icon" :name="iconMap[pr.status]" />
        <span>{{ $t(`galgame.pr.status${pr.status}`) }}</span>
      </span>

      <KunButton
        v-if="!details && pr.status !== 2"
        @click="handleGetDetails(pr.gprid)"
        :pending="isFetching"
      >
        {{ $t('galgame.pr.details') }}
      </KunButton>

      <span v-if="pr.status == 2">{{ `#${pr.index}` }}</span>

      <span v-if="details" class="close" @click="details = undefined">
        <Icon class="icon" name="lucide:x" />
      </span>
    </div>
  </div>

  <GalgamePrDetails v-if="details" :details="details" :refresh="refresh" />
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
    margin: 0 10px;
    color: var(--kungalgame-blue-5);
  }

  .time {
    color: var(--kungalgame-font-color-1);
    margin-left: 10px;
  }
}

.btn {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    font-size: 14px;

    span {
      &:nth-child(1) {
        margin-right: 5px;
      }
    }

    .icon {
      margin-right: 5px;
    }
  }

  .kun-button {
    padding: 3px 10px;
  }

  .close {
    cursor: pointer;
    font-size: 20px;
  }
}

.status0 {
  color: var(--kungalgame-blue-5);
}

.status1 {
  color: var(--kungalgame-green-4);
}

.status2 {
  color: var(--kungalgame-red-5);
}
</style>
