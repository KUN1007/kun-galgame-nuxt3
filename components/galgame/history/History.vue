<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const { locale } = useI18n()

const { data } = await useFetch(`/api/galgame/${gid.value}/history/all`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <h2>贡献历史</h2>

  <div class="container" v-if="data">
    <div class="history" v-for="(history, index) in data" :key="index">
      <NuxtLinkLocale :to="`/kungalgamer/${history.user.uid}/info`">
        <KunAvatar :user="history.user" size="40px" />
      </NuxtLinkLocale>

      <div class="info">
        <div>
          <span>{{ history.user.name }}</span>
          <span>{{ history.action }}</span>
          <span>{{ history.type }}</span>
          <span class="time">
            {{ formatTimeDifferenceHint(history.time, locale) }}
          </span>
        </div>

        <div class="content" v-if="history.content">
          {{ history.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;
}

.history {
  display: flex;
  align-items: center;

  .info {
    span {
      margin-left: 7px;
    }

    .time {
      font-size: small;
      color: var(--kungalgame-font-color-0);
    }
  }

  .content {
    font-size: small;
    margin-left: 7px;
    margin-top: 5px;
    color: var(--kungalgame-font-color-0);
  }
}
</style>
