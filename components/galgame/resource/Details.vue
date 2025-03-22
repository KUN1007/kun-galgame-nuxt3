<script setup lang="ts">
import type { GalgameResourceDetails } from '~/types/api/galgame-resource'

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
    '您确定删除 Galgame 资源链接吗？',
    '这将会扣除您发布 Galgame 资源获得的 5 萌萌点，并且扣除其它人对资源链接的点赞影响（萌萌点和点赞数减一），此操作不可撤销。'
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
    '您确定报告资源链接失效吗？',
    '这将会通知资源发布者链接失效, 并将该链接标记为失效。若 17 天内资源发布者没有更换有效链接，该资源链接将会被删除。若恶意报告失效, 将会被处罚。'
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
  <div class="space-y-2" v-if="details">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <KunAvatar :user="details.user" />
        <span>{{ details.user.name }}</span>
        <span class="text-default-500 text-sm">
          {{ formatTimeDifference(details.time) }}
        </span>
      </div>

      <div class="space-x-1" v-if="details.user.uid === uid">
        <KunButton
          :is-icon-only="true"
          variant="light"
          @click="handleRewriteResource(details)"
        >
          <Icon class="icon" name="lucide:pencil" />
        </KunButton>
        <KunButton
          :is-icon-only="true"
          color="danger"
          variant="light"
          @click="handleDeleteResource(details.gid, details.grid)"
        >
          <Icon class="icon" name="lucide:trash-2" />
        </KunButton>
      </div>

      <div class="other-btn" v-if="uid !== details.user.uid && !details.status">
        <KunButton
          variant="flat"
          color="danger"
          @click="handleReportExpire(details)"
          :pending="isFetching"
        >
          报告链接过期
        </KunButton>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <KunCopy
        variant="flat"
        v-if="details.code"
        :name="`提取码 ${details.code}`"
        :text="details.code"
      />
      <KunCopy
        variant="flat"
        v-if="details.password"
        :name="`解压码 ${details.password}`"
        :text="details.password"
      />
    </div>

    <pre class="bg-default-100 rounded-lg p-3">{{ details.note }}</pre>

    <div class="space-y-2 space-x-2">
      <p class="text-default-500 text-sm">点击下面的链接以下载</p>
      <KunLink
        v-for="(kun, index) in details.link"
        :key="index"
        :to="kun"
        target="_blank"
        rel="noopener noreferrer"
        :is-show-anchor-icon="true"
      >
        {{ kun }}
      </KunLink>
    </div>
  </div>
</template>
