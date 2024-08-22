<script setup lang="ts">
const route = useRoute()
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
    <KunHeader :size="2">
      <template #header>
        {{ $t('galgame.link.name') }}
      </template>
    </KunHeader>

    <div class="galgames" v-if="data && !pending">
      <div class="galgame" v-for="(link, index) in data" :key="index">
        <NuxtLinkLocale :to="`/galgame/${link.gid}`" />
      </div>
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
  display: flex;
  flex-direction: column;

  .galgame {
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 17px;
    display: inline-block;

    & > a {
      margin-left: 10px;
      font-size: 20px;
      color: var(--kungalgame-font-color-0);

      &:hover {
        color: var(--kungalgame-blue-5);
      }
    }
  }
}
</style>
