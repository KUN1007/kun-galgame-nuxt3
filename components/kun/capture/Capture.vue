<script setup lang="ts">
import { questionsEN } from './questionsEN'
import { questionsJP } from './questionsJP'
import { questionsCN } from './questionsCN'
import { questionsTW } from './questionsTW'
import type { Question } from './questionsEN'

const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useComponentMessageStore()
)

const questionsMap = {
  'en-us': questionsEN,
  'ja-jp': questionsJP,
  'zh-cn': questionsCN,
  'zh-tw': questionsTW
}

const questions = ref<Question[]>(questionsMap['zh-cn'])

const randomizeQuestion = () => {
  return randomNum(0, questions.value.length - 1)
}

const userAnswers = ref('')
const currentQuestionIndex = ref(randomizeQuestion())
const currentQuestion = ref(questions.value[currentQuestionIndex.value])
const errorCounter = ref(0)
const currentIndex = ref(0)
const isShowHint = ref(false)
const isShowAnswer = ref(false)

const resetStatus = () => {
  userAnswers.value = ''
  currentQuestionIndex.value = randomizeQuestion()
  currentQuestion.value = questions.value[currentQuestionIndex.value]
  errorCounter.value = 0
  currentIndex.value = 0
  isShowHint.value = false
  isShowAnswer.value = false
}

const nextQuestion = () => {
  const randomIndex = randomizeQuestion()
  currentQuestionIndex.value = randomIndex
  currentQuestion.value = questions.value[currentQuestionIndex.value]
}

const submitAnswer = () => {
  const correctOption = currentQuestion.value.correctOption

  if (userAnswers.value === correctOption) {
    isCaptureSuccessful.value = true
    isShowCapture.value = false
    useMessage(10309, 'success')
    resetStatus()
  } else {
    errorCounter.value++

    if (currentQuestion.value.isHard) {
      useMessage(10310, 'warn')
    } else {
      useMessage(10311, 'warn')
    }

    nextQuestion()
    userAnswers.value = ''

    if (errorCounter.value >= 3) {
      isShowHint.value = true
    }
  }
}

const handleCloseCapture = () => {
  isShowCapture.value = false
  resetStatus()
}
</script>

<template>
  <KunModal
    :modal-value="isShowCapture"
    @update:modal-value="(value) => (isShowCapture = value)"
  >
    <div class="space-y-6">
      <h2 class="text-xl">请回答下面的问题</h2>

      <p class="text-primary">{{ currentQuestion.text }}</p>

      <div class="grid grid-cols-2 gap-3">
        <label v-for="(option, index) in currentQuestion.options" :key="index">
          <input type="radio" v-model="userAnswers" :value="option" />
          {{ option }}
        </label>
      </div>

      <div class="flex justify-end gap-1">
        <KunButton variant="light" color="danger" @click="handleCloseCapture">
          关闭
        </KunButton>
        <KunButton @click="submitAnswer">提交</KunButton>
      </div>

      <div class="text-danger font-bold" v-if="currentQuestion.isHard">
        HARD
      </div>
    </div>
  </KunModal>
</template>
