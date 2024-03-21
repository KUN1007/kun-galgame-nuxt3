<script setup lang="ts">
import { topicCategory } from '~/components/edit/utils/category'
</script>

<template>
  <div class="topic-menu">
    <span class="title">
      <span>{{ $t('header.all') }}</span>
      <span>{{ $t('header.category') }}</span>
    </span>

    <div class="classify">
      <div
        class="category"
        v-for="(category, index) in topicCategory"
        :key="index"
      >
        <span class="category-title">{{ $t(`edit.${category.name}`) }}</span>

        <ul>
          <li v-for="(section, i) in category.options" :key="i">
            {{ $t(`edit.section.${section}`) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-menu {
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  padding: 10px;
  white-space: nowrap;
}

.title {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.classify {
  display: flex;

  .category {
    .category-title {
      user-select: none;
    }

    ul {
      li {
        display: flex;
        padding: 10px 17px;
        list-style: none;
        border-bottom: 2px solid transparent;
        position: relative;
        cursor: pointer;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--kungalgame-blue-5);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        &:hover::before {
          transform: scaleY(1);
        }
      }
    }
  }
}
</style>
