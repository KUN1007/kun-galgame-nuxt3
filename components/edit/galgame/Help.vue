<script setup lang="ts">
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
  },
  {
    url: 'https://bangumi.tv/',
    name: 'bangumi'
  },
  {
    url: 'https://zh.moegirl.org.cn/Mainpage',
    name: 'moegirl'
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

  <p>{{ $t('edit.galgame.help.tip') }}</p>

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

  <div class="definition">
    <span>{{ $t('edit.galgame.help.definition') }}</span>
    <a href="http://" target="_blank" rel="noopener noreferrer">
      {{ $t('edit.galgame.help.how') }}
    </a>
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
  a {
    color: var(--kungalgame-blue-5);
    font-style: oblique;
  }
}
</style>
