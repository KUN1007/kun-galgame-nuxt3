<script setup lang="ts">
interface Info {
  index: number
  name: string
}

const info: Info[] = [
  {
    index: 1,
    name: 'kun1',
  },
  {
    index: 2,
    name: 'kun2',
  },
  {
    index: 3,
    name: 'kun3',
  },
  {
    index: 4,
    name: 'kun4',
  },
]
</script>

<template>
  <div class="introduction">
    <div class="kungalgame">
      <span>{{ $t('mainPage.footer.describe.title') }}</span>
    </div>

    <div class="kungalgame-describe">
      <span v-for="kun in info" :key="kun.index">
        {{ $t(`mainPage.footer.describe['${kun.name}']`) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.introduction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: var(--kungalgame-font-color-2);
}

.kungalgame {
  font-size: larger;
  padding-bottom: 20px;
  font-weight: bold;
}

.kungalgame-describe {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
