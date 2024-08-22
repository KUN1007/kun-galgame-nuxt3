<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data, pending } = await useLazyFetch(
  `/api/galgame/${gid.value}/series`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="container">
    <KunHeader :size="2" :show-help="true">
      <template #header>
        {{ $t('galgame.series.name') }}
      </template>
      <template #help>
        {{ $t('galgame.series.help') }}
      </template>
    </KunHeader>

    <div class="galgames" v-if="data && !pending">
      <NuxtLinkLocale
        v-for="(link, index) in data"
        :key="index"
        :to="`/galgame/${link.gid}`"
      >
        {{ getPreferredLanguageText(link.name, locale as Language) }}
      </NuxtLinkLocale>
    </div>
    <KunSkeletonGalgameLink v-if="pending" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.galgames {
  margin-bottom: 17px;

  a {
    margin-right: 17px;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}
</style>
