<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <h2 class="help">
    <a
      href="https://www.kungal.com/zh-cn/topic/1042"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{{ $t('edit.galgame.help.name') }}</span>
      <Icon name="mingcute:external-link-line" />
    </a>
  </h2>

  <p>{{ $t('edit.galgame.help.reference') }}</p>

  <EditGalgameSite />

  <I18nEditHelpEN class="definition" v-if="locale === 'en-us'" />
  <I18nEditHelpJP class="definition" v-if="locale === 'ja-jp'" />
  <I18nEditHelpCN class="definition" v-if="locale === 'zh-cn'" />
  <I18nEditHelpTW class="definition" v-if="locale === 'zh-tw'" />
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

.note {
  color: var(--kungalgame-red-5);
}
</style>
