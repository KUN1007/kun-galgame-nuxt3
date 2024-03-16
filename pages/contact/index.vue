<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.contact.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.contact.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">
        <div class="contact-us">{{ $t('contact.title') }}</div>
        <div class="kungalgame">KUNGalgame</div>
      </div>

      <div class="content">
        <a
          aria-label="KUN Visual Novel Official Telegram Group"
          href="https://t.me/kungalgame"
          target="_blank"
        >
          <Icon name="ph:telegram-logo" />
        </a>

        <a
          aria-label="KUN Visual Novel Official Twitter (X) Account | 鲲 Galgame 论坛官方推特账号"
          href="https://twitter.com/kungalgame"
          target="_blank"
        >
          <Icon name="ri:twitter-x-line" />
        </a>

        <a
          aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
          href="https://github.com/KUN1007/kun-galgame-nuxt3"
          target="_blank"
        >
          <Icon name="lucide:github" />
        </a>

        <a
          aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛官方 Discord 群组"
          href="https://discord.com/invite/5F4FS2cXhX"
          target="_blank"
        >
          <Icon name="mingcute:discord-line" />
        </a>

        <a
          aria-label="KUN Visual Novel Official Youtube Channel | 鲲 Galgame 官方 Youtube 频道"
          href="https://youtube.com/@kungalgame"
          target="_blank"
        >
          <Icon name="lucide:youtube" />
        </a>

        <a
          aria-label="KUN Visual Novel Official Bilibili Account | 鲲 Galgame 官方 Bilibili"
          href="https://space.bilibili.com/1748455574"
          target="_blank"
        >
          <Icon class="icon" name="ri:bilibili-line" />
        </a>
      </div>

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>

    <KunFooter
      style="position: absolute; bottom: 20px; width: 100%; margin: 0 auto"
    />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  width: 100vw;
  min-height: 300px;
  display: flex;
}

.container {
  position: relative;
  width: 400px;
  height: 300px;
  margin: auto;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  box-shadow: var(--kungalgame-shadow-0);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
}

.title {
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.contact-us {
  position: relative;
  font-size: 30px;
  z-index: 1;
}

.kungalgame {
  position: absolute;
  bottom: 15%;
  color: var(--kungalgame-trans-white-5);
  text-shadow: 2px 2px 3px var(--kungalgame-trans-blue-1);
  font-size: 60px;
  font-style: italic;
  font-family: serif;
  cursor: pointer;

  &:hover {
    color: var(--kungalgame-blue-5);
    transition: 0.2s;
  }
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 20px;

  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-font-color-3);
  }

  span {
    margin-bottom: 20px;
    cursor: pointer;
  }
}

.icon {
  font-size: 25px;
  height: 100%;
  color: var(--kungalgame-blue-5);
  cursor: pointer;
  text-align: center;

  &:hover {
    color: var(--kungalgame-red-4);
    transform: scale(1.2);
    transition: 0.1s;
  }
}

.nav {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .container {
    width: 95%;
  }

  .kungalgame {
    font-size: 50px;
  }
}
</style>
