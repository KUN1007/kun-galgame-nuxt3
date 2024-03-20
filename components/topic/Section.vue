<script setup lang="ts">
const props = defineProps<{
  section: string[]
}>()

const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}
</script>

<template>
  <span
    class="section"
    v-for="(sec, index) in props.section"
    :key="index"
    :class="sec.toLowerCase()[0]"
  >
    <Icon class="icon" :name="iconMap[sec[0]]" />
    <span>{{ $t(`edit.section.${sec}`) }}</span>
  </span>
</template>

<style lang="scss" scoped>
.section {
  margin: 3px;
  display: flex;
  align-items: center;
  color: var(--kungalgame-white);
  padding: 3px 10px;
  border-radius: 7px;
  margin-right: 5px;

  .icon {
    font-size: 17px;
    margin-right: 5px;
  }
}

.g {
  background-color: var(--kungalgame-blue-5);
}

.t {
  background-color: var(--kungalgame-green-4);
}

.o {
  background-color: var(--kungalgame-yellow-3);
}
</style>
