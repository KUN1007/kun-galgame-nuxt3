<script setup lang="ts">
import { KUN_USER_PAGE_NAV_MAP } from '~/constants/user'
import type { Nav } from '../utils/routeName'

const { uid: storeUid, roles } = storeToRefs(usePersistUserStore())

const props = defineProps<{
  uid: number
  nav: Nav[]
}>()

const route = useRoute()

const currentPageUid = computed(() => props.uid)
const fullPath = computed(() =>
  route.fullPath.replace(/^\/[a-z]{2}-[a-z]{2}\//, '/')
)

const iconMap: Record<string, string> = {
  profile: 'lucide:user-round',
  setting: 'lucide:settings',
  email: 'lucide:mail',
  password: 'lucide:key-round',
  topic: 'lucide:square-gantt-chart',
  galgame: 'lucide:gamepad-2',
  resource: 'lucide:package',
  reply: 'carbon:reply',
  comment: 'uil:comment-dots'
}

const currentPageUserRoles = computed(() => {
  if (!storeUid.value) {
    return 1
  }

  if (props.uid === storeUid.value) {
    return 4
  } else {
    return roles.value
  }
})

const handleCollapsed = async (item: Nav) => {
  if (item.collapsed !== undefined) {
    item.collapsed = !item.collapsed
  } else {
    await navigateTo(
      `/user/${currentPageUid.value}/${item.redirect ? item.redirect : item.router}`
    )
  }
}
</script>

<template>
  <div
    class="scrollbar-hide h-full w-9 shrink-0 space-y-1 overflow-y-auto sm:w-40"
  >
    <div
      v-for="(kun, index) in nav"
      :key="index"
      v-show="kun.permission?.includes(currentPageUserRoles)"
    >
      <KunButton
        :full-width="true"
        :variant="fullPath.includes(kun.router) ? 'flat' : 'light'"
        size="lg"
        class-name="gap-2 justify-start text-foreground sm:px-5 sm:py-2.5 p-2"
        @click="handleCollapsed(kun)"
      >
        <KunIcon
          class="shrink-0 text-xl text-inherit sm:text-base"
          v-if="iconMap[kun.name]"
          :name="iconMap[kun.name]"
        />
        <span class="hidden text-inherit sm:block">
          {{ KUN_USER_PAGE_NAV_MAP[kun.name] }}
        </span>
      </KunButton>
    </div>
  </div>
</template>
