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
  </span>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  margin-right: 5px;

  .icon {
    font-size: 17px;
  }

  span {
    margin-left: 5px;
  }
}

.g {
  color: var(--kungalgame-blue-5);
}

.t {
  color: var(--kungalgame-green-4);
}

.o {
  color: var(--kungalgame-pink-4);
}
</style>
