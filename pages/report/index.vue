<script setup lang="ts">
import type { KunSelect } from '#build/components'
import { reportSection } from './constant'
import type { ReportSubmitRequestData } from '~/types/api/report'
const { t } = useI18n()

useHead({
  title: t('seo.report.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.report.description')
    }
  ]
})

const reason = ref()
const selectReportType = ref('topic')
const selectRef = ref<typeof KunSelect>()

const handleSubmitReport = async () => {
  if (!reason.value) {
    useMessage(
      'Please fill in the reason for reporting',
      '请填写举报理由',
      'warn'
    )
  }

  const requestData: ReportSubmitRequestData = {
    reportType: selectReportType.value,
    reason: reason.value
  }

  const { data } = await useFetch(`/api/report/submit`, {
    method: 'POST',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    useMessage('Report submitted successfully!', '举报提交成功!', 'success')
    reason.value = ''
  }
}
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="select-container">
        <h3 class="title">{{ t('report.select.title') }}</h3>

        <KunSelect
          :styles="{ width: '180px' }"
          :options="reportSection"
          default-value="topic"
          ref="selectRef"
          i18n="report.select.section"
          @set="(value) => (selectReportType = value)"
          position="bottom"
        >
          <span>{{ $t(`report.select.section.${selectReportType}`) }}</span>
        </KunSelect>
      </div>

      <div>
        <h3 class="title">{{ t('report.reason.title') }}</h3>
        <div class="textarea-container">
          <textarea
            name="comment"
            :placeholder="t('report.reason.placeholder')"
            rows="10"
            v-model="reason"
          />
        </div>
      </div>

      <div class="confirm-container">
        <KunButton @click="handleSubmitReport">
          {{ t('report.submit') }}
        </KunButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100dvh + 75px);
}

.container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  border-radius: 7px;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(17px);
  padding: 20px 20px 60px;
  box-shadow: var(--kungalgame-shadow-0);
}

.select-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--kungalgame-font-color-1);

    .icon {
      font-size: 17px;
      margin-right: 10px;
    }

    & > span {
      margin: 3px;
      padding: 3px 17px;
      background-color: var(--kungalgame-trans-blue-0);
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
      border-radius: 7px;
      display: flex;
      align-items: center;
      user-select: none;
    }
  }
}

.title {
  margin-bottom: 0.5rem;
  font-size: 1rem;

  &::before {
    content: none;
  }
}

.textarea-container {
  position: relative;
  display: flex;

  textarea {
    color: var(--kungalgame-font-color-3);
    flex: 1;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    padding: 5px;

    &::placeholder {
      color: var(--kungalgame-font-color-1);
    }

    &:focus {
      border: 1px solid var(--kungalgame-pink-3);
    }
  }
}

.confirm-container {
  display: flex;
  justify-content: flex-end;

  .confirm-btn {
    height: 40px;
    width: 200px;
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 10px;
    color: var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-blue-5);

    &:hover {
      transition: 0.2s;
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
