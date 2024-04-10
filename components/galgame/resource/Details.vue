<script setup lang="ts">
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

const { locale } = useI18n()

const { uid, moemoeAccessToken } = storeToRefs(usePersistUserStore())
const { resources, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)
const props = defineProps<{
  details: GalgameResourceDetails
  refresh: () => {}
}>()
const isFetching = ref(false)

const handleDeleteResource = async (gid: number, grid: number) => {
  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Are you sure you want to delete the visualnovel resource link?',
      'ja-jp': '',
      'zh-cn': '您确定删除 Galgame 资源链接吗？'
    },
    {
      'en-us':
        'This action will deduct 5 Moe Moe Points that you earned from publishing the visualnovel resource, and it will also negate the impact of likes from other users on the resource link (reducing both MoeMoePoints and likes count by one). This action cannot be undone.',
      'ja-jp': '',
      'zh-cn':
        '这将会扣除您发布 Galgame 资源获得的 5 萌萌点，并且扣除其它人对资源链接的点赞影响（萌萌点和点赞数减一），此操作不可撤销'
    }
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const { data } = await useFetch(`/api/galgame/${gid}/resource`, {
    method: 'DELETE',
    query: { grid },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (data.value) {
    props.refresh()
  }
}

const handleReportExpire = async (details: GalgameResourceDetails) => {
  if (!moemoeAccessToken) {
    useMessage(
      'Please login to report the resource link expired!',
      '请登录以报告资源链接失效!',
      'warn'
    )
    return
  }

  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Are you sure you want to report the resource link expired?',
      'ja-jp': '',
      'zh-cn': '您确定报告资源链接失效吗？'
    },
    {
      'en-us':
        "This will notify the resource publisher of the link's expiration and mark the link as invalid. If the resource publisher does not replace the link with a valid one within 17 days, the resource link will be deleted. Maliciously reporting expiration will result in punishment.",
      'ja-jp': '',
      'zh-cn':
        '这将会通知资源发布者链接失效, 并将该链接标记为失效。若 17 天内资源发布者没有更换有效链接，该资源链接将会被删除。若恶意报告失效, 将会被处罚'
    }
  )
  if (!res) {
    return
  }

  const { data } = await useFetch(
    `/api/galgame/${details.gid}/resource/expired`,
    {
      method: 'PUT',
      query: { grid: details.grid },
      ...kungalgameResponseHandler
    }
  )

  if (data.value) {
    const socket = useSocket()
    socket.emit('like', details.uid)
    useMessage('Report expired successfully!', '报告失效成功', 'success')
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
      <span class="link">
        <KunCopy :text="details.link" />
        <a :href="details.link" target="_blank" rel="noopener noreferrer">
          <Icon name="lucide:external-link" />
        </a>
      </span>

      <div class="password">
        <span>
          <span>提取码:</span>
          <KunCopy :text="details.code" />
        </span>
        <span>
          <span>解压码:</span>
          <KunCopy :text="details.password" />
        </span>
      </div>
    </div>

    <div class="note">{{ details.note }}</div>

    <div class="user">
      <div class="user-info">
        <KunAvatar :user="details.user" size="33px" />
        <span class="username">{{ details.user.name }}</span>
        <span class="time">
          {{ formatTimeDifferenceHint(details.time, locale) }}
        </span>
      </div>

      <div class="user-btn" v-if="details.user.uid === uid">
        <KunButton @click="handleRewriteResource(details)">编辑</KunButton>
        <KunButton
          type="danger"
          @click="handleDeleteResource(details.gid, details.grid)"
          :pending="isFetching"
        >
          删除
        </KunButton>
      </div>

      <div class="other-btn" v-if="details.user.uid !== uid && !details.status">
        <KunButton type="danger" @click="handleReportExpire(details)">
          报告失效
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
  font-size: small;
  margin-bottom: 10px;
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 10px;
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
    button:first-child {
      margin-right: 7px;
    }
  }
}
</style>
