<script setup lang="ts">
import { reportSection } from './constant'

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
      <span class="title">{{ t('report.select.title') }}</span>

      <KunSelect
        :styles="{ width: '180px' }"
        :options="reportSection"
        default-value="topic"
        i18n="report.select.section"
        @set="(value) => (selectReportType = value)"
        position="bottom"
      >
        <span>{{ $t(`report.select.section.${selectReportType}`) }}</span>
      </KunSelect>
    </div>

    <div>
      <span class="title">{{ t('report.reason.title') }}</span>
      <div class="textarea-container">
        <textarea
          name="comment"
          :placeholder="t('report.reason.placeholder')"
          rows="10"
          v-model="reason"
        />
      </div>

      <div class="note">{{ t('report.note') }}</div>
    </div>

    <div class="confirm-container">
      <KunButton @click="handleSubmitReport" :pending="isFetching">
        {{ t('report.submit') }}
      </KunButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 20px 20px 60px;

  @include kun-blur;
}

.select-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;

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
  font-weight: bold;

  &::before {
    content: none;
  }
}

.textarea-container {
  position: relative;
  display: flex;
  margin-top: 17px;

  textarea {
    color: var(--kungalgame-font-color-3);
    flex: 1;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: transparent;
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

.note {
  color: var(--kungalgame-font-color-0);
  font-size: small;
  margin-bottom: 17px;
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
    background-color: transparent;
    border: 1px solid var(--kungalgame-blue-5);

    &:hover {
      transition: 0.2s;
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
