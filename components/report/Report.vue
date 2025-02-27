<script setup lang="ts">
import { KUN_REPORT_SECTION_MAP } from '~/constants/report'
import { usePersistUserStore } from '~/store/modules/kungalgamer'
import { reportSection } from './constant'

useHead({
  title: '匿名举报',
  meta: [
    {
      name: 'description',
      content: t('seo.report.description')
    }
  ]
})

const reason = ref('')
const selectReportType = ref('topic')
const { moemoeAccessToken } = usePersistUserStore()
const isFetching = ref(false)

const handleSubmitReport = async () => {
  if (!moemoeAccessToken) {
    useMessage(10142, 'warn')
    return
  }

  if (!reason.value.trim()) {
    useMessage(10143, 'warn')
    return
  }

  if (reason.value.trim().length > 1007) {
    useMessage(10144, 'warn')
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/report/submit`, {
    method: 'POST',
    body: {
      type: selectReportType.value,
      reason: reason.value
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    useMessage(10145, 'success')
    reason.value = ''
  }
}
</script>

<template>
  <div class="container">
    <div class="select-container">
      <span class="title">举报类型</span>

      <KunSelect
        :styles="{ width: '180px' }"
        :options="reportSection"
        default-value="topic"
        i18n="report.select.section"
        @set="(value) => (selectReportType = value)"
        position="bottom"
      >
        <span>{{ KUN_REPORT_SECTION_MAP[selectReportType] }}</span>
      </KunSelect>
    </div>

    <div>
      <span class="title">举报理由</span>
      <KunTextarea
        name="comment"
        placeholder="填写具体的违规内容，更容易举报成功哦"
        rows="10"
        v-model="reason"
      />

      <div class="note">
        该举报是完全匿名的, 在管理端以及数据库中不会留下任何用户记录,
        请您放心举报
      </div>
    </div>

    <KunButton @click="handleSubmitReport" :pending="isFetching">
      提交举报
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 20px 20px 60px;
}

.select-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
}

.title {
  font-weight: bold;

  &::before {
    content: none;
  }
}

.kun-textarea {
  margin-top: 16px;
}

.note {
  color: var(--kungalgame-font-color-0);
  font-size: small;
  margin-bottom: 17px;
}
</style>
