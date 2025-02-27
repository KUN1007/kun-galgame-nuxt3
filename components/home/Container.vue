<script setup lang="ts">
const { fold } = storeToRefs(usePersistKUNGalgameHomeStore())
</script>

<template>
  <div class="bg-background flex justify-between gap-3 rounded-lg p-3">
    <div>
      <HomeTopicContainer v-if="fold.topics" />

      <KunHeader :size="2">
        <template #header>
          <div class="header">
            <span>最新 Galgame</span>
            <span class="suffix" @click="fold.galgames = !fold.galgames">
              {{ fold.galgames ? '折叠板块' : '展开板块' }}
            </span>
          </div>
        </template>
      </KunHeader>
      <HomeGalgameContainer v-if="fold.galgames" />

      <KunHeader :size="2">
        <template #header>
          <div class="header">
            <span>最新 Galgame 资源</span>
            <span class="suffix" @click="fold.resources = !fold.resources">
              {{ fold.resources ? '折叠板块' : '展开板块' }}
            </span>
          </div>
        </template>
      </KunHeader>
      <HomeResourceContainer v-if="fold.resources" />

      <KunHeader :size="2">
        <template #header>
          <div class="header">
            <span>站点地图</span>
            <span class="suffix" @click="fold.sitemaps = !fold.sitemaps">
              {{ fold.sitemaps ? '折叠板块' : '展开板块' }}
            </span>
          </div>
        </template>
      </KunHeader>
      <HomeSitemap v-if="fold.sitemaps" />

      <HomeFooter />
    </div>

    <HomeRecent v-if="fold.updates" />
  </div>
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
