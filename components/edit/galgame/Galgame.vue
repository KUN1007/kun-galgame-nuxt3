<script setup lang="ts">
import type { VNDB, VNDBResponse } from '../utils/VNDB'

const introductionLanguage = ref<Language>('zh-cn')
const isSuccess = ref(false)
const isFetching = ref(false)

const data = ref<VNDB>({
  title: '',
  titles: [],
  description: '',
  aliases: []
})

const { vndbId, name, introduction, aliases } = storeToRefs(
  usePersistEditGalgameStore()
)

const handleGetVNData = async () => {
  if (!VNDBPattern.test(vndbId.value)) {
    useMessage(10501, 'warn')
    return
  }

  const isDuplicate = await $fetch('/api/galgame/check', {
    method: 'GET',
    query: { vndbId: vndbId.value },
    ...kungalgameResponseHandler
  })
  if (!isDuplicate) {
    return
  }

  if (isFetching.value) {
    return
  } else {
    isFetching.value = true
    useMessage(10502, 'info')
  }

  const vndbData = await $fetch<VNDBResponse>(`https://api.vndb.org/kana/vn`, {
    method: 'POST',
    body: {
      filters: ['id', '=', vndbId.value],
      fields: 'title, titles.title, description, aliases'
    }
  })

  if (vndbData) {
    if (!vndbData.results.length) {
      isFetching.value = false
      useMessage(10503, 'error')
      return
    }

    isFetching.value = false
    useMessage(10504, 'info')

    data.value = vndbData.results[0]
    name.value['en-us'] = data.value.title
    introduction.value['en-us'] = data.value.description ?? ''
    aliases.value = data.value.aliases

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
    <EditGalgameHelp />

    <KunDivider margin="50px 0">
      <span class="divider">必要信息部分</span>
    </KunDivider>

    <KunHeader :size="2" :show-help="true">
      <template #header>VNDB 编号</template>

      <template #help>
        我们要求每一部游戏必须有 VNDB ID。VNDB ID 需要在页面上方的 VNDB 官网
        (vndb.org) 获取，当进入对应游戏的页面，游戏页面的 URL (形如
        https://vndb.org/v19658) 中的 v19658 就是 VNDB ID。输入 ID 后点击
        '获取数据'，会根据该 ID 尝试从 VNDB 获取游戏的标题和介绍 (均为英语)
      </template>
    </KunHeader>

    <div class="vndb">
      <KunInput v-model="vndbId" placeholder="例如: v19658" />
      <KunButton @click="handleGetVNData">获取数据</KunButton>
    </div>
    <p class="info">在您获取数据时，我们会自动为您检查该游戏是否重复</p>

    <EditGalgameTitle :titles="data.titles">
      <KunInput placeholder="英语" v-model="name['en-us']" />
      <KunInput placeholder="日语" v-model="name['ja-jp']" />
      <KunInput placeholder="简体中文" v-model="name['zh-cn']" />
      <KunInput placeholder="繁体中文" v-model="name['zh-tw']" />
    </EditGalgameTitle>

    <EditGalgameIntroduction
      :introduction-language="introductionLanguage"
      type="publish"
      :is-success="isSuccess"
      @set="(value) => (introductionLanguage = value as Language)"
    />

    <EditGalgameBanner />

    <EditGalgameFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 17px;
}

:deep(h2) {
  margin-bottom: 17px;

  .icon {
    font-size: large;
    margin-left: 10px;
  }
}

.divider {
  padding: 0 17px;
}

.vndb {
  display: flex;
  margin-bottom: 17px;

  input {
    margin-right: 17px;
  }
}

.info {
  color: var(--kungalgame-font-color-0);
  font-size: small;
  font-style: oblique;
  margin-bottom: 17px;
}

.titles {
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 7px;
  }
}
</style>
