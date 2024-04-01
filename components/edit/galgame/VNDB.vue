<script setup lang="ts">
import type { VNDB, VNDBResponse } from './VNDB'

const vndbId = ref('')
const data = ref<VNDB>({
  title: '',
  titles: [],
  description: ''
})

const { vndb_id, name, banner, introduction, platform, official } = storeToRefs(
  usePersistGalgameStore()
)

const handleGetVNData = async () => {
  const { data: vndbData, pending } = await useFetch<VNDBResponse>(
    `https://api.vndb.org/kana/vn`,
    {
      method: 'POST',
      body: {
        filters: ['id', '=', vndbId.value],
        fields: 'title, titles.title, description'
      }
    }
  )
  if (vndbData.value) {
    data.value = vndbData.value.results[0]
    name.value.en_us = vndbData.value.results[0].title
  }
}
</script>

<template>
  <div class="container">
    <h2>请输入 VNDB 编号</h2>

    <div class="vndb">
      <KunInput v-model="vndbId" placeholder="例如: v19658" />
      <KunButton @click="handleGetVNData">获取数据</KunButton>
    </div>

    <EditGalgameTitle :titles="data.titles">
      <KunInput v-model="name.ja_jp" />
      <KunInput v-model="name.en_us" />
      <KunInput v-model="name.zh_cn" />
    </EditGalgameTitle>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  backdrop-filter: blur(10px);
  padding: 17px;
}

h2 {
  margin-bottom: 17px;
}

.vndb {
  display: flex;
  margin-bottom: 17px;

  input {
    margin-right: 17px;
  }
}

.titles {
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 7px;
  }
}
</style>
