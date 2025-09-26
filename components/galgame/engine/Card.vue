<script setup lang="ts">
import type { GalgameEngineItem } from '~/types/api/galgame-engine'

defineProps<{
  engine: GalgameEngineItem
}>()
</script>

<template>
  <KunCard
    :is-transparent="true"
    :is-hoverable="true"
    :is-pressable="true"
    :dark-border="true"
    :to="`/galgame-engine/${engine.id}`"
  >
    <h3 class="text-default-900 font-semibold">
      {{ engine.name }}
      <KunBadge size="xs">
        {{ `+ ${engine.galgameCount}` }}
      </KunBadge>
    </h3>
    <div
      v-if="engine.alias.length"
      class="text-default-500 flex flex-wrap gap-2"
    >
      <KunBadge
        size="xs"
        color="success"
        v-for="(a, index) in engine.alias"
        :key="index"
      >
        {{ a }}
      </KunBadge>
    </div>
  </KunCard>
</template>
