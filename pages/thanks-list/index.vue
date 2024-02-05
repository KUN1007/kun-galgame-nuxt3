<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: t('seo.thanksList.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.thanksList.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('kungalgame.thanks') }}</div>

      <div class="article" v-if="locale === 'en'">
        <p>
          In the design of the KUN Visual Novel website, we referenced the
          interface designs of the following excellent websites, including:
        </p>
        <br />
        <br />
        <ul class="list">
          <li>
            Twitter - Semi-transparent design, infinitely flexible height boxes
          </li>
          <li>Github - Color schemes</li>
          <li>bbs.kfmax.com - User information categorization</li>
          <li>StackOverflow - Shadowing of page sections</li>
          <li>ChatGPT (OpenAI ChatGPT) - Various technical questions</li>
          <li>Google - Topic details page</li>
          <li>YouTube - Technical exchange pages</li>
          <li>Adobe - Bottom Footer</li>
          <li>Many examples on Codepen - All pages have some relevance</li>
          <li>Bilibili (Bilibili) - Top navigation bar</li>
          <li>Ymgal (YM Galgame) - Top navigation bar</li>
        </ul>
        <br />
        <br />
        <p>
          In the initial design phase, we browsed a large number of
          well-designed web pages, and may have also referred to the designs of
          many other websites. However, we didn't keep records during extensive
          browsing, so we can't showcase them here.
        </p>
        <br />
        <br />
        <p>
          In the development of the KUN Visual Novel website, we received strong
          support from the following individuals, including:
        </p>
        <br />
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
            (Galworld) Webmaster. Yukino! Log in!
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
            (UpsetGal) Webmaster. The world's cutest, lovely shinnku sister!
            Invincible!
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
            (YM Galgame) Webmaster. Webmaster! So powerful!
          </li>
          <li>
            <span class="skip">
              <a
                href="https://yurzhang.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                yurzhang
              </a>
            </span>
            (yur!) as the Night's, Reincarnation!
          </li>
          <li>
            <span class="skip">
              <a
                href="https://i.plr.moe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Haruki
              </a>
            </span>
            (Haruki-san!) A very, very smart person! A mathematical genius!
          </li>
          <li>
            <span class="skip">
              <a
                href="https://asukaminato.eu.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Asuka Minato
              </a>
            </span>
            (Asuka-san!) He's too powerful! I'm crying!
          </li>
        </ul>
        <br />
        <br />
        <p>
          And many other individuals who supported us, as well as those who
          provided suggestions and corrections. We sincerely thank them here.
        </p>
        <br />
        <br />
        <p>
          Our website adheres to the principles of moemoe (beautiful),
          open-source, and free. You can find our projects on GitHub:
        </p>
        <br />
        <br />
        <p>
          Frontend: Vue3 + Vite + Typescript + Pinia implementation:
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
          Backend: Koa2 + Redis + Mongoose + Mongodb implementation:
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
        <p>
          Pure HTML + CSS implementation:
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
        <br />
        <br />
        <p>
          If you don't mind, you can give the above three GitHub projects a star
          as a show of support for us.
        </p>
      </div>

      <!-- Chinese translation -->
      <div class="article" v-if="locale === 'zh'">
        <p>
          在 KUNGalgame 网站的设计中，我们参考了以下优秀网站的界面设计，其中有：
        </p>
        <br />
        <br />
        <ul class="list">
          <li>Twitter（推特） - 半透明设计、无限高度弹性盒</li>
          <li>Github（github） - 配色</li>
          <li>bbs.kfmax.com（绯月） - 用户信息分类</li>
          <li>StackOverflow （StackOverflow） - 页面板块的阴影</li>
          <li>ChatGPT （OpenAI ChatGPT） - 各种技术问题</li>
          <li>Google（谷歌） - 话题详情页面</li>
          <li>YouTube （油管） - 技术交流页面</li>
          <li>Adobe （Adobe） - 底部 Footer</li>
          <li>Codepen 中的众多案例 – 全部页面均有涉及</li>
          <li>Bilibili （B 站） - 头部导航条</li>
          <li>Ymgal（月幕 Galgame） - 头部导航条</li>
        </ul>
        <br />
        <br />
        <p>
          在设计之初我们浏览了大量设计优秀的网页，可能还参考了众多网站的设计，但由于在大量的浏览时没有做相关记录，所以无法展示
        </p>
        <br />
        <br />
        <p>
          在 KUNGalgame 网站的建设中，我们得到了以下人员的大力支持，其中有：
        </p>
        <br />
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
            （Galworld）站长。老羽！上号！
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
            （失落的小站）站长。世界第一可爱美少女真红姐姐！无敌！
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
            （月幕 Galgame）站长。站长！太强了！
          </li>
          <li>
            <span class="skip">
              <a
                href="https://yurzhang.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                yurzhang
              </a>
            </span>
            （yur!）as the Night's, Reincarnation！
          </li>
          <li>
            <span class="skip">
              <a
                href="https://i.plr.moe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Haruki
              </a>
            </span>
            （Haruki 桑！）一个非常非常聪明的人！数学天才！
          </li>
          <li>
            <span class="skip">
              <a
                href="https://asukaminato.eu.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Asuka Minato
              </a>
            </span>
            （湊妈！）他太强了！我哭死！
          </li>
        </ul>
        <br />
        <br />
        <p>
          以及<span class="skip">
            <a
              href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=l8kixeJ-RCfIgpzM63QT7G8H44KkpC7q&authKey=X2IAU3zT2wOOQBCl4mwkYeTGNktTIs%2F5XhtVdKTUuyvPjRkdXjOhEhBT8l3kkSSX&noverify=0&group_code=871857690"
              target="_blank"
              rel="noopener noreferrer"
            >
              鲲的 galgame 交流群(Tencent QQ)
            </a>
          </span>
          ,
          <span class="skip">
            <a
              href="https://t.me/kungalgame"
              target="_blank"
              rel="noopener noreferrer"
            >
              鲲的 galgame 交流群(Telegram)
            </a>
          </span>
          ,
          <span class="skip">
            <a
              href="https://t.me/kungalgame"
              target="_blank"
              rel="noopener noreferrer"
            >
              KUN Visual Novel Forum Dev Team(Tencent QQ)
            </a>
          </span>
          ,
          <span class="skip">
            <a
              href="https://t.me/kungalgame"
              target="_blank"
              rel="noopener noreferrer"
            >
              KUN Visual Novel Forum Dev Team(Telegram)
            </a>
          </span>
          ，以及其它众多人员的相关支持，在这里我们对他们的建议和纠错表示衷心的感谢。
        </p>
        <br />
        <br />
        <p>
          我们的网站会秉承萌萌（美好）、开源、免费的
          <span class="skip">
            <RouterLink to="/kungalgame">建立原则</RouterLink>
          </span>
          ，不断完善和更新，您可以在 github 看到我们的项目：
        </p>
        <br />
        <br />

        <p>
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
        <p>
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
        <br />
        <br />
        <p>
          不嫌弃的话，您可以给上面三个 github 的项目点一个
          star，当作对我们的支持。
        </p>
      </div>

      <KunFooter style="margin-top: 60px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh + 65px);
}

.container {
  transition: width 0.2s;
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-2);
  backdrop-filter: blur(5px);
  padding: 20px;
  box-shadow: var(--shadow);
}

.title {
  font-size: 30px;
  margin-bottom: 30px;
}

.article {
  display: flex;
  flex-direction: column;
}

.skip {
  border-bottom: 1.5px solid var(--kungalgame-blue-4);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-4);
  }
}

.list {
  padding: 0;
  margin: 0;

  & > li {
    list-style: inside;
    margin: 5px 0;
  }
}

p {
  margin: 5px;
}
</style>
