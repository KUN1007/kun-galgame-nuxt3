<script setup lang="ts">
import { galgameSection } from '~/components/edit/utils/category'
</script>

<template>
  <div class="root">
    <div class="category">
      <div class="category-title">
        <span>Galgame</span>
      </div>

      <section
        class="section"
        v-for="(section, index) in galgameSection"
        :key="index"
      >
        <div class="section-title">
          <span>
            {{ $t(`edit.section.${section}`) }}
          </span>
        </div>

        <NuxtLinkLocale to="/section" class="section-content">
          <div class="topic">
            <span>New Topic: Ren sukisukisukisukisukisukisukisuki</span>
            <p>Published by Ren - 1 min ago</p>
          </div>

          <div class="statistic">
            <div class="count">
              <span>Topic Count</span>
              <span>{{ formatNumberWithCommas(1007) }}</span>
            </div>

            <div class="views">
              <span>Views Count</span>
              <span>{{ formatNumberWithCommas(100708) }}</span>
            </div>
          </div>
        </NuxtLinkLocale>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}

.category {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  padding: 17px;
}

.category-title {
  display: flex;
  justify-content: flex-end;
  padding: 0 17px;

  span {
    font-size: 25px;
  }
}

.section {
  margin-bottom: 20px;

  .section-title {
    transition: transform 0.2s ease;
  }

  &:hover {
    .section-title {
      transform: translateX(20px) translateY(7px);
    }
    .section-content {
      &::before {
        width: 100%;
        z-index: -1;
        transition: width 0.2s;
        background-color: var(--kungalgame-trans-blue-1);
      }
    }
  }
}

.section-title {
  padding: 5px;
  border-bottom: none;
  filter: drop-shadow(2px 4px 3px var(--kungalgame-trans-blue-4));

  span {
    padding: 2px 27px;
    text-align: center;
    background-color: var(--kungalgame-trans-white-2);
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0 50%);
  }
}

.section-content {
  padding: 17px;
  display: flex;
  justify-content: space-between;
  position: relative;
  color: var(--kungalgame-font-color-3);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 5px;
    height: 100%;
    background-color: var(--kungalgame-blue-5);
  }
}

.statistic {
  display: flex;
  user-select: none;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    span {
      &:first-child {
        color: var(--kungalgame-font-color-0);
        font-size: small;
      }
    }
  }
}
</style>
