<script setup lang="ts">
import type { VNDB, VNDBResponse } from './VNDB'

const { locale } = useI18n()
const introductionLanguage = ref(locale.value as Language)
const isSuccess = ref(false)

const data = ref<VNDB>({
  title: '',
  titles: [],
  description: ''
})

const { vndb_id, name, banner, introduction, official } = storeToRefs(
  usePersistGalgameStore()
)

const handleGetVNData = async () => {
  const { data: vndbData } = await useFetch<VNDBResponse>(
    `https://api.vndb.org/kana/vn`,
    {
      method: 'POST',
      body: {
        filters: ['id', '=', vndb_id.value],
        fields: 'title, titles.title, description'
      }
    }
  )
  if (vndbData.value) {
    data.value = vndbData.value.results[0]
    name.value['en-us'] = data.value.title
    introduction.value['en-us'] = data.value.description ?? ''

    // For reactivity
    if (introductionLanguage.value !== 'en-us') {
      introductionLanguage.value = 'en-us'
    } else {
      isSuccess.value = !isSuccess.value
    }
  }
}
</script>

<template>
  <div class="container">
    <h2>请输入 Galgame VNDB 编号</h2>

    <div class="vndb">
      <KunInput v-model="vndb_id" placeholder="例如: v19658" />
      <KunButton @click="handleGetVNData">获取数据</KunButton>
    </div>

    <EditGalgameTitle :titles="data.titles">
      <KunInput v-model="name['en-us']" />
      <KunInput v-model="name['ja-jp']" />
      <KunInput v-model="name['zh-cn']" />
    </EditGalgameTitle>

    <EditGalgameIntroduction
      :introduction-language="introductionLanguage"
      :is-success="isSuccess"
      @set="(value) => (introductionLanguage = value as Language)"
    />

    <EditGalgamePlatform />

    <h2>请选择 Galgame 的预览图</h2>
    <KunUpload width="300px" :aspect="16 / 9" />
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
