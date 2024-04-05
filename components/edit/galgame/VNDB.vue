<script setup lang="ts">
import { VNDBPattern } from '../utils/checkGalgamePublish'
import type { VNDB, VNDBResponse } from '../utils/VNDB'

const { locale } = useI18n()
const introductionLanguage = ref(locale.value as Language)
const isSuccess = ref(false)
const isFetching = ref(false)

const data = ref<VNDB>({
  title: '',
  titles: [],
  description: ''
})

const { vndbId, name, introduction } = storeToRefs(usePersistGalgameStore())

const handleGetVNData = async () => {
  if (!VNDBPattern.test(vndbId.value)) {
    useMessage(
      'Please enter the correct format of VNDB ID!',
      '请输入正确格式的 VNDB ID!',
      'warn'
    )
    return false
  }

  if (isFetching.value) {
    return
  } else {
    isFetching.value = true
    useMessage(
      'Fetching data from VNDB...',
      '正在从 VNDB 获取 Galgame 数据...',
      'info'
    )
  }

  const { data: vndbData } = await useFetch<VNDBResponse>(
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
    isFetching.value = false
    useMessage('Fetching data successfully!', '获取数据成功!', 'info')

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
    <EditGalgameHelp />

    <KunDivider margin="50px 0">
      <span class="divider">{{ $t('edit.galgame.essential') }}</span>
    </KunDivider>

    <KunHeader :size="2" :show-help="true">
      <template #header>{{ $t('edit.galgame.vndb.name') }}</template>

      <template #help>{{ $t('edit.galgame.vndb.help') }}</template>
    </KunHeader>

    <div class="vndb">
      <KunInput
        v-model="vndbId"
        :placeholder="$t('edit.galgame.vndb.placeholder')"
      />
      <KunButton @click="handleGetVNData">
        {{ $t('edit.galgame.vndb.fetch') }}
      </KunButton>
    </div>

    <EditGalgameTitle :titles="data.titles">
      <KunInput
        :placeholder="$t('edit.galgame.introduction.en-us')"
        v-model="name['en-us']"
      />
      <KunInput
        :placeholder="$t('edit.galgame.introduction.ja-jp')"
        v-model="name['ja-jp']"
      />
      <KunInput
        :placeholder="$t('edit.galgame.introduction.zh-cn')"
        v-model="name['zh-cn']"
      />
    </EditGalgameTitle>

    <EditGalgameIntroduction
      :introduction-language="introductionLanguage"
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
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  backdrop-filter: blur(10px);
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

.titles {
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 7px;
  }
}
</style>
../utils/VNDB
