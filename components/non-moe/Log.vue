<script setup lang="ts">
import type { NonMoeLog } from '~/types/api/non-moe'

const props = defineProps<{
  logs: NonMoeLog[]
}>()

const logs = computed(() => props.logs)
</script>

<template>
  <div class="space-y-4">
    <KunCard :is-hoverable="false" v-for="(kun, index) in logs" :key="index">
      <div>
        @
        <KunLink :to="`/user/${kun.uid}/info`">
          {{ kun.name }}
        </KunLink>
      </div>

      <div
        v-html="kun.description['zh-cn']"
        class="text-default-700 leading-relaxed"
      />

      <div class="text-default-500 flex items-center justify-between text-sm">
        <div class="text-default-500 flex items-center gap-1">
          <KunIcon name="lucide:clock-7" />
          <span>{{ formatDate(kun.time, { isShowYear: true }) }}</span>
        </div>
        <div class="flex items-center gap-1">
          <KunIcon name="lucide:triangle-alert" class="text-warning h-4 w-4" />
          <span v-if="typeof kun.result === 'number'">
            {{ `萌萌点 - ${kun.result}` }}
          </span>
          <span v-else>{{ kun.result }}</span>
        </div>
      </div>
    </KunCard>
  </div>
</template>
