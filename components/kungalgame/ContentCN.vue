<script setup lang="ts"></script>

<template>
  <div class="article">
    <h1>关于我们</h1>
    <h2 id="introduction">网站简介</h2>
    <p>
      鲲 Galgame 是一个 Galgame 集体, 它由无数热爱 Galgame 游戏体裁的人们组成。
      它目前有以下几个子网站
    </p>

    <br />
    <ul class="list">
      <li>鲲 Galgame 论坛 (本论坛)</li>
      <li>
        <span class="skip">
          <a
            href="https://sticker.kungal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            鲲 Galgame 表情包
          </a>
        </span>
        （一个专注于收集制作 Galgame 表情包的网站）
      </li>
      <li>
        <span class="skip">
          <a
            href="https://soft.moe/kun-visualnovel-docs/kun-forum.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            鲲 Galgame 开发文档
          </a>
        </span>
        （本论坛是完全开源的，开发文档将会全部公开在这里）
      </li>
    </ul>
    <br />
    <br />

    <p>
      除了这些鲲 Galgame 本身所拥有的项目之外，我们还要感谢下面的网站，它们对鲲
      Galgame 的建设做出了很大贡献
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
        - 苍麟
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
      除此之外，鲲 Galgame
      的建设还受到了大量人员的支持，以及诸多网站的启发，请看
      <span class="skip">
        <NuxtLinkLocale to="/thanks-list">感谢名单</NuxtLinkLocale>
      </span>
    </p>

    <br />

    <p>
      <strong>
        我们衷心的感谢所有对鲲 Galgame 建设做出贡献的人们！并且感谢使用鲲
        Galgame 论坛的人们！
      </strong>
    </p>
    <br />

    <h3>鲲 Galgame 论坛创建的意义在于：</h3>

    <ul class="list">
      <li>
        大力宣传真正的好游戏，让大家都会用 VNDB 等网站，看到真正的
        <span class="skip">可视化数据</span>，避免被“大佬”毒害
      </li>
      <li>
        <strong>远离现代互联网捧一踩一，以批评为美德等等不好的现状</strong>
      </li>
      <li>让任何人都学习基本的计算机基础，避免“爷新”的出现</li>
      <li>构建一个以用户个人乐趣为主的论坛，抵制鄙视链的产生</li>
      <li>目前的网站大多数套用模板，千篇一律，令人审美疲劳</li>
      <li>......等等。</li>
    </ul>
    <br />
    <br />
    <p>
      我们认为：“<strong style="color: red"
        >让你觉得快乐的，让你发自内心笑出来的，才是真正的好游戏！</strong
      >”
    </p>
    <br />
    <br />
    <p>
      我们将要实现的最终目标是：<strong>世界上最棒的 galgame 论坛！</strong>
    </p>
    <br />
    <br />

    <h3>开源声明</h3>
    <p>
      本论坛和其所有子项目遵循
      <span class="skip">
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.en.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          GPL-3.0 协议
        </a>
      </span>
      , 完全开源免费, GitHub 项目开源地址为
    </p>
    <br />

    <p>
      当前版本论坛 (V2):
      <br />
      <br />
      Nuxt3 + mongodb 全栈实现
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
      前后端分离式论坛 (V1):
      <br />
      <br />
      前端 Vue3 + Vite + Typescript + Pinia 实现：
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
      后端 Koa2 + Redis + Mongoose + Mongodb 实现：
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
      论坛最初始设计稿:
      <br />
      <br />
      纯 HTML + CSS 实现：
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
    <p>不嫌弃的话，您可以给我们的 GitHub 项目点一个 star，当作对我们的支持。</p>

    <h2 id="principle">运营理念</h2>
    <br />
    <h3>1. 世界上最萌的 galgame 论坛</h3>
    <p>
      这里的“萌”并不只是字面意义上的萌，而是指的世界上一切美好的事物，任何使你觉得美好令你觉得快乐的事物都可以被称之为萌，这意味着我们没有任何的规定，一切的规定取决于所有人共同的看法
    </p>
    <br />
    <p>
      Galgame 论坛意味着
      <strong
        >我们只以 galgame 为主，在首页的话题中仅含有和 galgame 有关的一切话题
      </strong>
      ，其它话题全部位于
      <span class="skip">
        <NuxtLinkLocale to="/pool">话题池</NuxtLinkLocale>
      </span>
      中
    </p>
    <h3>2. 以营造最良好的氛围为理念</h3>
    <p>紧接上一条，在整个网站编写之前，我在设计图上写了这些：</p>
    <br />
    <ul class="list">
      <li>
        大力宣传真正的好游戏，让大家都会用 VNDB
        等网站，看到真正的可视化数据，避免被“大佬”毒害
      </li>
      <li>互联网举一踩一，以批评为美德等等不好的现状</li>
      <li>让任何人都学习基本的计算机基础，避免“爷新”的出现</li>
      <li>构建一个以用户个人乐趣为主的论坛，避免鄙视链的产生</li>
      <li>......</li>
    </ul>
    <br />
    <p>
      这意味这不可以在鲲 Galgame
      做有关于阴阳怪气、捧一踩一等等不好的行为，当然，这一切都取决于所有人的看法
    </p>
    <h3>3. 永远不会有广告</h3>
    <p>
      字面意思，<strong>网站永远不会出现任何形式的广告</strong>，我们觉得一个好的论坛不应该有任何广告的构成，如果发现了类似于广告的情况，请踩这个话题，因为累计
      10 人将会封禁话题
    </p>
    <h3>4. 永远不会收费</h3>
    <p>
      字面意思，任何人永远不会为网站的任何虚拟货币（萌萌点）花钱，虚拟货币的数量取决于别人对你的赞赏，我们认为运营不起一个网站只能说明我们的经济有问题，直接关站即可，当然，我们提供
      <span class="skip">
        <NuxtLinkLocale to="/donate">赞助渠道</NuxtLinkLocale>
      </span>
    </p>
    <h2 id="stipulate">论坛规定</h2>
    <p>
      规定？不，我们<strong>没有规定</strong>，一切的规定取决于所有人共同的看法
    </p>
    <p>但是，我们还是希望可以温柔一点，少一点攻击性</p>
    <p style="margin-bottom: 10px">
      为了避免过早的被删除账户，<strong style="color: red"
        >我们提供这些建议</strong
      >
    </p>
    <ul class="list">
      <li>1. 政治讨论禁止</li>
      <li>2. 广告引流禁止</li>
      <li>3. 涉及到敏感话题请在文章标题注明，例如 R18、R18-G 等</li>
    </ul>
    <br />
    <p>
      为什么要建议，当然是因为这些不萌啦，如果还想了解更多关于发帖的礼仪，请查看
      《
      <span class="skip">
        <NuxtLinkLocale to="/non-moe">不萌记录</NuxtLinkLocale>
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
  list-style: none;
  text-decoration: none;
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
  border-left: 4px solid var(--kungalgame-blue-5);
  text-indent: 1em;
}

h3 {
  margin-bottom: 30px;
  margin-top: 20px;
  border-left: 3px solid var(--kungalgame-blue-5);
  text-indent: 1em;
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
