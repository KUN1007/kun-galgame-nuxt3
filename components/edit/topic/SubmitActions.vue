<script setup lang="ts">
import { useTopicSubmitter } from '~/composables/topic/useTopicSubmitter'

const { rules, submit, isSubmitting, isRewriteMode } = useTopicSubmitter()
const { moemoepoint } = usePersistUserStore()

const buttonText = computed(() => {
  if (isSubmitting.value) return '处理中...'
  return isRewriteMode.value ? '确认更改' : '发布话题'
})
</script>

<template>
  <div class="space-y-6">
    <div v-if="moemoepoint < 50" class="space-y-4">
      <h3 class="flex items-center gap-2 text-lg font-semibold">
        <Icon name="lucide:circle-alert" class="h-5 w-5" />
        发布须知
        <span class="text-danger-500">*</span>
      </h3>
      <p class="text-default-500 mt-2 text-sm">
        {{
          `勾选确认下面的须知即可发布话题, 仅对萌萌点 < 50 的用户生效, 这是为了防止发布过多无意义的话题, 请您理解`
        }}
      </p>
      <KunCheckBox
        v-model="rules.isReadRule"
        type="single"
        label="我确认: 我已完整阅读过话题发布规定"
        color="primary"
      />
      <KunCheckBox
        v-model="rules.isAgreeCategory"
        type="single"
        label="我确认: 若话题为求助话题, 我已将求助性质的话题放入请求帮助 / 寻求资源分类"
        color="primary"
      />
      <KunCheckBox
        v-model="rules.isValidTitle"
        type="single"
        label="我确认: 我话题的标题非常直观具体详细, 例如《彼女と俺と恋人と 运行报错 DirectDraw 初始化失败求助》，《求寻找 Favorite 社 アストラエアの白き永遠 PSV 版本下载资源》, 而绝对不是《游戏报错求助》，《求助资源》"
        color="primary"
      />
      <KunCheckBox
        v-model="rules.isKnownConsequence"
        type="single"
        label="我确认: 违反上面的规则或违反论坛的总规定, 将会被扣除巨量萌萌点甚至永久封禁"
        color="primary"
      />
    </div>

    <div class="flex items-center justify-end gap-4">
      <kbd
        class="border-default-200 bg-default-100 text-default-800 rounded-lg border px-2 py-1.5 text-xs font-semibold"
      >
        Ctrl
      </kbd>
      +
      <kbd
        class="border-default-200 bg-default-100 text-default-800 rounded-lg border px-2 py-1.5 text-xs font-semibold"
      >
        Enter
      </kbd>

      <KunButton
        @click="submit"
        size="lg"
        :disabled="isSubmitting"
        class="min-w-[120px]"
      >
        <Icon
          v-if="isSubmitting"
          name="lucide:loader-2"
          class="h-5 w-5 animate-spin"
        />
        <span v-else>{{ buttonText }}</span>
      </KunButton>
    </div>
  </div>
</template>
