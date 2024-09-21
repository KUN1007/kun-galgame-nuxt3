<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <div class="help">
    <div v-if="locale === 'en-us'">
      <p>
        <strong>
          We encourage adding official purchase links for the game
        </strong>
      </p>
      <p>
        You can add any links related to the game here, such as forum topics,
        other web articles, video links, media links, and so on
      </p>
      <p>
        Apart from official purchase links, no paid referral links are allowed
      </p>
      <p>We will automatically add VNDB links when releasing the game</p>
    </div>

    <div v-if="locale === 'ja-jp'">
      <p><strong>ゲームの正規購入リンクを追加することを奨励します</strong></p>
      <p>
        ここには、そのゲームに関連するあらゆるリンクを追加できます。たとえば、フォーラムのトピック、他のウェブ記事、動画リンク、メディアリンクなどです。
      </p>
      <p>公式購入リンク以外の有料の誘導リンクは掲載できません。</p>
      <p>ゲームを公開する際に、VNDB のリンクを自動的に追加します。</p>
    </div>

    <div v-if="locale === 'zh-cn'">
      <p>
        <strong>我们鼓励添加游戏的正版购买链接</strong>
      </p>
      <p>
        这里可以添加任何与该游戏有关的链接, 例如论坛话题, 其它网络文章,
        视频链接, 媒体链接等等
      </p>
      <p>除官方购买链接外, 不得放置付费的引流链接</p>
      <p>我们会在发布游戏时自动添加 VNDB 链接</p>
    </div>

    <div v-if="locale === 'zh-tw'">
      <p>
        <strong>我們鼓勵添加遊戲的正版購買鏈接</strong>
      </p>
      <p>
        這裏可以添加任何與該遊戲有關的鏈接, 例如論壇話題, 其它網絡文章,
        視頻鏈接, 媒體鏈接等等
      </p>
      <p>除官方購買鏈接外, 不得放置付費的引流鏈接</p>
      <p>我們會在發佈遊戲時自動添加 VNDB 鏈接</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.help {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;
  margin-bottom: 17px;
  font-size: small;

  p {
    margin-bottom: 7px;
  }
}
</style>
