<script setup lang="ts"></script>

<template>
  <div class="contacts">
    <a
      aria-label="KUN Visual Novel Official Telegram Group"
      href="https://t.me/kungalgame"
      target="_blank"
    >
      <Icon name="line-md:telegram" />
    </a>

    <a
      aria-label="KUN Visual Novel Official Twitter (X) Account | 鲲 Galgame 论坛官方推特账号"
      href="https://twitter.com/kungalgame"
      target="_blank"
    >
      <Icon name="line-md:twitter-x-alt" />
    </a>

    <a
      aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
      href="https://github.com/KUN1007/kun-galgame-vue"
      target="_blank"
    >
      <Icon name="line-md:github-loop" />
    </a>

    <a
      aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛官方 Discord 群组"
      href="https://discord.com/invite/5F4FS2cXhX"
      target="_blank"
    >
      <Icon name="line-md:discord" />
    </a>

    <a
      aria-label="KUN Visual Novel Official Youtube Channel | 鲲 Galgame 官方 Youtube 频道"
      href="https://youtube.com/@kungalgame"
      target="_blank"
    >
      <Icon name="line-md:youtube" />
    </a>

    <a
      aria-label="KUN Visual Novel Official Bilibili Account | 鲲 Galgame 官方 Bilibili"
      href="https://space.bilibili.com/1748455574"
      target="_blank"
    >
      <Icon name="ri:bilibili-line" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;

  a {
    font-size: 17px;
    color: var(--kungalgame-font-color-2);
  }
}
</style>
