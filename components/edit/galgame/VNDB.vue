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

const { vndb_id, name, banner, introduction } = storeToRefs(
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
    <EditGalgameHelp />

    <KunDivider margin="50px 0">
      <span class="divider">{{ $t('edit.galgame.essential') }}</span>
    </KunDivider>

    <h2>{{ $t('edit.galgame.vndb.name') }}</h2>

    <div class="vndb">
      <KunInput
        v-model="vndb_id"
        :placeholder="$t('edit.galgame.vndb.placeholder')"
      />
      <KunButton @click="handleGetVNData">
        {{ $t('edit.galgame.vndb.fetch') }}
      </KunButton>
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

    <EditGalgameBanner />

    <div class="confirm">
      <KunButton>{{ $t('edit.galgame.confirm') }}</KunButton>
    </div>
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

.confirm {
  width: 100%;
  margin-top: 50px;
  display: flex;

  button {
    height: 40px;
    width: 200px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 10px;
    margin-left: auto;

    &:hover {
      color: var(--kungalgame-white);
    }
  }
}
</style>
