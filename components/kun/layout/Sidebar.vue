<script setup lang="ts">
import { kunLayoutItem } from '~/constants/layout'
</script>

<template>
  <div
    class="scrollbar-hide bg-default-100 fixed flex h-full w-3xs shrink-0 flex-col justify-between overflow-y-scroll p-3"
    @click.stop
  >
    <div>
      <div class="kungalgame" @click="navigateTo('/')">
        <NuxtImg src="/favicon.webp" :alt="kungal.titleShort" />
        <span>{{ kungal.titleShort }}</span>
      </div>

      <div class="mt-6 flex flex-col justify-center gap-6 border-y py-6">
        <div
          v-for="(kun, index) in kunLayoutItem"
          :key="index"
          class="flex items-center"
        >
          <span class="mr-3 flex items-center justify-center text-xl">
            <Icon class="icon" :name="kun.icon" />
          </span>
          <NuxtLink
            :to="kun.router"
            :target="isValidURL(kun.router) ? '_blank' : ''"
          >
            {{ kun.label }}
          </NuxtLink>
          <span class="text-secondary-500 ml-4 text-xs" v-if="kun.hint">
            {{ kun.hint }}
          </span>
        </div>
      </div>
    </div>

    <div class="links">
      <a
        aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
        :href="kungal.github"
        target="_blank"
      >
        <span><Icon class="icon" name="lucide:github" /></span>
        <span>GitHub</span>
      </a>

      <NuxtLink to="/rss">
        <span><Icon class="icon" name="lucide:rss" /></span>
        <span>RSS</span>
      </NuxtLink>

      <a
        aria-label="KUN Visual Novel Official Telegram Group"
        :href="kungal.domain.telegram_group"
        target="_blank"
      >
        <span><Icon class="icon" name="ph:telegram-logo" /></span>
        <span>Telegram</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.links {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  margin: 17px 0;

  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);

    & > span {
      &:first-child {
        cursor: pointer;
      }

      &:last-child {
        font-size: x-small;
      }
    }
  }
}

.active {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.kungalgame {
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  span {
    font-size: 20px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-leave-active {
  transition-delay: 0.25s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .container,
.slide-leave-active .container {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from .container,
.slide-leave-to .container {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
