<script setup lang="ts">
const { fold } = storeToRefs(usePersistKUNGalgameHomeStore())
</script>

<template>
  <HomePinned />
  <KunDivider margin="10px" />

  <KunHeader :size="2">
    <template #header>
      <div class="header">
        <span>{{ $t('home.updates') }}</span>
        <span class="suffix" @click="fold.updates = !fold.updates">
          {{ $t(`home.${fold.updates ? 'foldSection' : 'expandSection'}`) }}
        </span>
      </div>
    </template>
  </KunHeader>
  <HomeRecent v-if="fold.updates" />

  <KunHeader :size="2">
    <template #header>
      <div class="header">
        <span>{{ $t('home.topics') }}</span>
        <span class="suffix" @click="fold.topics = !fold.topics">
          {{ $t(`home.${fold.topics ? 'foldSection' : 'expandSection'}`) }}
        </span>
      </div>
    </template>
  </KunHeader>
  <HomeTopicContainer v-if="fold.topics" />

  <KunHeader :size="2">
    <template #header>
      <div class="header">
        <span>{{ $t('home.galgames') }}</span>
        <span class="suffix" @click="fold.galgames = !fold.galgames">
          {{ $t(`home.${fold.galgames ? 'foldSection' : 'expandSection'}`) }}
        </span>
      </div>
    </template>
  </KunHeader>
  <HomeGalgameContainer v-if="fold.galgames" />

  <KunHeader :size="2">
    <template #header>
      <div class="header">
        <span>{{ $t('home.resources') }}</span>
        <span class="suffix" @click="fold.resources = !fold.resources">
          {{ $t(`home.${fold.resources ? 'foldSection' : 'expandSection'}`) }}
        </span>
      </div>
    </template>
  </KunHeader>
  <HomeResourceContainer v-if="fold.resources" />

  <KunHeader :size="2">
    <template #header>
      <div class="header">
        <span>{{ $t('home.sitemaps') }}</span>
        <span class="suffix" @click="fold.sitemaps = !fold.sitemaps">
          {{ $t(`home.${fold.sitemaps ? 'foldSection' : 'expandSection'}`) }}
        </span>
      </div>
    </template>
  </KunHeader>
  <HomeSitemap v-if="fold.sitemaps" />

  <HomeFooter />
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .suffix {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--kungalgame-font-color-1);

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }
}
</style>
