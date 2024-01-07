<script setup lang="ts">
interface asideBar {
  index: number
  name: string
  router: string
  label: string
}

const asideBarItem: asideBar[] = [
  {
    index: 1,
    name: 'privacy',
    router: '/privacy',
    label: 'KUN Visual Novel Privacy | 鲲 Galgame 隐私政策',
  },
  {
    index: 2,
    name: 'bylaw',
    router: '/bylaw',
    label: 'KUN Visual Novel Bylaw | 鲲 Galgame 执行条例',
  },
  {
    index: 3,
    name: 'update',
    router: '/update-log',
    label: 'KUN Visual Novel Update Log | 鲲 Galgame 更新日志',
  },
  {
    index: 4,
    name: 'pl',
    router: '/balance',
    label: 'KUN Visual Novel Balance | 鲲 Galgame 收支公示',
  },
  {
    index: 5,
    name: 'nonMoe',
    router: '/non-moe',
    label: 'KUN Visual Novel Non-Moe | 鲲 Galgame 不萌记录',
  },
  {
    index: 6,
    name: 'join',
    router: '/contact',
    label: 'KUN Visual Novel Contact | 鲲 Galgame 加入我们',
  },
  {
    index: 7,
    name: 'thanks',
    router: '/thanks-list',
    label: 'KUN Visual Novel Thanks-List | 鲲 Galgame 感谢名单',
  },
  {
    index: 8,
    name: 'donate',
    router: '/donate',
    label: 'KUN Visual Novel Donate | 鲲 Galgame 赞助我们',
  },
  {
    index: 9,
    name: 'home',
    router: '/',
    label: 'KUN Visual Novel Home | 鲲 Galgame 返回主页',
  },
]
</script>

<template>
  <div class="aside">
    <span>{{ $t('kungalgame.introduction') }}</span>
    <span>{{ $t('kungalgame.operating') }}</span>
    <span>{{ $t('kungalgame.rules') }}</span>
    <span class="skip" v-for="kun in asideBarItem" :key="kun.index">
      <NuxtLink
        style="color: var(--kungalgame-blue-4)"
        :to="{ path: kun.router }"
        :aria-label="kun.label"
      >
        {{ $t(`kungalgame.${kun.name}`) }}
      </NuxtLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  width: 122px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid var(--kungalgame-blue-4);
  position: sticky;
  top: 0;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(3) {
      border-bottom: 1.5px solid var(--kungalgame-blue-4);
    }
  }
}

.skip {
  border-bottom: 1.5px solid var(--kungalgame-blue-4);
  cursor: pointer;
  color: var(--kungalgame-blue-4);

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--kungalgame-trans-blue-2);
    }
  }
}

@media (max-width: 700px) {
  .aside {
    width: 90px;
    font-size: small;
  }
}
</style>
