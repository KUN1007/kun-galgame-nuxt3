<script setup lang="ts">
import type { Title } from '../utils/VNDB'

defineProps<{
  titles: Title[]
}>()
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>标题</template>

    <template #help>
      标题要求至少写一种, 非常建议全部填写 (如果游戏没有对应翻译可以不填写,
      英语标题可以从 VNDB 自动获取到)
    </template>
  </KunHeader>

  <div class="reference" v-if="titles.length">
    <b>参考标题（点击复制）</b>
    <span
      v-for="(title, index) in titles"
      :key="index"
      @click="useKunCopy(title.title)"
    >
      {{ title.title }}
    </span>
  </div>

  <div class="titles">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.reference {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;

  b {
    margin-right: 7px;
  }

  span {
    cursor: pointer;
    padding: 0 10px;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
    border-radius: 17px;
    margin-right: 7px;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }
  }
}

.vndb {
  display: flex;
  margin-bottom: 17px;

  input {
    margin-right: 17px;
  }
}

.titles {
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;

  input {
    margin-bottom: 7px;
  }
}
</style>
