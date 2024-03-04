<script setup lang="ts"></script>

<template>
  <div class="footer">
    <div>{{ $t('footer.copyright') }}</div>

    <div>
      <span>{{ $t('footer.openSource') }}</span>

      <a
        href="http://github.com/KUN1007/kun-galgame-nuxt3"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="KUN Visual Novel Open Source GitHub Repository. 鲲 Galgame 开源 GitHub 仓库."
      >
        <Icon name="line-md:github-loop" />
      </a>
    </div>

    <div>
      <span>
        {{ $t('footer.reserved') }}
        {{ useRuntimeConfig().public.KUN_VISUAL_NOVEL_VERSION }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  letter-spacing: 1px;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      color: var(--kungalgame-blue-5);

      &:hover {
        transition: all 0.2s;
        transform: scale(1.5);
      }
    }
  }
}
</style>
