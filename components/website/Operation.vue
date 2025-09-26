<script setup lang="ts">
import type { WebsiteDetail } from '~/types/api/website'
import type { CreateWebsitePayload, UpdateWebsitePayload } from './modal/types'

const props = defineProps<{
  website: WebsiteDetail
}>()

const emits = defineEmits<{
  refresh: []
}>()

type WebsiteData = (CreateWebsitePayload & { websiteId?: number }) | undefined

const { id, role } = usePersistUserStore()

const isLiked = ref(id && props.website.isLiked)
const likeCount = ref(props.website.likeCount)
const isFavorited = ref(id && props.website.isFavorited)
const favoriteCount = ref(props.website.favoriteCount)
type ActionType = 'like' | 'favorite' | 'update' | 'delete'
const loadingStates = reactive<Record<ActionType, boolean>>({
  like: false,
  favorite: false,
  update: false,
  delete: false
})

const showWebsiteModal = ref(false)
const editingWebsite = ref<WebsiteData>(undefined)

const toggleLike = () =>
  handleAction('like', async () => {
    const result = await $fetch(`/api/website/${props.website.id}/like`, {
      method: 'PUT',
      watch: false,
      body: { websiteId: props.website.id },
      ...kungalgameResponseHandler
    })

    if (result) {
      likeCount.value += isLiked.value ? -1 : 1
      useMessage(isLiked.value ? '取消点赞成功!' : '点赞网站成功!', 'success')
      isLiked.value = !isLiked.value
    }
  })

const toggleFavorite = () =>
  handleAction('favorite', async () => {
    const result = await $fetch(`/api/website/${props.website.id}/favorite`, {
      method: 'PUT',
      watch: false,
      body: { websiteId: props.website.id },
      ...kungalgameResponseHandler
    })

    if (result) {
      favoriteCount.value += isFavorited.value ? -1 : 1
      useMessage(
        isFavorited.value ? '取消收藏成功!' : '收藏网站成功!',
        'success'
      )
      isFavorited.value = !isFavorited.value
    }
  })

const handleOpenUpdateModal = () => {
  const { ageLimit, category, tags, createTime, language, ...rest } =
    props.website
  editingWebsite.value = {
    ...rest,
    language: language as keyof KunLanguage,
    tag_ids: tags.map((t) => t.id),
    category_id: category.id,
    age_limit: ageLimit,
    create_time: createTime,
    websiteId: props.website.id
  }
  showWebsiteModal.value = true
}

const handleUpdate = (data: CreateWebsitePayload | UpdateWebsitePayload) =>
  handleAction('update', async () => {
    const result = await $fetch(`/api/website/${props.website.id}`, {
      method: 'PUT',
      watch: false,
      body: data,
      ...kungalgameResponseHandler
    })

    if (result) {
      useMessage('重新编辑成功', 'success')
      emits('refresh')
    }
  })

const handleDelete = () =>
  handleAction('delete', async () => {
    const res = await useComponentMessageStore().alert(
      '您确定删除这个网站吗？',
      '这将会删除这个网站的所有信息, 该操作不可撤销'
    )
    if (!res) {
      return
    }

    const result = await $fetch(`/api/website/${props.website.id}`, {
      method: 'DELETE',
      watch: false,
      query: { websiteId: props.website.id },
      ...kungalgameResponseHandler
    })

    if (result) {
      useMessage('删除网站成功', 'success')
      await navigateTo('/website')
    }
  })

const handleAction = async (
  actionType: ActionType,
  action: () => Promise<void>
) => {
  if (loadingStates[actionType]) {
    return
  }

  if (!id) {
    useMessage('请登陆后再进行操作', 'warn', 5000)
    return
  }

  loadingStates[actionType] = true
  await action()
  loadingStates[actionType] = false
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <KunTooltip text="点赞">
      <KunButton
        :is-icon-only="true"
        :color="isLiked ? 'secondary' : 'default'"
        :size="likeCount ? 'md' : 'lg'"
        :variant="isLiked ? 'flat' : 'light'"
        class-name="gap-1"
        @click="toggleLike"
      >
        <KunIcon name="lucide:thumbs-up" />
        <span v-if="likeCount">{{ likeCount }}</span>
      </KunButton>
    </KunTooltip>

    <KunTooltip text="收藏">
      <KunButton
        :is-icon-only="true"
        :color="isFavorited ? 'secondary' : 'default'"
        :size="favoriteCount ? 'md' : 'lg'"
        :variant="isFavorited ? 'flat' : 'light'"
        class-name="gap-1"
        @click="toggleFavorite"
      >
        <KunIcon name="lucide:heart" />
        <span v-if="favoriteCount">{{ favoriteCount }}</span>
      </KunButton>
    </KunTooltip>

    <KunTooltip v-if="role > 2" text="编辑">
      <KunButton
        :is-icon-only="true"
        size="lg"
        variant="light"
        class-name="gap-1"
        @click="handleOpenUpdateModal"
      >
        <KunIcon name="lucide:pen" />
      </KunButton>
    </KunTooltip>

    <WebsiteModalWebsite
      v-model="showWebsiteModal"
      :initial-data="editingWebsite"
      @submit="handleUpdate"
    />

    <KunTooltip v-if="role > 2" text="删除">
      <KunButton
        :is-icon-only="true"
        size="lg"
        color="danger"
        variant="light"
        class-name="gap-1"
        @click="handleDelete"
      >
        <KunIcon name="lucide:trash-2" />
      </KunButton>
    </KunTooltip>

    <KunButton
      target="_blank"
      :href="`https://${website.url}`"
      class-name="ml-auto"
    >
      访问网站
    </KunButton>
  </div>
</template>
