<script setup lang="ts">
type Category = 'galgame' | 'technique' | 'others'
const availableCategory: Category[] = ['galgame', 'technique', 'others']

const { category } = storeToRefs(useKUNGalgameCategoryStore())
</script>

<template>
  <div class="category">
    <div class="title">
      <span
        v-for="(cat, index) in availableCategory"
        :key="index"
        @click="category = cat"
        :class="category === cat ? 'active' : ''"
      >
        {{ $t(`category.${cat}`) }}
      </span>
    </div>

    <CategorySection :section="category" />
  </div>
</template>

<style lang="scss" scoped>
.category {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  padding: 17px;
}

.title {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 17px;

  span {
    font-size: 20px;
    cursor: pointer;

    &:nth-child(2) {
      &::before {
        content: '/';
        font-size: 20px;
        color: var(--kungalgame-font-color-0);
        margin: 0 10px;
      }

      &::after {
        content: '/';
        font-size: 20px;
        color: var(--kungalgame-font-color-0);
        margin: 0 10px;
      }
    }
  }

  .active {
    color: var(--kungalgame-blue-5);
    font-size: 25px;
    transition: all 0.2s;
  }
}
</style>
