<script setup lang="ts">
import dayjs from 'dayjs'
import type { NonMoeLog } from '~/types/api/non-moe'

const props = defineProps<{
  logs: NonMoeLog[]
}>()

const logs = computed(() => props.logs)
</script>

<template>
  <div class="log" v-for="(kun, index) in logs" :key="index">
    <div class="kungalgamer">
      @
      <NuxtLinkLocale :to="`/kungalgamer/${kun.uid}/info`" target="_blank">
        {{ kun.name }}
      </NuxtLinkLocale>
    </div>

    <div class="reason" v-html="kun.description"></div>

    <div class="footer">
      <div class="time">
        <Icon class="hourglass" name="lucide:clock-7" />
        <span>{{ dayjs(kun.time).format('YYYY/MM/DD') }}</span>
      </div>
      <div class="result">
        <Icon class="warning" name="lucide:triangle-alert" />
        <span v-if="typeof kun.result === 'number'">
          {{ $t('nonMoe.moemoepoint') }} - {{ kun.result }}
        </span>
        <span v-else> {{ kun.result }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log {
  margin: 20px 40px;
  border-bottom: 1px solid var(--kungalgame-blue-5);
}

.kungalgamer {
  margin-bottom: 10px;
  font-weight: bold;

  a {
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.reason {
  width: 100%;
  padding-left: 5px;
  border-left: 2px solid var(--kungalgame-blue-5);
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
}

.time {
  display: flex;
  align-items: center;

  .hourglass {
    margin-right: 7px;
    font-size: 17px;
    color: var(--kungalgame-purple-4);
  }
}
.result {
  border-right: 4px solid var(--kungalgame-red-4);
  padding-right: 5px;
  display: flex;
  align-items: center;

  .warning {
    margin-right: 7px;
    font-size: 17px;
    color: var(--kungalgame-red-3);
  }
}

@media (max-width: 700px) {
  .log {
    margin: 20px 10px;

    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
