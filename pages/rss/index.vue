<script setup lang="ts">
useHead({
  title: `${t('seo.rss.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.rss.description')
    }
  ]
})

const getLink = (link: 'galgame' | 'topic') =>
  `${useRuntimeConfig().public.KUN_GALGAME_URL}/rss/${link}.xml`
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">
        <div class="rss-icon">
          <Icon class="icon" name="lucide:rss" />
        </div>

        <div class="language">
          <span>{{ $t('rss.select') }}</span>
          <KunSelect
            :options="availableLocales"
            :default-value="locale"
            :styles="{ width: '110px' }"
            i18n="rss.language"
            @set="(newVal) => (rssLocale = newVal)"
            position="bottom"
          >
            {{ $t(`rss.language.${rssLocale}`) }}
          </KunSelect>
        </div>
      </div>

      <div class="subscribe">
        <div class="card-container">
          <a
            :href="getLink('topic')"
            class="card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Icon class="icon" name="lucide:square-library" />
            </span>
            <span class="name">{{ $t('rss.topic') }}</span>
          </a>

          <KunCopy
            :text="getLink('topic')"
            :name="$t('rss.copy')"
            v-tooltip="{
              message: `${getLink('topic').slice(0, 30)}...`,
              position: 'bottom'
            }"
          />
        </div>
        <div class="card-container">
          <a
            :href="getLink('galgame')"
            class="card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Icon class="icon" name="lucide:gamepad-2" />
            </span>
            <span class="name">{{ $t('rss.galgame') }}</span>
          </a>

          <KunCopy
            :text="getLink('galgame')"
            :name="$t('rss.copy')"
            v-tooltip="{
              message: `${getLink('galgame').slice(0, 30)}...`,
              position: 'bottom'
            }"
          />
        </div>
      </div>

      <p class="hint">{{ $t('rss.update') }}</p>

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>

    <KunFooter
      style="position: absolute; bottom: 20px; width: 100%; margin: 0 auto"
    />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  width: 100vw;
  min-height: 300px;
  display: flex;
}

.container {
  position: relative;
  width: 400px;
  height: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include kun-blur;
}

.title {
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;

  .rss-icon {
    font-size: 36px;
    color: var(--kungalgame-blue-5);
    cursor: pointer;
    text-align: center;
    transition: 0.2s;

    &:hover {
      color: var(--kungalgame-red-4);
      transform: scale(1.2);
    }
  }

  .language {
    display: flex;
    margin-left: 17px;
    align-items: center;

    span {
      margin-right: 10px;
    }
  }
}

.subscribe {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 17px;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    color: var(--kungalgame-font-color-3);
    cursor: pointer;

    .name {
      white-space: nowrap;
    }

    .icon {
      font-size: 30px;
      margin-bottom: 10px;
      color: var(--kungalgame-blue-5);
      text-align: center;
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: var(--shadow);
    }
  }
}

.hint {
  display: flex;
  justify-content: flex-end;
  font-size: small;
  font-style: oblique;
  user-select: none;
  color: var(--kungalgame-font-color-0);
  margin-top: 17px;
}

.nav {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .root {
    height: calc(100dvh - 63px);
  }

  .container {
    width: 95%;
  }

  .kungalgame {
    font-size: 50px;
  }
}
</style>
