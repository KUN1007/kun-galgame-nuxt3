<script setup lang="ts">
import { typeIconMap, platformIconMap } from '../utils/iconMap'
import type {
  GalgameResource,
  GalgameResourceDetails
} from '~/types/api/galgame-resource'

const props = defineProps<{
  link: GalgameResource
  refresh: () => void
}>()

const details = ref<GalgameResourceDetails>()
const { uid } = usePersistUserStore()
const { rewriteResourceId } = storeToRefs(useTempGalgameResourceStore())
const isFetching = ref(false)

const handleGetDetail = async (grid: number) => {
  if (details.value) {
    return
  }
  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.link.gid}/resource`, {
    query: { grid },
    method: 'GET',
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    details.value = result
  }
}

const handleMarkValid = async (gid: number, grid: number) => {
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to re-mark the resource link as valid?',
      'ja-jp': 'リソースリンクを有効として再マークしますか？',
      'zh-cn': '您确定重新标记资源链接有效吗？',
      'zh-tw': '您確定重新標記資源鏈接有效嗎？'
    },
    {
      'en-us':
        'If you have fixed the resource links, you can re-mark the resource links as valid.',
      'ja-jp':
        'リソースリンクを修正した場合、リンクを有効として再マークできます。',
      'zh-cn': '若您修复了资源链接，您可以重新标记资源链接有效。',
      'zh-tw': '若您修復了資源鏈接，您可以重新標記資源鏈接有效。'
    }
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/resource/valid`, {
    method: 'PUT',
    query: { grid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(10548, 'success')
    props.refresh()
  }
}

watch(
  () => [rewriteResourceId.value, props.link],
  () => {
    details.value = undefined
  }
)
</script>

<template>
  <div class="link">
    <div class="base">
      <div class="info">
        <span class="rewrite" v-if="link.grid === rewriteResourceId">
          <Icon class="icon" name="svg-spinners:12-dots-scale-rotate" />
          <span>{{ $t('galgame.resource.edit') }}</span>
        </span>
        <span>
          <Icon class="icon" :name="typeIconMap[link.type]" />
          <span>{{ $t(`galgame.resource.type.${link.type}`) }}</span>
        </span>
        <span>
          <Icon class="icon" name="lucide:database" />
          <span>{{ link.size }}</span>
        </span>
        <span>
          <Icon class="icon" :name="platformIconMap[link.platform]" />
          <span>{{ $t(`galgame.resource.platform.${link.platform}`) }}</span>
        </span>
        <span>
          {{ $t(`galgame.resource.language.${link.language}`) }}
        </span>
      </div>

      <div class="status">
        <span v-if="details" class="close" @click="details = undefined">
          <Icon class="icon" name="lucide:x" />
        </span>

        <KunButton
          class="valid"
          v-if="uid === link.uid && link.status === 1"
          @click="handleMarkValid(link.gid, link.grid)"
          :pending="isFetching"
        >
          {{ $t('galgame.resource.valid') }}
        </KunButton>
        <KunButton
          v-if="!details && link.grid !== rewriteResourceId"
          @click="handleGetDetail(link.grid)"
          :pending="isFetching"
        >
          {{ $t('galgame.resource.fetch') }}
        </KunButton>

        <GalgameResourceLike
          v-if="uid !== link.uid"
          :gid="link.gid"
          :grid="link.grid"
          :to-uid="link.uid"
          :likes="link.likes"
          v-tooltip="{
            message: {
              'en-us': 'Like',
              'ja-jp': 'いいね',
              'zh-cn': '点赞',
              'zh-tw': '點贊'
            },
            position: 'bottom'
          }"
        />

        <NuxtLinkLocale
          v-if="uid !== link.uid"
          to="/report"
          v-tooltip="{
            message: {
              'en-us': 'Report violation',
              'ja-jp': '違反の報告',
              'zh-cn': '举报违规',
              'zh-tw': '舉報違規'
            },
            position: 'bottom'
          }"
        >
          <Icon class="icon" name="lucide:triangle-alert" />
        </NuxtLinkLocale>

        <span
          class="status-dot"
          :class="`status-${link.status}`"
          v-tooltip="{
            message: {
              'en-us': link.status ? 'Link expired' : 'Link valid',
              'ja-jp': link.status
                ? 'リンクが期限切れです'
                : 'リンクは有効です',
              'zh-cn': link.status ? '链接过期' : '链接有效',
              'zh-tw': link.status ? '鏈接過期' : '鏈接有效'
            },
            position: 'bottom'
          }"
        ></span>
      </div>
    </div>

    <GalgameResourceDetails
      v-if="details"
      :details="details"
      :refresh="refresh"
    />

    <KunDivider margin="0 0 17px 0" />
  </div>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-bottom: 10px;

  & > span {
    padding: 3px 7px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: medium;
    margin-right: 5px;
  }

  .rewrite {
    user-select: none;
    color: var(--kungalgame-red-5);
  }
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: auto;

  & > span,
  a {
    color: var(--kungalgame-font-color-3);
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .kun-button {
    margin-right: 17px;
    padding: 3px 10px;
  }

  .close {
    cursor: pointer;
    margin-right: 17px;
    font-size: 20px;
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-0 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-green-4);
  border-radius: 50%;
}

.status-1 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-red-4);
  border-radius: 50%;
}
</style>
