<script setup lang="ts">
import { navItems } from './navItems'

defineProps<{ pageData: { limit: number; category: string } }>()
</script>

<template>
  <div class="tool">
    <KunNav
      class="nav"
      :items="navItems"
      :default-value="pageData.category"
      icon-size="20px"
      @set="(value) => (pageData.category = value)"
    />

    <div class="link">
      <NuxtLinkLocale to="/category">
        {{ $t('home.tool.topics') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/galgame">
        {{ $t('home.tool.resources') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .link {
    display: flex;
    align-items: center;

    a {
      margin-left: 10px;
      color: var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .tool {
    margin-bottom: 10px;
  }
}
</style>
