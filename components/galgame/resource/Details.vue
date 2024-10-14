<script setup lang="ts">
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

const { locale } = useI18n()

const { uid } = usePersistUserStore()
const { resources, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)
const props = defineProps<{
  details: GalgameResourceDetails
  refresh: () => void
}>()
const isFetching = ref(false)

const handleDeleteResource = async (gid: number, grid: number) => {
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to delete the visualnovel resource link?',
      'ja-jp': 'ギャルゲームのリソースリンクを削除してもよろしいですか？',
      'zh-cn': '您确定删除 Galgame 资源链接吗？',
      'zh-tw': '您確定刪除 Galgame 資源鏈接嗎？'
    },
    {
      'en-us':
        'This action will deduct 5 Moe Moe Points that you earned from publishing the visualnovel resource, and it will also negate the impact of likes from other users on the resource link (reducing both MoeMoePoints and likes count by one). This action cannot be undone.',
      'ja-jp':
        'この操作により、ギャルゲームリソースの公開で獲得した5モエモエポイントが差し引かれ、他のユーザーからの「いいね」の影響も無効になります（モエモエポイントと「いいね」の数が1つ減ります）。この操作は元に戻せません。',
      'zh-cn':
        '这将会扣除您发布 Galgame 资源获得的 5 萌萌点，并且扣除其它人对资源链接的点赞影响（萌萌点和点赞数减一），此操作不可撤销。',
      'zh-tw':
        '這將會扣除您發布 Galgame 資源獲得的 5 萌萌點，並扣除其他人對資源鏈接的點贊影響（萌萌點和點贊數減一），此操作不可撤銷。'
    }
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/resource`, {
    method: 'DELETE',
    query: { grid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    props.refresh()
  }
}

const handleReportExpire = async (details: GalgameResourceDetails) => {
  if (!uid) {
    useMessage(10546, 'warn')
    return
  }

  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to report the resource link expired?',
      'ja-jp': 'リソースリンクの期限切れを報告しますか？',
      'zh-cn': '您确定报告资源链接失效吗？',
      'zh-tw': '您確定報告資源鏈接失效嗎？'
    },
    {
      'en-us':
        "This will notify the resource publisher of the link's expiration and mark the link as invalid. If the resource publisher does not replace the link with a valid one within 17 days, the resource link will be deleted. Maliciously reporting expiration will result in punishment.",
      'ja-jp':
        'これにより、リソースの公開者にリンクの期限切れが通知され、リンクが無効としてマークされます。リソース公開者が17日以内に有効なリンクに置き換えない場合、そのリンクは削除されます。悪意のある期限切れ報告は罰則を受けます。',
      'zh-cn':
        '这将会通知资源发布者链接失效, 并将该链接标记为失效。若 17 天内资源发布者没有更换有效链接，该资源链接将会被删除。若恶意报告失效, 将会被处罚。',
      'zh-tw':
        '這將會通知資源發布者鏈接失效，並將該鏈接標記為失效。若 17 天內資源發布者沒有更換有效鏈接，該資源鏈接將會被刪除。惡意報告失效，將會被處罰。'
    }
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${details.gid}/resource/expired`, {
    method: 'PUT',
    query: { grid: details.grid },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    useMessage(10547, 'success')
    props.refresh()
  }
}

const handleRewriteResource = (details: GalgameResourceDetails) => {
  resources.value[0] = { ...details }
  rewriteResourceId.value = details.grid
}
</script>

<template>
  <div class="more" v-if="details">
    <div class="title">
      <span class="link" v-for="(kun, index) in details.link" :key="index">
        <KunCopy :text="decodeURI(kun)" />
        <a :href="kun" target="_blank" rel="noopener noreferrer">
          <Icon class="icon" name="lucide:external-link" />
        </a>
      </span>

      <div class="password">
        <span v-if="details.code">
          <span>{{ $t('galgame.resource.extract') }}: </span>
          <KunCopy :text="details.code" />
        </span>
        <span v-if="details.password">
          <span>{{ $t('galgame.resource.decompress') }}: </span>
          <KunCopy :text="details.password" />
        </span>
      </div>
    </div>

    <pre class="note">{{ details.note }}</pre>

    <div class="user">
      <div class="user-info">
        <KunAvatar :user="details.user" size="33px" />
        <span class="username">{{ details.user.name }}</span>
        <span class="time">
          {{ formatTimeDifference(details.time, locale) }}
        </span>
      </div>

      <div class="user-btn" v-if="details.user.uid === uid">
        <span class="rewrite" @click="handleRewriteResource(details)">
          <Icon class="icon" name="lucide:pencil" />
        </span>
        <span
          class="delete"
          @click="handleDeleteResource(details.gid, details.grid)"
        >
          <Icon class="icon" name="lucide:trash-2" />
        </span>
      </div>

      <div class="other-btn" v-if="uid !== details.user.uid && !details.status">
        <KunButton
          type="danger"
          @click="handleReportExpire(details)"
          :pending="isFetching"
        >
          {{ $t('galgame.resource.expire') }}
        </KunButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.more {
  margin-bottom: 10px;
}

.title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .link {
    cursor: pointer;
    margin-bottom: 10px;

    & > a {
      margin-left: 10px;
      font-size: 20px;
      color: var(--kungalgame-font-color-0);

      &:hover {
        color: var(--kungalgame-blue-5);
      }
    }
  }

  .password {
    margin-bottom: 10px;

    & > span {
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.note {
  margin: 0;
  margin-bottom: 10px;
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 10px;
  white-space: pre-wrap;
  word-break: break-all;
}

.user {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .user-info {
    display: flex;
    align-items: center;

    .username {
      margin: 0 10px;
    }

    .time {
      font-size: small;
    }
  }

  .user-btn {
    font-size: 17px;

    span {
      cursor: pointer;

      &:first-child {
        margin-right: 17px;
      }

      &:last-child {
        color: var(--kungalgame-red-5);
      }
    }
  }
}
</style>
