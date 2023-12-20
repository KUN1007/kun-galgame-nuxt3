<script setup lang="ts"></script>

<template>
  <div class="kungalgame-contact">
    <ul>
      <li>
        <a
          aria-label="KUN Visual Novel Official Telegram Group"
          href="https://t.me/kungalgame"
          target="_blank"
        >
          <Icon name="line-md:telegram" />
        </a>
      </li>

      <li>
        <a
          aria-label="KUN Visual Novel Official Twitter (X) Account | 鲲 Galgame 论坛官方推特账号"
          href="https://twitter.com/kungalgame"
          target="_blank"
        >
          <Icon name="line-md:twitter-x-alt" />
        </a>
      </li>

      <li>
        <a
          aria-label="KUN Visual Novel Open Source GitHub Repository | 鲲 Galgame 论坛开源 GitHub 仓库"
          href="https://github.com/KUN1007/kun-galgame-vue"
          target="_blank"
        >
          <Icon name="line-md:github-loop" />
        </a>
      </li>

      <li>
        <a
          aria-label="KUN Visual Novel Official QQ Group | 鲲 Galgame 官方 QQ 群"
          href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=hlXYbLM8MqOm9WzE22ZodNiQJ3nc1Bu2&authKey=7xfTYC1atV5loXyWNv9VOTOaf5ZzR9BdCFcMNJWdmyukck8%2FDLSF3%2FrHgyiY48pT&noverify=0&group_code=726477957"
          target="_blank"
        >
          <Icon name="bi:tencent-qq" />
        </a>
      </li>

      <li>
        <a
          aria-label="KUN Visual Novel Official Bilibili Account | 鲲 Galgame 官方 Bilibili"
          href="https://space.bilibili.com/1748455574"
          target="_blank"
        >
          <Icon name="ri:bilibili-line" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-contact {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-2);
  font-size: small;

  h2 {
    margin-right: 20px;
    font-size: medium;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    li {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        font-size: 17px;
        color: var(--kungalgame-font-color-2);
      }
    }
  }
}
</style>
