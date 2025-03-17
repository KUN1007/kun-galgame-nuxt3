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

const handleCollapsed = (item: Nav) => {
  if (item.collapsed !== undefined) {
    item.collapsed = !item.collapsed
  } else {
    navigateTo(`/user/${currentPageUid.value}/${item.router}`.toString())
  }
}
</script>

<template>
  <div class="scrollbar-hide h-full w-10 shrink-0 overflow-y-auto sm:w-40">
    <div
      v-for="(kun, index) in nav"
      :key="index"
      v-show="kun.permission?.includes(currentPageUserRoles)"
    >
      <KunButton
        :full-width="true"
        :variant="
          fullPath === `/user/${currentPageUid}/${kun.router}`
            ? 'flat'
            : 'light'
        "
        size="lg"
        :class-name="cn('gap-2 justify-start', kun.collapsed ? 'mb-2' : 'mb-1')"
        @click="handleCollapsed(kun)"
      >
        <Icon
          :class="
            fullPath === `/user/${currentPageUid}/${kun.router}`
              ? ''
              : 'text-foreground'
          "
          v-if="iconMap[kun.name]"
          :name="iconMap[kun.name]"
        />
        <span
          :class="
            cn(
              'hidden sm:block',
              fullPath === `/user/${currentPageUid}/${kun.router}`
                ? ''
                : 'text-foreground'
            )
          "
        >
          {{ KUN_USER_PAGE_NAV_MAP[kun.name] }}
        </span>
        <Icon
          v-if="kun.collapsed !== undefined"
          :name="
            !kun.collapsed ? 'lucide:chevron-down' : 'lucide:chevron-right'
          "
        />
      </KunButton>

      <div v-if="kun.child && !kun.collapsed" class="bg-default-100 rounded-lg">
        <UserNavItem :uid="uid" :nav="kun.child" />
      </div>
    </div>
  </div>
</template>
