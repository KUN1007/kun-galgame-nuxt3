<script setup lang="ts">
import { USER_DAILY_UPLOAD_LIMIT } from '~/config/upload'
import type {
  ToolsetUploadCompleteResponse,
  ToolsetResource
} from '~/types/api/toolset'

const props = defineProps<{
  toolsetId: number
}>()

const emits = defineEmits<{
  onClose: []
  onSuccess: [ToolsetResource]
}>()

const { moemoepoint, dailyToolsetUploadCount } = storeToRefs(
  usePersistUserStore()
)

const MB = 1024 * 1024

const mode = ref<'s3' | 'user'>('s3')
const uploadResult = ref<ToolsetUploadCompleteResponse>({
  salt: '',
  key: '',
  filesize: 0,
  dailyToolsetUploadCount: 0
})

const handleUploadSuccess = (value: ToolsetUploadCompleteResponse) => {
  uploadResult.value = value
  dailyToolsetUploadCount.value = value.dailyToolsetUploadCount
}
</script>

<template>
  <div class="max-w-2xl space-y-3">
    <h3 class="mb-3 text-lg font-semibold">发布资源</h3>

    <KunLink to="/doc/notice/create-galgame-toolset">
      发布 Galgame 工具下载资源规定
    </KunLink>

    <div class="flex flex-col gap-1">
      <p class="text-default-700 text-sm">
        您今日已使用存储量
        {{
          `${(dailyToolsetUploadCount / MB).toFixed(3)} / ${USER_DAILY_UPLOAD_LIMIT / MB + moemoepoint} MB`
        }}
      </p>
      <KunProgress
        :value="Math.floor(dailyToolsetUploadCount / USER_DAILY_UPLOAD_LIMIT)"
        :show-label="true"
        size="lg"
      />
    </div>

    <KunInfo title="注意事项简要说明" color="info">
      <div class="flex flex-col gap-2">
        <p class="font-bold">
          1. 禁止在此页面上传游戏资源, 违规直接永久封禁账号
        </p>
        <p>2. 第一次发布资源前请对自己的设备查毒, 以免大量用户感染病毒</p>
        <p>3. 请注意工具资源的所有权, 作者明确禁止转载的资源请勿上传</p>
        <p>
          4. 发布一个工具资源您将获得 3 萌萌点, 删除一个工具将会扣除 3 萌萌点
        </p>
        <p>5. 每名用户每天有 (100 + 您的萌萌点数) MB 的上传额度, 每天会重置</p>
        <p>6. 每名用户的最大上传文件大小为 2GB</p>
        <p>7. 上传速度完全取决于您的网络情况, 网络不佳请使用代理</p>
      </div>
    </KunInfo>

    <div class="z-10 space-y-4">
      <div class="flex items-center gap-6">
        <KunCheckBox
          type="single"
          :model-value="mode === 's3'"
          label="对象存储 (S3)"
          @change="() => (mode = 's3')"
        />
        <KunCheckBox
          type="single"
          :model-value="mode === 'user'"
          label="自定义链接"
          @change="() => (mode = 'user')"
        />
      </div>

      <ToolsetResourceUpload
        v-if="mode === 's3'"
        :toolset-id="props.toolsetId"
        @on-close="emits('onClose')"
        @on-upload-success="handleUploadSuccess"
      />

      <ToolsetResourceLinkForm
        :toolset-id="props.toolsetId"
        :type="mode"
        :upload-result="uploadResult"
        @on-close="emits('onClose')"
        @on-success="(value) => emits('onSuccess', value)"
      />
    </div>
  </div>
</template>
