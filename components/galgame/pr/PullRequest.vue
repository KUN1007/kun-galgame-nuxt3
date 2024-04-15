<script setup lang="ts">
import dayjs from 'dayjs'

const { locale } = useI18n()
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const iconMap: Record<number, string> = {
  0: 'lucide:loader',
  1: 'lucide:check',
  2: 'lucide:x'
}

const { data } = await useLazyFetch(`/api/galgame/${gid.value}/pr/all`, {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="container" v-if="data && data.length">
    <KunHeader :size="2">
      <template #header> 更新请求 </template>
    </KunHeader>

    <div class="pr" v-for="(pr, index) in data" :key="index">
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
        <KunButton>查看请求</KunButton>
        <KunButton>合并请求</KunButton>
      </div>
    </div>
  </div>
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
