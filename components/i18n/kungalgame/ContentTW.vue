<script setup lang="ts"></script>

<template>
  <div class="article">
    <h1>關於我們</h1>
    <h2 id="introduction">網站簡介</h2>
    <p>
      鯤 Galgame 是一個 Galgame 集體, 它由無數熱愛 Galgame 遊戲體裁的人們組成。
      它目前有以下幾個子網站
    </p>

    <br />
    <ul class="list">
      <li>鯤 Galgame 論壇 (本論壇)</li>
      <li>
        <span class="skip">
          <a
            href="https://sticker.kungal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            鯤 Galgame 錶情包
          </a>
        </span>
        （一個專註於收集制作 Galgame 錶情包的網站）
      </li>
      <li>
        <span class="skip">
          <a
            href="https://soft.moe/kun-visualnovel-docs/kun-forum.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            鯤 Galgame 開發文檔
          </a>
        </span>
        （本論壇是完全開源的，開發文檔將會全部公開在這裏）
      </li>
      <li>
        <span class="skip">
          <a
            href="https://nav.kungal.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            鯤 Galgame 導航頁面
          </a>
        </span>
        （完全開源的導航站！ 可以前往鯤 Galgame 所有子網站！）
      </li>
      <li>
        <span class="skip">
          <a
            href="https://down.kungal.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            鯤 Galgame 下線頁面
          </a>
        </span>
        （碰到不得不下線的時候, 我們會將論壇強制重定嚮到此頁面）
      </li>
    </ul>
    <br />
    <br />

    <p>
      除了這些鯤 Galgame 本身所擁有的項目之外，我們還要感謝下面的網站，它們對鯤
      Galgame 的建設做出了很大貢獻
    </p>
    <br />
    <ul class="list">
      <li>
        <span class="skip">
          <a
            href="http://acgngames.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            ACGNGAME / Galworld
          </a>
        </span>
        - 老羽
      </li>
      <li>
        <span class="skip">
          <a
            href="http://shinnku.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            失落的小站
          </a>
        </span>
        - Shinnku 姐姐
      </li>
      <li>
        <span class="skip">
          <a
            href="http://www.ymgal.games"
            target="_blank"
            rel="noopener noreferrer"
          >
            月幕 Galgame
          </a>
        </span>
        - 蒼麟
      </li>
      <li>
        <span class="skip">
          <a
            href="http://www.ohmygpt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            OhMyGPT
          </a>
        </span>
        - Rikka
      </li>
      <li>
        <span class="skip">
          <a href="http://lzacg.org" target="_blank" rel="noopener noreferrer">
            量子 ACG
          </a>
        </span>
        - 我不是loli控
      </li>
      <li>
        <span class="skip">
          <a
            href="http://galgamer.moe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Galgamer
          </a>
        </span>
        - 冬夜
      </li>
    </ul>

    <br />
    <br />

    <p>
      除此之外，鯤 Galgame
      的建設還受到了大量人員的支持，以及諸多網站的啟發，請看
      <span class="skip">
        <NuxtLinkLocale to="/thanks-list">感謝名單</NuxtLinkLocale>
      </span>
    </p>

    <br />

    <p>
      <strong>
        我們衷心的感謝所有對鯤 Galgame 建設做出貢獻的人們！併且感謝使用鯤
        Galgame 論壇的人們！
      </strong>
    </p>
    <br />

    <h3>創建意義</h3>

    <ul class="list">
      <li>
        大力宣傳真正的好遊戲，讓大家都會用 VNDB 等網站，看到真正的
        <span class="skip">可視化數據</span>，避免被“大佬”毒害
      </li>
      <li>
        <strong>遠離現代互聯網捧一踩一，以批評為美德等等不好的現狀</strong>
      </li>
      <li>讓任何人都學習基本的計算機基礎，避免“爺新”的出現</li>
      <li>構建一個以用戶個人樂趣為主的論壇，抵制鄙視鏈的產生</li>
      <li>目前的網站大多數套用模闆，仟篇一律，令人審美疲勞</li>
      <li>......等等。</li>
    </ul>
    <br />
    <br />
    <p>
      我們認為：“
      <strong style="color: red">
        讓妳覺得快樂的，讓妳發自內心笑出來的，才是真正的好遊戲！
      </strong>
      ”
    </p>
    <br />
    <br />
    <p>
      我們將要實現的最終目標是：<strong>世界上最棒的 galgame 論壇！</strong>
    </p>
    <br />
    <br />

    <h3>開源聲明</h3>
    <p>
      本論壇和其所有子項目遵循
      <span class="skip">
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.en.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          AGPL-3.0 協議
        </a>
      </span>
      , 完全開源免費, GitHub 項目開源地址為
    </p>
    <br />

    <p>
      當前版本論壇 (V2):
      <br />
      <br />
      Nuxt3 + mongodb 全棧實現
      <span class="skip">
        <a
          href="https://github.com/KUN1007/kun-galgame-nuxt3"
          target="_blank"
          rel="noopener noreferrer"
        >
          kun-galgame-nuxt3
        </a>
      </span>
    </p>

    <br />
    <br />

    <p>
      前後端分離式論壇 (V1):
      <br />
      <br />
      前端 Vue3 + Vite + Typescript + Pinia 實現：
      <span class="skip">
        <a
          href="https://github.com/KUN1007/kun-galgame-vue"
          target="_blank"
          rel="noopener noreferrer"
        >
          kun-galgame-vue
        </a>
      </span>
    </p>
    <p>
      後端 Koa2 + Redis + Mongoose + Mongodb 實現：
      <span class="skip">
        <a
          href="https://github.com/KUN1007/kun-galgame-koa"
          target="_blank"
          rel="noopener noreferrer"
        >
          kun-galgame-koa
        </a>
      </span>
    </p>

    <br />
    <br />

    <p>
      論壇最初始設計稿:
      <br />
      <br />
      純 HTML + CSS 實現：
      <span class="skip">
        <a
          href="https://github.com/KUN1007/kungalgame-pure-css"
          target="_blank"
          rel="noopener noreferrer"
        >
          kun-galgame-pure-css
        </a>
      </span>
    </p>
    <br />
    <br />
    <p>不嫌棄的話，您可以給我們的 GitHub 項目點一個 star, 當作對我們的支持。</p>

    <h2 id="principle">運營理念</h2>
    <br />
    <h3>1. 世界上最萌的 galgame 論壇</h3>
    <p>
      這裏的“萌”併不只是字面意義上的萌，而是指的世界上一切美好的事物，任何使妳覺得美好令妳覺得快樂的事物都可以被稱之為萌
    </p>
    <br />
    <p>
      Galgame 論壇意味著
      <strong>
        我們只以 galgame 為主，在首頁的話題中僅含有和 galgame 有關的一切話題
      </strong>
      ，其它話題全部位於
      <span class="skip">
        <NuxtLinkLocale to="/pool">話題池</NuxtLinkLocale>
      </span>
      中
    </p>
    <h3>2. 以營造最良好的氛圍為理念</h3>
    <p>緊接上一條，在整個網站編寫之前, 我們在設計圖上寫了這些：</p>
    <br />
    <ul class="list">
      <li>
        大力宣傳真正的好遊戲，讓大家都會用 VNDB
        等網站，看到真正的可視化數據，避免被“大佬”毒害
      </li>
      <li>互聯網舉一踩一，以批評為美德等等不好的現狀</li>
      <li>讓任何人都學習基本的計算機基礎，避免“爺新”的出現</li>
      <li>構建一個以用戶個人樂趣為主的論壇，避免鄙視鏈的產生</li>
      <li>......</li>
    </ul>
    <br />
    <p>
      這意味這不可以在鯤 Galgame
      做有關於陰陽怪氣、捧一踩一等等不好的行為，當然，這一切都取決於所有人的看法
    </p>
    <h3>3. 永遠不會有廣告</h3>
    <p>
      字面意思，<strong>網站永遠不會出現任何形式的廣告</strong>，我們覺得一個好的論壇不應該有任何廣告的構成，如果發現了類似於廣告的情況，請踩這個話題，因為纍計
      10 人將會封禁話題
    </p>
    <h3>4. 永遠不會收費</h3>
    <p>
      字面意思，任何人永遠不會為網站的任何虛擬貨幣（萌萌點）花錢，虛擬貨幣的數量取決於別人對妳的贊賞，我們認為運營不起一個網站只能說明我們的經濟有問題，直接關站即可，當然，我們提供
      <span class="skip">
        <NuxtLinkLocale to="/donate">贊助渠道</NuxtLinkLocale>
      </span>
    </p>
    <h2 id="stipulate">論壇規定</h2>
    <p>下面的行為會被視作違規行為</p>
    <br />
    <ul class="list">
      <li>政治討論禁止</li>
      <p>包括但不限於, 對全球一切國家的, 可能引起政治性糾紛的討論</p>
      <br />
      <li>廣告引流禁止</li>
      <p>如果引流的對象屬於付費資源, 或有其它更嚴重的行為, 視為廣告引流</p>
      <br />
      <li>涉及到敏感話題、圖片等請在文章標題註明</li>
      <p>例如 R18、R18-G 等</p>
      <br />
      <li>真人色情禁止</li>
      <p>
        如果某些情況被我們共同評判為真人色情（包括圖片、視頻、音頻、文本等），則視為違規
      </p>
      <br />
      <li>惡意刷話題、評論、回復</li>
      <p>
        回復一個字也算作有意義的回復, 但如果連續無意義的回復,
        一旦被我們公認為惡意刷評論, 則算作違規
      </p>
      <p>然而, 如果您認為您的回復有意義, 一次發一仟個也沒有關繫</p>
      <br />
      <li>惡意辱罵他人者</li>
      <p>如果您認為一些人做的事有問題, 請盡情辱罵, 我們會視情況評判誰對誰錯</p>
      <p>如果沒有任何理由, 則視作惡意辱罵</p>
      <br />
      <li>引起公憤者</li>
      <p>被我們共同評定為觸犯眾怒, 引起不和諧的</p>
    </ul>
    <br />
    <p>
      為什麽要規定，當然是因為這些不萌啦，如果還想了解更多關於發帖的禮儀，請查看
      《
      <span class="skip">
        <NuxtLinkLocale to="/non-moe">不萌記錄</NuxtLinkLocale>
      </span>
      》
    </p>
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
}

ul {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
p,
.list {
  color: var(--kungalgame-font-color-2);
}

h1 {
  margin-right: 30px;
  margin-top: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  margin-top: 77px;
  margin-bottom: 30px;
}

h3 {
  margin-bottom: 30px;
  margin-top: 20px;
}

p {
  margin: 5px;
}

strong {
  text-transform: uppercase;
}

.skip {
  border-bottom: 1.5px solid var(--kungalgame-blue-5);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-5);
  }
}

.list > li {
  list-style: inside;
  text-indent: 1em;
  margin-top: 0.5rem;
}

@media (max-width: 700px) {
  h1 {
    margin: 20px auto;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
