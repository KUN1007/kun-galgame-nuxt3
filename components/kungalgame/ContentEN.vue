<script setup lang="ts"></script>

<template>
  <div class="article">
    <h1>About Us</h1>
    <h2 id="introduction">Website Introduction</h2>
    <p>
      KUN Visual Novel is a collective of individuals passionate about the
      Visual Novel genre. It currently consists of the following sub-websites:
    </p>

    <br />
    <ul class="list">
      <li>KUN Visual Novel Forum (this forum)</li>
      <li>
        <span class="skip">
          <a
            href="https://sticker.kungal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            KUN Visual Novel Sticker Pack
          </a>
        </span>
        (a website dedicated to collecting and creating Visual Novel sticker
        packs)
      </li>
      <li>
        <span class="skip">
          <a
            href="https://soft.moe/kun-visualnovel-docs/kun-forum.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            KUN Visual Novel Development Documentation
          </a>
        </span>
        (this forum is entirely open source, and the development documentation
        will be publicly available here)
      </li>
    </ul>
    <br />
    <br />

    <p>
      In addition to the projects owned by KUN Visual Novel itself, we would
      like to express our gratitude to the following websites, which have made
      significant contributions to the development of KUN Visual Novel.
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
        - Lao Yu
      </li>
      <li>
        <span class="skip">
          <a
            href="http://shinnku.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upset gal
          </a>
        </span>
        - Shinnku Sister
      </li>
      <li>
        <span class="skip">
          <a
            href="http://www.ymgal.games"
            target="_blank"
            rel="noopener noreferrer"
          >
            YM Galgame
          </a>
        </span>
        - Cang Lin
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
            Lz ACG
          </a>
        </span>
        - I'm not Lolicon
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
        - Toya
      </li>
    </ul>

    <br />
    <br />

    <p>
      In addition, the construction of KUN Visual Novel has received support
      from numerous individuals and inspiration from various websites. Please
      refer to the
      <span class="skip">
        <NuxtLinkLocale to="/thanks-list">thanks list</NuxtLinkLocale>
      </span>
      for more details.
    </p>

    <br />

    <p>
      <strong>
        We sincerely thank everyone who has contributed to the development of
        KUN Visual Novel! And thank you to those who use the KUN Visual Novel
        Forum!
      </strong>
    </p>
    <br />

    <h3>Significance</h3>

    <ul class="list">
      <li>
        Actively promote truly good games, ensuring that everyone uses websites
        like VNDB to see real
        <span class="skip">visualized data</span> and avoid being misled by
        "experts."
      </li>
      <li>
        <strong>
          Avoid the negative aspects of modern internet trends, such as the
          culture of praising and criticizing, valuing criticism as a virtue,
          etc.
        </strong>
      </li>
      <li>
        Encourage everyone to learn basic computer fundamentals to prevent the
        emergence of "keyboard warriors."
      </li>
      <li>
        Build a forum focused on individual user enjoyment, resisting the
        creation of elitist hierarchies.
      </li>
      <li>
        Many current websites use templates, resulting in a monotonous
        aesthetic; we aim to address this issue.
      </li>
      <li>...and more.</li>
    </ul>
    <br />
    <br />
    <p>
      We believe: "<strong style="color: red">
        A game that brings you joy and makes you genuinely laugh is a truly good
        game!
      </strong>
      "
    </p>
    <br />
    <br />
    <p>
      Our ultimate goal is to create:
      <strong>The world's best Visual Novel forum!</strong>
    </p>
    <br />
    <br />

    <h3>Open Source Declaration</h3>
    <p>
      This forum and all its sub-projects adhere to the
      <span class="skip">
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.en.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          AGPL-3.0 license
        </a>
      </span>
      , fully open-source and free. The GitHub project's open-source repository
      is located at
    </p>
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
    <p>
      If you don't mind, you can give our GitHub projects a star as a token of
      your support.
    </p>

    <h2 id="principle">Operating Principles</h2>
    <br />
    <h3>1. The Cutest Visual Novel Forum in the World</h3>
    <p>
      Here, "cutest" doesn't just mean literally "cute / moe"; it refers to all
      the beautiful things in the world. Anything that makes you happy and feel
      wonderful can be called "cute / moe." This means that we have no set
      rules; all rules depend on everyone's common opinions.
    </p>
    <br />
    <p>
      A visual novel forum means that
      <strong>
        we focus primarily on visual novels, and all topics on the homepage are
        related to visual novels. Other topics are placed in
        <span class="skip">
          <NuxtLinkLocale to="/pool">Topic Pool</NuxtLinkLocale>
        </span>
      </strong>
    </p>
    <h3>2. To Create The Best Atmosphere</h3>
    <p>
      Continuing from the previous point, before we started designing the entire
      website, we wrote the following on the design drawing:
    </p>
    <br />
    <ul class="list">
      <li>
        Promoting truly good games, so everyone can see real
        <span class="skip">visualized data</span> on websites like VNDB and
        avoid being misled by "experts."
      </li>
      <li>
        Rejecting the modern internet trend of praising and bashing, considering
        criticism a virtue.
      </li>
      <li>
        Empowering anyone to learn basic computer skills to avoid "newbie"
        issues.
      </li>
      <li>
        Building a forum focused on individual user enjoyment, resisting the
        creation of hierarchies.
      </li>
      <li>...</li>
    </ul>
    <br />
    <p>
      This means that unkind behavior, such as sarcasm and bashing, is not
      allowed on KUN Visual Novel. Of course, this all depends on everyone's
      opinions.
    </p>
    <h3>3. NO ADs Forever</h3>
    <p>
      Literally,
      <strong>the website will never have any form of advertisements</strong>.
      We believe a good forum should not have any advertising. If you find
      something resembling an ad, please report it. If 10 people report it, the
      topic will be locked.
    </p>
    <h3>4. Free Forever</h3>
    <p>
      Literally,
      <strong>
        no one will ever spend money on the website's virtual currency
        (Moemoepoints)
      </strong>
      . The amount of virtual currency depends on appreciation from others. If
      you would like to support us, you can do so
      <span class="skip">
        <NuxtLinkLocale to="/donate">here</NuxtLinkLocale>
      </span>
      .
    </p>
    <h2 id="stipulate">Forum Guidelines</h2>
    <p>The following behaviors will be considered violations:</p>
    <br />
    <ul class="list">
      <li>Prohibition of political discussions</li>
      <p>
        Including, but not limited to, discussions that may cause political
        disputes in any country worldwide
      </p>
      <br />
      <li>Prohibition of advertising and traffic redirection</li>
      <p>
        If the redirection involves paid resources or other more severe actions,
        it will be considered as advertising and traffic redirection
      </p>
      <br />
      <li>
        If sensitive topics or images are involved, please indicate in the
        article title
      </li>
      <p>For example, R18, R18-G, etc.</p>
      <br />
      <li>Malicious topic flooding, comments, and replies</li>
      <p>
        Even replying with one character counts as a meaningful reply, but if
        there are continuous meaningless replies, once we collectively recognize
        it as malicious comment flooding, it will be considered a violation.
      </p>
      <p>
        However, if you believe your replies are meaningful, posting a thousand
        at a time is also acceptable.
      </p>
      <br />
      <li>Malicious abuse of others</li>
      <p>
        If you think someone's actions are problematic, feel free to abuse them,
        and we will judge who is right or wrong based on the situation.
      </p>
      <p>If there is no valid reason, it will be considered malicious abuse.</p>
      <br />
      <li>Causing public outrage</li>
      <p>
        If we collectively determine that it has caused public anger and
        disharmony
      </p>
    </ul>
    <br />
    <p>
      Why offer guidelines? Because these are not "Moe" behaviors. If you'd like
      to learn more about posting etiquette, please see
      <span class="skip">
        <NuxtLinkLocale to="/non-moe"> the Non-Moe Records </NuxtLinkLocale>
      </span>
      .
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
