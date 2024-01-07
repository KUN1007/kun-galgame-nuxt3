<script setup lang="ts">
const { locale } = useI18n()

const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const kungalgamePageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.kungalgame + '%'
})
</script>

<template>
  <div class="root">
    <div class="content-container">
      <div class="content">
        <KungalgameAside />

        <!-- KUNGalgame en translation -->
        <div class="article" v-if="locale === 'en'">
          <h1>About Us</h1>
          <h2 id="introduction">Website Introduction</h2>
          <p>
            KUN Visual Novel is a Visual Novel forum construction project
            initiated by
            <span class="skip">
              <a
                href="https://github.com/KUN1007"
                target="_blank"
                rel="noopener noreferrer"
              >
                KUN
              </a>
            </span>
            individually, and it is currently in the
            <span class="skip">
              <a
                href="https://github.com/KUN1007/kun-galgame-vue"
                target="_blank"
                rel="noopener noreferrer"
              >
                development phase
              </a> </span
            >.
          </p>
          <br />
          <p>The significance of KUN Visual Novel is:</p>
          <br />
          <br />
          <ul class="list">
            <li>
              Promoting truly good games, so everyone can see real
              <span class="skip">visualized data</span> on websites like VNDB
              and avoid being misled by "experts."
            </li>
            <li>
              <strong>
                Staying away from the modern internet trend of praising and
                bashing, and considering criticism a virtue.
              </strong>
            </li>
            <li>
              Empowering anyone to learn basic computer skills to avoid "newbie"
              issues.
            </li>
            <li>
              Building a forum focused on individual user enjoyment, resisting
              the creation of hierarchies.
            </li>
            <li>
              Most current websites use templates, making them all look the same
              and causing aesthetic fatigue.
            </li>
            <li>... etc.</li>
          </ul>
          <br />
          <br />
          <p>
            We believe: "<strong style="color: red"
              >What makes you happy, what makes you genuinely laugh, is a truly
              excellent Visual Novel!</strong
            >"
          </p>
          <br />
          <br />
          <p>
            Our ultimate goal is to create
            <strong>the world's best visual novel forum!</strong>
          </p>
          <br />
          <br />
          <p>
            As of version 1.0.0, the design, development, maintenance, and
            promotion of the forum are all led by me alone. If you have ideas
            for forum construction, opinions about the forum environment, or
            just want to chat, you can join us
            <span class="skip">
              <RouterLink to="/contact">here</RouterLink> </span
            >.
          </p>
          <br />
          <br />
          <p>
            The forum's construction has received invaluable assistance from
            many individuals, including (in no particular order):
          </p>
          <br />
          <ul class="list">
            <li>
              <span class="skip">
                <a
                  href="https://acgngames.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACGNGAME
                </a>
              </span>
              (Galworld) Webmaster
            </li>
            <li>
              <span class="skip">
                <a
                  href="https://shinnku.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shinnku
                </a>
              </span>
              (UpsetGal) Webmaster
            </li>
            <li>
              <span class="skip">
                <a
                  href="https://www.ymgal.games"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ymgal
                </a>
              </span>
              (YM Galgame) Webmaster
            </li>
            <li>... and more.</li>
          </ul>
          <br />
          <br />
          <p>
            The design and development stages of the forum were inspired by
            several well-designed websites, including (in no particular order):
          </p>
          <br />
          <ul class="list">
            <li>Twitter.com - Topic detail page</li>
            <li>github.com - Color schemes</li>
            <li>
              bbs.kfmax.com (ScarletMoon) - User information categorization
            </li>
            <li>... and more.</li>
          </ul>
          <br />
          <br />
          <p>
            Among them, the biggest inspiration came from Codepen and the design
            philosophies of many experts on GitHub. You can view all the links
            mentioned above
            <span class="skip">
              <RouterLink to="/thanks-list">here</RouterLink> </span
            >.
          </p>
          <br />
          <br />
          <h2 id="principle">Operating Principles</h2>
          <br />
          <h3>1. The Cutest Visual Novel Forum in the World</h3>
          <p>
            Here, "cutest" doesn't just mean literally "cute / moe"; it refers
            to all the beautiful things in the world. Anything that makes you
            happy and feel wonderful can be called "cute / moe." This means that
            we have no set rules; all rules depend on everyone's common
            opinions.
          </p>
          <p>
            A visual novel forum means that
            <strong>
              we focus primarily on visual novels, and all topics on the
              homepage are related to visual novels. Other topics are placed in
              <span class="skip">
                <RouterLink to="/pool">Topic Pool</RouterLink>
              </span>
            </strong>
          </p>
          <h3>2. To Create The Best Atmosphere</h3>
          <p>
            Continuing from the previous point, before I started designing the
            entire website, I wrote the following on the design drawing:
          </p>
          <br />
          <ul class="list">
            <li>
              Promoting truly good games, so everyone can see real
              <span class="skip">visualized data</span> on websites like VNDB
              and avoid being misled by "experts."
            </li>
            <li>
              Rejecting the modern internet trend of praising and bashing,
              considering criticism a virtue.
            </li>
            <li>
              Empowering anyone to learn basic computer skills to avoid "newbie"
              issues.
            </li>
            <li>
              Building a forum focused on individual user enjoyment, resisting
              the creation of hierarchies.
            </li>
            <li>...</li>
          </ul>
          <br />
          <p>
            This means that unkind behavior, such as sarcasm and bashing, is not
            allowed on KUN Visual Novel. Of course, this all depends on
            everyone's opinions.
          </p>
          <h3>3. NO ADs Forever</h3>
          <p>
            Literally,
            <strong
              >the website will never have any form of advertisements</strong
            >. We believe a good forum should not have any advertising. If you
            find something resembling an ad, please report it. If 10 people
            report it, the topic will be locked.
          </p>
          <h3>4. Free Forever</h3>
          <p>
            Literally,
            <strong
              >no one will ever spend money on the website's virtual currency
              (Moemoepoints)</strong
            >. The amount of virtual currency depends on appreciation from
            others. If you would like to support us, you can do so
            <span class="skip">
              <RouterLink to="/donate">here</RouterLink> </span
            >.
          </p>
          <h2 id="stipulate">Forum Guidelines</h2>
          <p>
            Guidelines? No, we have
            <strong>no guidelines</strong>. All guidelines depend on everyone's
            common opinions.
          </p>
          <p>However, we hope to keep things kind and minimize hostility.</p>
          <p style="margin-bottom: 10px">
            To avoid having your account deleted prematurely,
            <strong style="color: red">we offer these suggestions</strong>
          </p>
          <ul class="list">
            <li>1. No political discussions.</li>
            <li>2. No advertising or solicitation.</li>
            <li>
              3. For sensitive topics, please include a clear warning in the
              article title, e.g., R18, R18-G, etc.
            </li>
          </ul>
          <br />
          <p>
            Why offer suggestions? Because these are not "Moe" behaviors. If
            you'd like to learn more about posting etiquette, please see
            <span class="skip">
              <RouterLink to="/non-moe">the Non-Moe Records</RouterLink> </span
            >.
          </p>
          <br />
          <br />
        </div>

        <!-- KUNGalgame cn translation -->
        <div class="article" v-if="locale === 'zh'">
          <h1>关于我们</h1>
          <h2 id="introduction">网站简介</h2>
          <p>
            KUNGalgame 是由
            <span class="skip">
              <a
                href="https://github.com/KUN1007"
                target="_blank"
                rel="noopener noreferrer"
              >
                KUN（鲲）
              </a>
            </span>
            个人发起的一个 galgame 论坛建设项目，目前正在
            <span class="skip">
              <a
                href="https://github.com/KUN1007/kun-galgame-vue"
                target="_blank"
                rel="noopener noreferrer"
              >
                开发阶段
              </a>
            </span>
          </p>
          <br />
          <p>KUNGalgame 创建的意义在于：</p>
          <br />
          <br />
          <ul class="list">
            <li>
              大力宣传真正的好游戏，让大家都会用 VNDB 等网站，看到真正的
              <span class="skip">可视化数据</span>，避免被“大佬”毒害
            </li>
            <li>
              <strong
                >远离现代互联网捧一踩一，以批评为美德等等不好的现状</strong
              >
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
            我们将要实现的最终目标是：<strong
              >世界上最棒的 galgame 论坛！</strong
            >
          </p>
          <br />
          <br />
          <p>
            目前截止 V 1.0.0
            版本，论坛的设计、开发、维护、推广都是由我一人主导，如果您有对论坛建设的想法、对论坛环境的看法、亦或者是单纯的想要闲聊吹水，您都可以<span
              class="skip"
            >
              <RouterLink to="/contact">加入我们</RouterLink>
            </span>
          </p>
          <br />
          <br />
          <p>论坛的建设受到过大量人员的不懈帮助，其中有（排名不分先后）：</p>
          <br />
          <ul class="list">
            <li>
              <span class="skip">
                <a
                  href="http://acgngames.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACGNGAME
                </a>
              </span>
              （Galworld）站长
            </li>
            <li>
              <span class="skip">
                <a
                  href="http://shinnku.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shinnku
                </a>
              </span>
              （失落的小站）站长
            </li>
            <li>
              <span class="skip">
                <a
                  href="http://www.ymgal.games"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ymgal
                </a>
              </span>
              （月幕 Galgame）站长
            </li>
            <li>......等等</li>
          </ul>
          <br />
          <br />
          <p>
            论坛的开发设计阶段参考了数个网站的优良设计，其中有（排名不分先后）：
          </p>
          <br />
          <ul class="list">
            <li>Twitter.com（推特） - 话题详情页</li>
            <li>github.com（github） - 配色</li>
            <li>bbs.kfmax.com（绯月） - 用户信息分类</li>
            <li>......等等</li>
          </ul>
          <br />
          <br />
          <p>
            其中对我灵感启发最大的莫过于 Codepen 以及 github
            里众多大佬的设计思想，以上的全部链接可以查看
            <span class="skip">
              <RouterLink to="/thanks-list">感谢名单</RouterLink>
            </span>
          </p>
          <br />
          <br />
          <h2 id="principle">运营理念</h2>
          <br />
          <h3>1. 世界上最萌的 galgame 论坛</h3>
          <p>
            这里的“萌”并不只是字面意义上的萌，而是指的世界上一切美好的事物，任何使你觉得美好令你觉得快乐的事物都可以被称之为萌，这意味着我们没有任何的规定，一切的规定取决于所有人共同的看法
          </p>
          <p>
            Galgame 论坛意味着
            <strong
              >我们只以 galgame 为主，在首页的话题中仅含有和 galgame
              有关的一切话题
            </strong>
            ，其它话题全部位于
            <span class="skip">
              <RouterLink to="/pool">话题池</RouterLink>
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
            这意味这不可以在 KUNGalgame
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
              <RouterLink to="/donate">赞助渠道</RouterLink>
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
              <RouterLink to="/non-moe">不萌记录</RouterLink>
            </span>
            》
          </p>
          <br />
          <br />
        </div>
      </div>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  min-height: 800px;
}

.content-container {
  border-radius: 7px;
  height: calc(100vh - 138px);
  transition: width 0.2s;
  width: v-bind(kungalgamePageWidth);
  min-height: 800px;
  margin: auto;
}

.content {
  height: 100%;
  overflow-y: scroll;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 7px;
  display: flex;

  &::-webkit-scrollbar {
    display: inline;
    width: 4px;
    height: 0;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--kungalgame-blue-4);
    border-radius: 2px;
  }

  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--kungalgame-blue-4) var(--kungalgame-blue-1);
}

.article {
  width: 100%;
  margin-left: 30px;
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
  border-left: 4px solid var(--kungalgame-blue-4);
  text-indent: 1em;
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
  border-bottom: 1.5px solid var(--kungalgame-blue-4);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-4);
  }
}

.list > li {
  list-style: inside;
  text-indent: 1em;
}

@media (max-width: 1000px) {
  .content-container {
    width: 90%;
    padding: 0;
  }
}

@media (max-width: 700px) {
  .content-container {
    width: 100%;
  }

  .article {
    margin-left: 7px;
  }

  h1 {
    margin: 20px auto;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
