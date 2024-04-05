<script setup lang="ts">
import type { Title } from './VNDB'

defineProps<{
  titles: Title[]
}>()

const handleClickCopy = (title: string) => {
  navigator.clipboard
    .writeText(title)
    .then(() => {
      useMessage(
        `Title ${title} copied successfully!`,
        `标题 ${title} 复制成功`,
        'success'
      )
    })
    .catch(() => {
      useMessage(
        'Title copy failed! Please switch to a more modern browser!',
        '标题复制失败! 请更换更现代的浏览器!',
        'error'
      )
    })
}
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>{{ $t('edit.galgame.title.name') }}</template>

    <template #help>{{ $t('edit.galgame.title.help') }}</template>
  </KunHeader>

  <div class="reference" v-if="titles.length">
    <b>{{ $t('edit.galgame.title.reference') }}</b>
    <span
      v-for="(title, index) in titles"
      :key="index"
      @click="handleClickCopy(title.title)"
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
