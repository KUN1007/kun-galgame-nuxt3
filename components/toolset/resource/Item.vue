<script setup lang="ts">
import { updateToolsetResourceSchema } from '~/validations/toolset'
import { KUN_GALGAME_TOOLSET_STORAGE_MAP } from '~/constants/toolset'
import type {
  ToolsetResource,
  ToolsetResourceDetail
} from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
  resource: ToolsetResource
}>()

const emits = defineEmits<{
  deleted: [number]
  updated: [ToolsetResource]
}>()

const base = ref<ToolsetResource>(props.resource)
watch(
  () => props.resource,
  (v) => {
    base.value = v
  }
)

const detail = ref<ToolsetResourceDetail | null>(null)
const showing = ref(false)
const fetching = ref(false)

const isEditing = ref(false)
const isDeleting = ref(false)
const isSaving = ref(false)

const { id: uid, role } = usePersistUserStore()
const canManage = computed(() => {
  if (role >= 2) {
    return true
  }
  return detail.value ? detail.value.user.id === uid : false
})

const s3DisplaySize = computed(() => {
  if (base.value.type !== 's3') {
    return base.value.size
  } else {
    return formatFileSize(Number(base.value.size))
  }
})

const links = computed(() => {
  if (!detail.value) {
    return []
  }

  if (detail.value.type === 'user') {
    return detail.value.content
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  return [`${kungal.domain.oss}/${detail.value.content}`]
})

const formData = reactive({
  toolsetResourceId: base.value.id,
  size: base.value.type === 's3' ? s3DisplaySize.value : base.value.size || '',
  code: '',
  password: '',
  note: '',
  content: ''
})

const fetchResourceDetail = async () => {
  if (detail.value) {
    return
  }

  fetching.value = true
  const res = await $fetch(`/api/toolset/${props.toolsetId}/resource/detail`, {
    method: 'GET',
    query: { toolsetResourceId: base.value.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  fetching.value = false
  if (res) {
    detail.value = res
    formData.toolsetResourceId = res.id
    formData.size =
      base.value.type === 's3' ? s3DisplaySize.value : res.size || ''
    formData.code = res.code || ''
    formData.password = res.password || ''
    formData.note = res.note || ''
    formData.content = base.value.type === 'user' ? res.content || '' : ''
  }
}

const toggleShow = async () => {
  if (!showing.value) {
    await fetchResourceDetail()
  }
  showing.value = !showing.value
}

const handleDelete = async () => {
  if (!canManage.value) {
    useMessage('您没有权限删除该工具资源', 'warn')
    return
  }
  const okConfirm = await useComponentMessageStore().alert(
    '确定删除该工具资源吗？',
    `删除资源将会消耗您 3 萌萌点, 资源将会永久删除, 不可恢复`
  )
  if (!okConfirm) {
    return
  }

  isDeleting.value = true
  const res = await $fetch(`/api/toolset/${props.toolsetId}/resource`, {
    method: 'DELETE',
    query: { toolsetResourceId: base.value.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  isDeleting.value = false
  if (res) {
    useMessage('删除成功', 'success')
    emits('deleted', base.value.id)
  }
}

const handleSave = async () => {
  const body = {
    toolsetResourceId: base.value.id,
    size: formData.size,
    code: formData.code,
    password: formData.password,
    note: formData.note,
    content: base.value.type === 'user' ? formData.content : ''
  }
  const valid = useKunSchemaValidator(updateToolsetResourceSchema, body)
  if (!valid) {
    return
  }

  isSaving.value = true
  const res = await $fetch(`/api/toolset/${props.toolsetId}/resource`, {
    method: 'PUT',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })
  isSaving.value = false
  if (res) {
    base.value = res
    emits('updated', res)
    if (detail.value) {
      detail.value.size = body.size
      detail.value.code = body.code
      detail.value.password = body.password
      detail.value.note = body.note
      if (base.value.type === 'user') {
        detail.value.content = body.content
      }
    }
    useMessage('更新成功', 'success')
    isEditing.value = false
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <KunBadge size="sm" color="secondary">
          {{ KUN_GALGAME_TOOLSET_STORAGE_MAP[base.type] }}
        </KunBadge>
        <KunBadge size="sm" color="warning">
          <KunIcon name="lucide:database" />
          <template v-if="base.type === 's3'">
            {{ s3DisplaySize }}
          </template>
          <template v-else>
            {{ base.size }}
          </template>
        </KunBadge>
        <KunBadge size="sm" color="primary">
          <KunIcon name="lucide:download" />
          <span>{{ `${base.download} 人下载` }}</span>
        </KunBadge>

        <KunTooltip :text="base.status ? '资源已失效' : '资源有效'">
          <div
            :class="
              cn(
                'h-3 w-3 shrink-0 rounded-full',
                base.status ? 'bg-danger' : 'bg-success'
              )
            "
          />
        </KunTooltip>
      </div>

      <div class="ml-auto flex items-center gap-1">
        <KunButton
          size="sm"
          variant="flat"
          :loading="fetching"
          @click="toggleShow"
        >
          {{ showing ? '隐藏链接' : '获取链接' }}
        </KunButton>

        <KunButton
          v-if="role >= 2 || (detail && canManage)"
          :is-icon-only="true"
          variant="light"
          @click="isEditing = true"
        >
          <KunIcon name="lucide:pencil" />
        </KunButton>
        <KunButton
          v-if="role >= 2 || (detail && canManage)"
          :is-icon-only="true"
          color="danger"
          variant="light"
          :loading="isDeleting"
          @click="handleDelete"
        >
          <KunIcon name="lucide:trash-2" />
        </KunButton>
      </div>
    </div>

    <div v-if="showing && detail" class="space-y-2">
      <div class="flex items-center gap-2">
        <KunAvatar :user="detail.user" />
        <span>{{ detail.user.name }}</span>
        <span class="text-default-500 text-sm">
          {{ formatTimeDifference(detail.created) }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <KunCopy
          v-if="detail.code"
          variant="flat"
          :name="`提取码 ${detail.code}`"
          :text="detail.code"
        />
        <KunCopy
          v-if="detail.password"
          variant="flat"
          :name="`解压码 ${detail.password}`"
          :text="detail.password"
        />
      </div>

      <KunInfo v-if="detail.note" color="info" title="下载备注信息">
        <pre class="font-sans break-all whitespace-pre-line">
          {{ detail.note }}
        </pre>
      </KunInfo>

      <div v-if="links.length" class="space-y-2 space-x-2">
        <p class="text-default-500 text-sm">点击下面的链接以下载</p>
        <KunLink
          v-for="(link, i) in links"
          :key="i"
          :to="link"
          target="_blank"
          rel="noopener noreferrer"
          :is-show-anchor-icon="true"
        >
          {{ link }}
        </KunLink>
      </div>
    </div>

    <KunCard
      :is-pressable="false"
      :is-hoverable="false"
      :is-transparent="true"
      v-if="isEditing && detail"
      content-class="space-y-3 rounded-lg"
    >
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <KunInput
          v-if="base.type === 'user'"
          v-model="formData.size"
          placeholder="资源大小 (如 1007MB, 0721GB)"
        />
        <KunInput
          v-if="base.type === 'user'"
          v-model="formData.code"
          placeholder="资源提取码 (可选)"
        />
        <KunInput v-model="formData.password" placeholder="资源解压码 (可选)" />
      </div>
      <KunTextarea
        v-model="formData.note"
        placeholder="资源备注 (可选, 建议您写明资源的使用方法和注意事项)"
      />
      <KunTextarea
        v-if="base.type === 'user'"
        v-model="formData.content"
        placeholder="资源链接, 如果有多个资源链接, 请使用英语逗号分割每一个链接"
      />

      <div class="flex justify-end gap-2">
        <KunButton variant="light" color="danger" @click="isEditing = false">
          取消
        </KunButton>
        <KunButton :loading="isSaving" :disabled="isSaving" @click="handleSave">
          保存
        </KunButton>
      </div>
    </KunCard>

    <KunDivider margin="0 0 14px 0" />
  </div>
</template>
