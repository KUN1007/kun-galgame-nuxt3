<script setup lang="ts">
import { useTopicTOC } from '~/composables/topic/useTopicTOC'
import { scrollToTOCElement } from '../_helper'

const { headings, activeId, refreshTOC } = useTopicTOC()

defineExpose({ refreshTOC })
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    class-name="h-full max-w-49"
    content-class="justify-start"
  >
    <h2 class="mb-4 text-lg font-semibold">目录导航</h2>

    <div class="scrollbar-hide max-h-[calc(100dvh-10rem)] overflow-y-scroll">
      <template v-for="type in ['heading', 'reply']" :key="type">
        <template v-if="headings.some((h) => h.type === type)">
          <h3 class="mb-2 text-sm font-medium">
            {{ type === 'heading' ? '文章目录' : '回复列表' }}
          </h3>
          <ul class="mb-4 space-y-2">
            <li
              v-for="item in headings.filter((h) => h.type === type)"
              :key="item.id"
              :style="{ paddingLeft: `${(item.level - 1) * 1}rem` }"
            >
              <a
                :href="`#${item.id}`"
                @click.prevent="scrollToTOCElement(item.id)"
                :class="
                  cn(
                    'hover:text-primary-500 block py-1 text-sm',
                    activeId === item.id
                      ? 'text-primary-500 font-medium'
                      : 'text-default-500'
                  )
                "
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </template>
      </template>
    </div>
  </KunCard>
</template>
