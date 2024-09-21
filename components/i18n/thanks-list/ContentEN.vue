<script setup lang="ts"></script>

<template>
  <div class="article">
    <p>
      In the design of the KUN Visual Novel website, we referenced the interface
      designs of the following excellent websites, including:
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
      In the initial design phase, we browsed a large number of well-designed
      web pages, and may have also referred to the designs of many other
      websites. However, we didn't keep records during extensive browsing, so we
      can't showcase them here.
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
          <a href="https://i.plr.moe" target="_blank" rel="noopener noreferrer">
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
      And many other individuals who supported us, as well as those who provided
      suggestions and corrections. We sincerely thank them here.
    </p>
    <br />
    <br />
    <p>
      Our website adheres to the principles of moemoe (beautiful), open-source,
      and free. You can find our projects on GitHub:
    </p>

    <br />
    <br />

    <p>
      Current version of the forum (V2):
      <br />
      <br />
      Full-stack implementation with Nuxt3 + MongoDB
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
      Decoupled forum (V1):
      <br />
      <br />
      Frontend implemented with Vue3 + Vite + Typescript + Pinia:
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
      Backend implemented with Koa2 + Redis + Mongoose + MongoDB:
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
      Initial design draft of the forum:
      <br />
      <br />
      Implemented with pure HTML + CSS:
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
      If you don't mind, you can give our GitHub projects a star as a token of
      your support.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
}

.skip {
  border-bottom: 1.5px solid var(--kungalgame-blue-5);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-5);
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
