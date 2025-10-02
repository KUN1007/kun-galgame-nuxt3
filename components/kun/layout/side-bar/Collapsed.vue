<script setup lang="ts">
import type { KunLayoutCollapsedItem } from '~/constants/layout'

const route = useRoute()

const collapsedItems: Record<string, KunLayoutCollapsedItem[]>[] = [
  {
    galgame: [
      {
        name: 'galgame',
        icon: 'lucide:box',
        router: '/galgame',
        label: 'Galgame'
      },
      {
        name: 'galgame-rating',
        icon: 'lucide:lollipop',
        router: '/galgame-rating',
        label: 'Galgame 评分'
      },
      {
        name: 'galgame-series',
        icon: 'lucide:boxes',
        router: '/galgame-series',
        label: 'Galgame 系列'
      },
      {
        name: 'website',
        icon: 'lucide:globe',
        router: '/website',
        label: 'Gal 网站 Wiki'
      },
      {
        name: 'toolset',
        icon: 'lucide:wrench',
        router: '/toolset',
        label: 'Gal 工具资源'
      },
      {
        name: 'galgame-resource',
        icon: 'lucide:download',
        router: '/galgame-resource',
        label: 'Gal 资源列表'
      }
    ],
    topic: [
      {
        name: 'topic',
        icon: 'lucide:library-big',
        router: '/topic',
        label: '全部话题'
      },
      {
        name: 'galgame',
        icon: 'lucide:gamepad-2',
        router: '/category/galgame',
        label: 'Galgame 类'
      }
    ]
  }
]
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex w-full flex-col gap-4">
      <template v-for="(group, groupIndex) in collapsedItems" :key="groupIndex">
        <div
          class="flex justify-center"
          v-for="(items, groupName) in group"
          :key="groupName"
        >
          <div
            class="bg-default-500/10 flex flex-col items-center gap-2 rounded-lg"
          >
            <KunTooltip
              v-for="item in items"
              :key="item.name"
              :text="item.label"
              position="right"
            >
              <KunButton
                is-icon-only
                variant="light"
                size="lg"
                :href="item.router"
                :aria-label="item.label"
                color="default"
                :class="
                  cn(
                    'flex items-center justify-center',
                    route.fullPath === item.router
                      ? 'bg-accent text-primary'
                      : 'text-foreground'
                  )
                "
              >
                <KunIcon :name="item.icon" class="text-lg" />
              </KunButton>
            </KunTooltip>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
