<script setup lang="ts">
import { kunLayoutItem } from '~/constants/layout'

const route = useRoute()

const expandedItems = ref<string[]>(
  kunLayoutItem
    .filter((item) => item.children && !item.isCollapse)
    .map((item) => item.name)
)

const toggleExpand = (itemName: string) => {
  const index = expandedItems.value.indexOf(itemName)
  if (index === -1) {
    expandedItems.value.push(itemName)
  } else {
    expandedItems.value.splice(index, 1)
  }
}

const isExpanded = (itemName: string) => expandedItems.value.includes(itemName)
</script>

<template>
  <div class="mt-3 flex flex-col justify-center gap-1 border-y px-3 py-6">
    <template v-for="(item, index) in kunLayoutItem" :key="index">
      <div v-if="item.children" class="flex flex-col">
        <KunButton variant="light" @click="toggleExpand(item.name)">
          <span class="mr-3 flex items-center justify-center text-xl">
            <Icon :name="item.icon || ''" />
          </span>
          <span>{{ item.label }}</span>
          <Icon
            :name="
              isExpanded(item.name)
                ? 'lucide:chevron-down'
                : 'lucide:chevron-right'
            "
            class="ml-auto"
          />
        </KunButton>

        <div
          v-show="isExpanded(item.name)"
          class="ml-8 flex flex-col gap-1 transition-all"
        >
          <KunButton
            v-for="child in item.children"
            :key="child.name"
            :href="child.router"
            :variant="route.fullPath === item.router ? 'solid' : 'light'"
            :class-name="
              cn(
                'justify-start',
                route.fullPath === item.router ? '' : 'text-foreground'
              )
            "
          >
            <span>{{ child.label }}</span>
            <span v-if="child.hint" class="text-primary ml-auto text-xs">
              {{ child.hint }}
            </span>
          </KunButton>
        </div>
      </div>

      <KunButton
        v-else
        class-name="justify-start"
        :variant="route.fullPath === item.router ? 'solid' : 'light'"
        :href="item.router"
      >
        <span
          :class="
            cn(
              'mr-3 flex items-center justify-center gap-2 text-xl',
              route.fullPath === item.router ? '' : 'text-foreground'
            )
          "
        >
          <Icon :name="item.icon || ''" />
          <span class="text-base">{{ item.label }}</span>
        </span>

        <span v-if="item.hint" class="text-primary ml-auto text-xs">
          {{ item.hint }}
        </span>
      </KunButton>
    </template>
  </div>
</template>
