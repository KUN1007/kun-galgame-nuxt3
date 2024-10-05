<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <div class="container" v-if="locale === 'en-us'">
    <h2>Notice</h2>
    <div>
      This messaging system is still under development, but the functionality
      should be sufficient.
    </div>
    <div>If you have any questions, please check out this topic.</div>
    <a
      href="https://www.kungal.com/zh-cn/topic/1650"
      target="_blank"
      rel="noopener noreferrer"
    >
      [Announcement] Explanation about the forum messaging system
    </a>
    <div>
      This forum remains fully open-source. If you like it, feel free to give
      our GitHub project a star.
    </div>
    <a
      href="https://github.com/KUN1007/kun-galgame-nuxt3"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://github.com/KUN1007/kun-galgame-nuxt3
    </a>
  </div>

  <div class="container" v-if="locale === 'ja-jp'">
    <h2>お知らせ</h2>
    <div>
      このメッセージシステムはまだ開発中ですが、機能は十分だと思われます。
    </div>
    <div>ご質問がある場合は、このトピックをご確認ください。</div>
    <a
      href="https://www.kungal.com/zh-cn/topic/1650"
      target="_blank"
      rel="noopener noreferrer"
    >
      [お知らせ] フォーラムのメッセージシステムに関する説明
    </a>
    <div>
      このフォーラムは完全にオープンソースです。もし気に入ったら、GitHubプロジェクトにスターを付けてください。
    </div>
    <a
      href="https://github.com/KUN1007/kun-galgame-nuxt3"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://github.com/KUN1007/kun-galgame-nuxt3
    </a>
  </div>

  <div class="container" v-if="locale === 'zh-cn'">
    <h2>提示</h2>
    <div>本消息系统尚在开发中, 但是功能应该足够用</div>
    <div>如果您有任何问题, 请查看这个话题</div>
    <a
      href="https://www.kungal.com/zh-cn/topic/1650"
      target="_blank"
      rel="noopener noreferrer"
    >
      [公告] 有关论坛消息系统的说明
    </a>
    <div>
      本论坛依旧是完全开源的, 如果您觉得不错, 可以给我们的 GitHub 项目点一个
      star
    </div>
    <a
      href="https://github.com/KUN1007/kun-galgame-nuxt3"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://github.com/KUN1007/kun-galgame-nuxt3
    </a>
  </div>

  <div class="container" v-if="locale === 'zh-tw'">
    <h2>提示</h2>
    <div>本消息系統仍在開發中，但功能應該足夠使用。</div>
    <div>如果您有任何問題，請查看此主題。</div>
    <a
      href="https://www.kungal.com/zh-cn/topic/1650"
      target="_blank"
      rel="noopener noreferrer"
    >
      [公告] 關於論壇消息系統的說明
    </a>
    <div>
      本論壇仍然是完全開源的，如果您覺得不錯，歡迎給我們的 GitHub 項目點個
      star。
    </div>
    <a
      href="https://github.com/KUN1007/kun-galgame-nuxt3"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://github.com/KUN1007/kun-galgame-nuxt3
    </a>
  </div>
</template>

<style lang="scss" scoped>
.container {
  line-height: 2rem;
  padding: 10px;

  h2 {
    margin-bottom: 8px;
  }

  a {
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  height: 100%;
}
</style>
