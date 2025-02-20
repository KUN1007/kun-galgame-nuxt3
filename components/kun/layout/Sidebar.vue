<script setup lang="ts">
import { kunLayoutItem } from '~/constants/layout'

const route = useRoute()
</script>

<template>
  <div
    class="scrollbar-hide bg-default-100 fixed flex h-full w-3xs shrink-0 flex-col justify-between overflow-y-scroll"
    @click.stop
  >
    <div>
      <div
        class="flex cursor-pointer items-center gap-3 p-3"
        @click="navigateTo('/')"
      >
        <NuxtImg class="size-10" src="/favicon.webp" :alt="kungal.titleShort" />
        <span class="text-xl">{{ kungal.name }}</span>
        <span
          class="bg-primary-100 text-primary rounded-full px-3 py-1 text-sm"
        >
          论坛
        </span>
      </div>

      <div class="mt-3 flex flex-col justify-center gap-3 border-y py-6">
        <NuxtLink
          v-for="(item, index) in kunLayoutItem"
          :to="item.router"
          :target="isValidURL(item.router) ? '_blank' : ''"
          :key="index"
          :class="
            cn(
              'flex items-center px-3 py-1',
              route.fullPath === item.router
                ? 'bg-primary-100 text-primary rounded-r-full'
                : ''
            )
          "
        >
          <span
            class="mr-3 flex items-center justify-center text-xl text-inherit"
          >
            <Icon class="icon text-inherit" :name="item.icon" />
          </span>
          <span class="text-inherit">
            {{ item.label }}
          </span>
          <span class="text-secondary ml-4 text-xs" v-if="item.hint">
            {{ item.hint }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <div class="my-4 flex w-full justify-around">
      <a
        class="flex flex-col items-center justify-center"
        aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
        :href="kungal.github"
        target="_blank"
      >
        <span><Icon class="icon" name="lucide:github" /></span>
        <span class="text-xs">GitHub</span>
      </a>

      <NuxtLink class="flex flex-col items-center justify-center" to="/rss">
        <span><Icon class="icon" name="lucide:rss" /></span>
        <span class="text-xs">RSS</span>
      </NuxtLink>

      <a
        class="flex flex-col items-center justify-center"
        aria-label="KUN Visual Novel Official Telegram Group"
        :href="kungal.domain.telegram_group"
        target="_blank"
      >
        <span><Icon class="icon" name="ph:telegram-logo" /></span>
        <span class="text-xs">Telegram</span>
      </a>
    </div>
  </div>
</template>
