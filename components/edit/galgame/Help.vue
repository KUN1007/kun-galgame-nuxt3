<script setup lang="ts">
const { locale } = useI18n()

interface Site {
  url: string
  name: string
}

const siteList: Site[] = [
  {
    url: 'https://vndb.org/',
    name: 'vndb'
  },
  {
    url: 'https://erogamescape.dyndns.org/',
    name: 'erogamescape'
  },
  {
    url: 'https://www.dlsite.com/index.html',
    name: 'dlsite'
  },
  {
    url: 'https://www.wikipedia.org/',
    name: 'wikipedia'
  }
]
</script>

<template>
  <h2 class="help">
    <a href="http://" target="_blank" rel="noopener noreferrer">
      <span>{{ $t('edit.galgame.help.name') }}</span>
      <Icon name="mingcute:external-link-line" />
    </a>
  </h2>

  <p>{{ $t('edit.galgame.help.reference') }}</p>

  <div class="site">
    <a
      v-for="(site, index) in siteList"
      :key="index"
      :href="site.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ $t(`edit.galgame.help.${site.name}`) }}
    </a>
  </div>

  <div class="definition" v-if="locale === 'en-us'">
    <p>
      Our current definition of Visualnovel is based on games that can be found
      on VNDB. If a game cannot be found on VNDB, it is not considered a
      Visualnovel.
    </p>
    <p>
      For non-Visualnovel games that cannot be found in the search, please
      temporarily classify them under topic's Galgame -> Others category.
    </p>
    <p>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        How to search for Galgame through VNDB?
      </a>
    </p>
    <p>
      Before publishing a new visualnovel, please make sure there is no existing
      visualnovel with the same title in the forum. You will earn 5 MoeMoePoints
      for publishing a new visualnovel.
    </p>
    <p>
      If you want to publish visualnovel resources, and the game does not exist,
      you need to create the game first.
    </p>
    <p>
      If the game already exists, you can add resource links on the
      corresponding game page.
    </p>
    <p>
      <strong>
        The fetch VN data API is sourced from VNDB, and it has rate limits.
        Please use it reasonably. If you cannot retrieve the data, please fill
        it in manually.
      </strong>
    </p>
  </div>

  <div class="definition" v-if="locale === 'zh-cn'">
    <p>
      我们目前对 Galgame 的定义是，可以在 VNDB 检索到的游戏就是 Galgame,
      否则就不是。
    </p>
    <p>
      对检索不到的非 Galgame 游戏, 请大家暂时发布在话题的 Galgame ->其它 分类。
    </p>
    <p>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        如何通过 VNDB 检索 Galgame?
      </a>
    </p>
    <p>
      在发布 Galgame 前, 您需要确定论坛中没有同样的 Galgame, 发布新 Galgame
      您将会获得 5 萌萌点。
    </p>
    <p>如果您要发布 Galgame 资源, 游戏不存在的话，您需要先创建游戏。</p>
    <p>如果游戏已存在, 可以到对应 Galgame 的界面添加 Galgame 资源链接。</p>
    <p>
      <strong>
        获取 Galgame 数据的 API 来源于 VNDB, 该 API 有频率限制,
        请大家合理使用。如果获取不到数据, 请大家手动填写。
      </strong>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.help {
  a {
    color: var(--kungalgame-blue-5);

    .icon {
      margin-left: 10px;
    }
  }
}

.site {
  display: flex;
  flex-wrap: wrap;
  margin: 17px 0;

  a {
    font-weight: bold;
    color: var(--kungalgame-blue-5);
    padding: 3px 7px;
    border-bottom: 2px solid transparent;
    margin-right: 10px;

    &:first-child {
      color: var(--kungalgame-red-5);
    }

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.definition {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;

  a {
    color: var(--kungalgame-blue-5);
    font-style: oblique;
  }

  p {
    margin-top: 10px;
  }
}
</style>
