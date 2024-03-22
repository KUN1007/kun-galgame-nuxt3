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
  padding: 3px 10px;
  border-radius: 7px;
  margin-right: 5px;
  font-size: small;
  font-weight: bold;

  .icon {
    font-size: 17px;
    margin-right: 5px;
  }
}

.g {
  color: var(--kungalgame-blue-5);
  border: 1.5px solid var(--kungalgame-blue-5);
}

.t {
  color: var(--kungalgame-green-4);
  border: 1.5px solid var(--kungalgame-green-4);
}

.o {
  color: var(--kungalgame-pink-4);
  border: 1.5px solid var(--kungalgame-pink-4);
}
</style>
