<script setup lang="ts">
import { KUN_USER_PAGE_NAV_MAP } from '~/constants/user'
import type { Nav } from './utils/routeName'

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
  settings: 'lucide:settings',
  email: 'lucide:mail',
  password: 'lucide:key-round',
  topic: 'lucide:square-gantt-chart',
  galgame: 'lucide:gamepad-2',
  reply: 'lucide:reply',
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

const activeClass = (currentPageUid: number, route: Nav) => {
  return fullPath.value === `/kungalgamer/${currentPageUid}/${route.router}`
    ? 'active'
    : ''
}

const handleCollapsed = (item: Nav) => {
  if (item.collapsed !== undefined) {
    item.collapsed = !item.collapsed
  } else {
    navigateTo(`/kungalgamer/${currentPageUid.value}/${item.router}`.toString())
  }
}
</script>

<template>
  <div class="nav">
    <div
      v-for="(kun, index) in nav"
      :key="index"
      v-show="kun.permission?.includes(currentPageUserRoles)"
    >
      <div
        class="link"
        :class="activeClass(currentPageUid, kun)"
        @click="handleCollapsed(kun)"
      >
        <span class="nav-icon">
          <Icon class="icon" :name="iconMap[kun.name] ?? ''" />
        </span>
        <span class="name">{{ KUN_USER_PAGE_NAV_MAP[kun.name] }}</span>
        <span
          class="chevron"
          v-if="kun.collapsed !== undefined"
          :class="kun.collapsed ? '' : 'active-chevron'"
        >
          <Icon class="icon" name="lucide:chevron-right" />
        </span>
      </div>

      <div v-if="kun.child && !kun.collapsed" class="submenu">
        <KungalgamerNavBar :uid="uid" :nav="kun.child" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 130px;
  flex-shrink: 0;
  overflow: scroll;
  scrollbar-width: none;
}

.link {
  padding: 10px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--kungalgame-blue-5);
  border-radius: 10px;

  &:hover {
    background-color: var(--kungalgame-trans-blue-1);
  }

  & > span {
    display: flex;
    margin-left: 7px;

    &:first-child {
      font-size: 20px;
    }

    &:nth-child(2) {
      font-size: small;
    }

    &:last-child {
      transition: all 0.2s;
    }
  }

  .active-chevron {
    transform: rotate(90deg);
  }
}

.submenu {
  background-color: var(--kungalgame-trans-blue-0);
}

.active {
  color: var(--kungalgame-white);
  background-color: var(--kungalgame-blue-5);

  &:hover {
    background-color: var(--kungalgame-blue-5);
  }
}

@media (max-width: 700px) {
  .nav {
    width: 70px;
    font-size: small;
  }

  .link {
    padding: 10px 7px;

    .name {
      display: none;
    }
  }

  .submenu {
    border-radius: 10px;

    .link {
      padding: 10px 0;

      .nav-icon {
        display: none;
      }

      .name {
        display: block;
      }
    }
  }
}
</style>
