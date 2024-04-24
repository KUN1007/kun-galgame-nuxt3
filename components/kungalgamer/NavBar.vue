<script setup lang="ts">
import type { Nav } from './utils/routeName'

const { uid: storeUid, roles } = storeToRefs(usePersistUserStore())

const props = defineProps<{
  uid: number
  nav: Nav[]
}>()

const localePath = useLocalePath()
const currentPageUid = computed(() => props.uid)

const iconMap: Record<string, string> = {
  profile: 'lucide:user-round',
  settings: 'lucide:settings',
  email: 'lucide:mail',
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
  return useRouteFullPath().value ===
    `/kungalgamer/${currentPageUid}/${route.router}`
    ? 'active'
    : ''
}

const handleCollapsed = (item: Nav) => {
  if (item.collapsed !== undefined) {
    item.collapsed = !item.collapsed
  } else {
    navigateTo(
      localePath(
        `/kungalgamer/${currentPageUid.value}/${item.router}`.toString()
      )
    )
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
          <Icon :name="iconMap[kun.name] ?? ''" />
        </span>
        <span class="name">{{ $t(`user.nav.${kun.name}`) }}</span>
        <span
          class="chevron"
          v-if="kun.collapsed !== undefined"
          :class="kun.collapsed ? '' : 'active-chevron'"
        >
          <Icon name="lucide:chevron-right" />
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
  border-radius: 0 0 0 7px;
  border-right: 1px solid var(--kungalgame-blue-5);
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

  &:hover {
    background-color: var(--kungalgame-trans-blue-2);
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
    border-right: none;
  }

  .link {
    padding: 10px 7px;
    border-radius: 10px;

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
