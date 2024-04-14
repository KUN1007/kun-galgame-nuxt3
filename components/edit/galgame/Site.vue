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
    url: 'https://www.dlsite.com/pro/',
    name: 'dlsite'
  },
  {
    url: 'https://www.wikipedia.org/',
    name: 'wikipedia'
  }
]
</script>

<template>
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
</template>

<style lang="scss" scoped>
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
</style>
