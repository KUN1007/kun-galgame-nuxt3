<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <footer>
    <div class="subsites">
      <a
        href="https://sticker.kungal.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('home.subsites.sticker') }}
      </a>
      <a
        href="https://nav.kungal.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('home.subsites.nav') }}
      </a>
      <a
        href="https://soft.moe/kun-visualnovel-docs/kun-forum.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('home.subsites.documentation') }}
      </a>
      <a
        :href="`https://www.kungal.org/${locale ? locale : ''}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('home.subsites.backup') }}
      </a>
    </div>

    <div class="copyright">
      <div>
        <a
          :href="`https://www.kungal.org/${locale ? locale : ''}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NuxtImg
            src="/favicon.webp"
            :aria-label="$t('head.title')"
            :alt="$t('head.title')"
          />
        </a>
        <span>{{ $t('home.copyright') }}</span>
      </div>

      <div>
        <span>
          <a
            href="https://github.com/KUN1007/kun-galgame-nuxt3"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {{ $t('home.openSource') }}
          {{ useRuntimeConfig().public.KUN_VISUAL_NOVEL_VERSION }}
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  color: var(--kungalgame-font-color-2);

  a {
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
    margin: 0 7px;
  }
}

.subsites {
  display: flex;
  justify-content: center;
  font-size: small;
  margin-bottom: 7px;
  margin-top: 50px;
}

.copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: small;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
  }
}
</style>
