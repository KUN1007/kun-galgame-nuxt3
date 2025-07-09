<script setup lang="ts">
import { kunReportOptions, KUN_REPORT_SECTION_MAP } from '~/constants/report'
import { usePersistUserStore } from '~/store/modules/user'

const reason = ref('')
const selectReportType = ref('topic')
const { id } = usePersistUserStore()
const isFetching = ref(false)

const handleSubmitReport = async () => {
  if (!id) {
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
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    class-name="min-h-[calc(100dvh-6rem)]"
  >
    <KunHeader
      name="匿名举报"
      description="该举报是完全匿名的, 在管理端以及数据库中不会留下任何用户记录, 请您放心举报, 与此同时请您务必填写详细违规的位置, 因为我们无法与您再次沟通"
    />

    <div class="space-y-2">
      <h2>举报类型</h2>
      <KunSelect
        :options="kunReportOptions"
        :model-value="selectReportType"
        @set="(newVal) => (selectReportType = newVal.toString())"
      >
        {{ KUN_REPORT_SECTION_MAP[selectReportType] }}
      </KunSelect>
    </div>

    <div class="space-y-2">
      <h2 class="title">举报理由</h2>
      <KunTextarea
        name="comment"
        placeholder="填写具体的违规内容, 以及违规的页面链接, 指明 哪个页面 (付带页面的地址), 哪个位置 (发言或是其它违规内容) 发生了违规或者不合理的行为, 请一定要写清违规位置, 否则不会受理"
        :rows="10"
        v-model="reason"
      />
    </div>

    <div class="flex justify-end">
      <KunButton @click="handleSubmitReport" :loading="isFetching">
        提交举报
      </KunButton>
    </div>
  </KunCard>
</template>
