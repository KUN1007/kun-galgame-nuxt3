<script setup lang="ts">
const { page, limit, sortOrder } = storeToRefs(usePersistGalgameStore())

const { locale } = useI18n()

const { data, pending } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: { page, limit, sortOrder },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="container">
    <div class="card-container">
      <NuxtLinkLocale
        class="card"
        v-for="(gal, index) in data?.galgames"
        :key="index"
        :to="`/galgame/${gal.gid}`"
      >
        <div class="banner">
          <NuxtImg :src="gal.banner.replace(/\.webp$/, '-mini.webp')" />
          <div class="mask">
            <span>
              <Icon name="lucide:mouse-pointer-click" />
              <span>{{ gal.views }}</span>
            </span>

            <span>
              <Icon name="lucide:thumbs-up" />
              <span>{{ gal.likes }}</span>
            </span>
          </div>
        </div>

        <div class="title">
          {{ getPreferredLanguageText(gal.name, locale as Language) }}
        </div>

        <div class="publisher">
          <KunAvatar :user="gal.user" size="30px" />
          <span class="name">{{ gal.user.name }}</span>
          <span class="time">
            {{ formatTimeDifference(gal.time, locale) }}
          </span>
        </div>
      </NuxtLinkLocale>
    </div>

    <KunPagination
      class="pagination"
      v-if="data?.totalCount"
      :page="parseInt(page)"
      :limit="parseInt(limit)"
      :sum="data?.totalCount"
      :loading="pending"
      @set-page="(newPage) => (page = newPage.toString())"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
  padding: 17px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);
}

.banner {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    transition: transform 0.5s;
  }

  .mask {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    background: linear-gradient(transparent, var(--kungalgame-font-color-3));
    color: var(--kungalgame-white);
    padding: 0 7px;
    padding-bottom: 3px;
    display: flex;

    & > span {
      display: flex;
      align-items: center;
      margin-right: 7px;

      .icon {
        margin-right: 3px;
      }
    }
  }
}

.card:hover .banner {
  img {
    transform: scale(1.07);
  }
}

.title {
  color: var(--kungalgame-blue-5);
  font-weight: bold;
  margin: 7px 0;
}

.publisher {
  display: flex;
  align-items: center;

  .name {
    margin: 0 7px;
  }

  .time {
    color: var(--kungalgame-font-color-0);
    font-size: small;
  }
}
</style>
