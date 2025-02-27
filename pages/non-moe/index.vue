<script setup lang="ts">
useHead({
  title: `不萌记录 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        '鲲 Galgame 的用户违规记录, 这里记录了迄今为止所有被处罚的记录，希望大家不要这样做'
    }
  ]
})

const { page, limit } = useTempNonMoeStore()

const langClass = computed(() => {
  return locale.value === 'en-us' ? 'title-en' : 'title-cn'
})

const pageCount = ref(parseInt(page))

const { data: totalLength, status: totalStatus } = await useFetch(
  `/api/non-moe/total`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)

const { data: logs, status: listStatus } = await useFetch(`/api/non-moe/logs`, {
  method: 'GET',
  query: { page: pageCount, limit, language: locale.value },
  watch: [pageCount],
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title" :class="langClass">不萌记录</div>
      <div class="article">
        <div class="article-title">
          这里记录了迄今为止所有被处罚的记录，希望大家不要这样做
        </div>

        <div class="content" v-if="logs">
          <NonMoeLog v-if="logs.length" :logs="logs" />
          <span class="empty" v-if="!logs.length">暂无不萌记录</span>
          <KunPagination
            v-if="totalLength && totalLength > 4"
            :page="pageCount"
            :limit="parseInt(limit)"
            :sum="totalLength || 0"
            :status="listStatus || totalStatus"
            @set-page="(newPage) => (pageCount = newPage)"
          />
        </div>
      </div>
    </div>

    <KunFooter style="margin: 20px auto" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  min-height: 750px;
}

.container {
  height: 70vh;
  min-height: 600px;
  width: 100%;
  max-width: 48rem;
  margin: auto;
  overflow: hidden;
  display: flex;
  position: relative;
}

.title {
  font-size: 30px;
  padding: 30px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--kungalgame-font-color-2);
  letter-spacing: 1px;
}

.title-cn {
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.title-en {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  transform: rotate(180deg);
}

.article {
  width: 100%;
  background-color: var(--kungalgame-trans-white-5);
  border-left: 3px solid var(--kungalgame-red-5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-title {
  margin: 20px 0;
  padding: 0 20px;
  font-size: 20px;
}

.content {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow-y: scroll;
}

.empty {
  width: 100%;
  height: 100%;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 700px) {
  .root {
    height: calc(100vh - 63px);
    width: 95%;
    margin: 0 auto;
  }

  .container {
    flex-direction: column;
    height: 100%;
    width: 95%;
  }

  .title {
    width: 100%;
  }

  .title-cn {
    writing-mode: unset;
  }

  .title-en {
    writing-mode: unset;
    transform: rotate(0);
  }

  .article {
    height: 100%;
    border-left: none;
    border-top: 1px solid var(--kungalgame-blue-2);
  }
}
</style>
