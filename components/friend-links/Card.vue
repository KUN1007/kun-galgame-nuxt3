<script setup lang="ts">
interface Friend {
  name: string
  link: string
  label: string
}

const friends: Friend[] = [
  {
    name: `sticker`,
    link: `https://sticker.kungal.com`,
    label: 'KUN Visualnovel Stickers | 鲲 Galgame 表情包'
  },
  {
    name: `acgngame`,
    link: `https://acgngames.net`,
    label: 'ACGNGAME, Gal World, Galgame 游戏爱好者之家'
  },
  {
    name: `shinnku`,
    link: `https://shinnku.com`,
    label: `Shinnku's Visual Novel, Upset Gal, 失落的小站 失落小站 - galgame资源站`
  },
  {
    name: `ymgal`,
    link: `https://www.ymgal.games`,
    label:
      'YM Galgame, 月幕 Galgame -最戳你XP的美少女游戏综合交流平台 | 来感受这绝妙的艺术体裁'
  },
  {
    name: `ohmygpt`,
    link: `https://ohmygpt.com`,
    label: `OhMyGPT.COM offers you convenient, unlimited access to advanced AI models like GPT-3.5-turbo, GPT-3.5-turbo-16k, GPT-4, GPT-4-32k, DALL-E, whisper, MidJourney, and more.`
  },
  {
    name: `galgamer`,
    link: `https://galgamer.moe`,
    label: `因爲你是一個一個一個 <Galgamer/美少女> 啊啊啊啊阿`
  },
  {
    name: `xiayuge`,
    link: `https://xiayuge1.top/`,
    label: `夏轩阁是一个创建于2022年的一个主要与galgame有关的站点, 与大家分享、探讨自己喜欢的作品, 我们一直在提供公益服务, 接下来的路还很长, 希望能够与各位一起走完。`
  },
  {
    name: `hikarinagi`,
    link: `https://www.hikarinagi.com/`,
    label: `Hikarinagi致力于为所有ACG爱好者提供一个交流和分享的平台! 你不仅可以找到汉化Galgame、小说、漫画等等超多资源, 还能和谐愉快地与大家互动!`
  },
  {
    name: `qingju`,
    link: `https://www.qingju.org/`,
    label: `青桔网是由青桔移植组建立的非盈利型galgame免费分享平台`
  },
  {
    name: 'koibumi',
    link: 'https://s.koid.cc/',
    label: 'A simple url shorten app'
  }
]
</script>

<template>
  <div class="container">
    <a
      class="card"
      v-for="(friend, index) in friends"
      :key="index"
      :href="friend.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="name">{{ $t(`friends.${friend.name}`) }}</div>
      <div class="label">{{ friend.label.slice(0, 107) }}</div>
      <NuxtImg :src="`/friends/${friend.name}.webp`" />
    </a>

    <NuxtLinkLocale class="join" to="/contact">
      <h3>{{ $t('friends.join') }}</h3>
      <p>{{ $t('friends.hint') }}</p>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 17px;
  padding: 17px;
}

.card {
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  padding: 10px;
  border-radius: 10px;
  color: var(--kungalgame-font-color-3);

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow);

    .name {
      color: var(--kungalgame-blue-5);
    }
  }

  .name {
    display: flex;
    font-size: 20px;
    font-weight: bold;
  }

  .label {
    font-size: small;
    margin: 10px 0;
  }
}

.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--kungalgame-font-color-0);

  h3 {
    color: var(--kungalgame-blue-5);
    font-size: 20px;
  }

  p {
    font-size: small;
    text-align: center;
  }
}
</style>
