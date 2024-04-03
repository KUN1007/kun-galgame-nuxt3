<script setup lang="ts">
import { platformItems } from './items'

const { platform } = storeToRefs(usePersistGalgameStore())

const handleSelectPlatform = (pl: string) => {
  if (platform.value.includes(pl)) {
    platform.value = platform.value.filter((item) => item !== pl)
  } else {
    platform.value = [...new Set([...platform.value, pl])]
  }
}
</script>

<template>
  <h2>请选择 Galgame 的平台</h2>
  <div class="platform">
    <span
      :class="platform.includes(kun.value) ? 'active' : ''"
      v-for="(kun, index) in platformItems"
      :key="index"
      @click="handleSelectPlatform(kun.value)"
    >
      {{ $t(`edit.galgame.platform.${kun.value}`) }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.platform {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 17px;

  span {
    cursor: pointer;
    padding: 3px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 2px solid transparent;
    border-radius: 10px;
  }

  .active {
    border: 2px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
  }
}
</style>
