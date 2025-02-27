<script setup lang="ts">
const siteList = [
  { name: '补丁', href: kungal.domain.patch },
  { name: '表情包', href: kungal.domain.sticker },
  { name: '导航网站', href: kungal.domain.nav },
  { name: '开发文档', href: kungal.domain.doc }
]
</script>

<template>
  <footer>
    <div class="subsites">
      <a
        v-for="(site, index) in siteList"
        :key="index"
        :href="site.href"
        target="_blank"
      >
        {{ site.name }}
      </a>
    </div>

    <div class="copyright">
      <div>
        <a :href="kungal.domain.main" target="_blank">
          <NuxtImg
            src="/favicon.webp"
            :aria-label="kungal.titleShort"
            :alt="kungal.titleShort"
          />
        </a>
        <span>{{ `© 2024 ${kungal.titleShort}` }}</span>
      </div>

      <span>
        <a :href="kungal.github" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {{
          `开源 | 版本 ${useRuntimeConfig().public.KUN_VISUAL_NOVEL_VERSION}`
        }}
      </span>
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
