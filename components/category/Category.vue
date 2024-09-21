<script setup lang="ts">
type Category = 'galgame' | 'technique' | 'others'
const availableCategory: Category[] = ['galgame', 'technique', 'others']
const { category } = storeToRefs(usePersistCategoryStore())

const { data, pending } = await useLazyFetch(`/api/category`, {
  method: 'GET',
  query: { category },
  ...kungalgameResponseHandler
})
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

    <CategorySection v-if="data && !pending" :sections="data" />
    <KunSkeletonCategory v-if="pending" />

    <p class="hint">{{ $t('category.update') }}</p>
    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.category {
  width: 100%;
  height: 100%;
  padding: 17px;

  @include kun-blur;
}

.title {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 0 17px;

  span {
    font-size: 20px;
    cursor: pointer;
    flex-wrap: nowrap;

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

.hint {
  display: flex;
  justify-content: flex-end;
  font-size: small;
  font-style: oblique;
  color: var(--kungalgame-font-color-0);
  margin: 10px 0;
}

@media (max-width: 700px) {
  .category {
    padding: 10px;
  }

  .title {
    margin-bottom: 10px;
    padding: 0 10px;

    span {
      font-size: 17px;
    }
  }
}
</style>
