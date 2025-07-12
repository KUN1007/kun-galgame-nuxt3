<script setup lang="ts">
import type { UnmoeLog } from '~/types/api/unmoe'

const props = defineProps<{
  logs: UnmoeLog[]
}>()

const logs = computed(() => props.logs)
</script>

<template>
  <div class="space-y-4">
    <KunCard :is-hoverable="false" v-for="(kun, index) in logs" :key="index">
      <div>
        违规用户名:
        {{ kun.name }}
      </div>

      <div
        v-html="kun.description['zh-cn']"
        class="text-default-700 leading-relaxed"
      />

      <div class="text-default-500 flex items-center justify-between text-sm">
        <div class="text-default-500 flex items-center gap-1">
          <KunIcon name="lucide:clock-7" />
          <span>{{ formatDate(kun.created, { isShowYear: true }) }}</span>
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
