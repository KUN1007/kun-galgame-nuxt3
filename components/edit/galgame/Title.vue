<script setup lang="ts">
import type { Title } from './VNDB'

defineProps<{
  titles: Title[]
}>()
</script>

<template>
  <h2>请输入资源标题</h2>
  <div class="reference" v-if="titles.length">
    <b>参考标题（点击复制）</b>
    <span v-for="(title, index) in titles" :key="index">
      {{ title.title }}
    </span>
  </div>

  <div class="titles">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

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

  input {
    margin-bottom: 7px;
  }
}
</style>
