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
const expectedKeys = ref(['k', 'u', 'n'])
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

const checkKeyPress = (event: KeyboardEvent) => {
  const pressedKey = event.key.toLowerCase()

  if (pressedKey === expectedKeys.value[currentIndex.value]) {
    if (currentIndex.value === expectedKeys.value.length - 1) {
      isShowAnswer.value = true
    } else {
      currentIndex.value++
    }
  } else {
    currentIndex.value = 0
  }
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
  <Teleport to="body" :disabled="!isShowCapture">
    <Transition name="capture">
      <div
        class="mask"
        @keydown="checkKeyPress($event)"
        tabindex="0"
        v-if="isShowCapture"
      >
        <div class="validate">
          <div class="title">
            <h2>请回答下面的问题</h2>
          </div>

          <p class="question">{{ currentQuestion.text }}</p>

          <div class="select">
            <label
              v-for="(option, index) in currentQuestion.options"
              :key="index"
            >
              <input type="radio" v-model="userAnswers" :value="option" />
              {{ option }}
            </label>
          </div>

          <div class="btn">
            <button @click="submitAnswer">提交</button>
            <button @click="handleCloseCapture">关闭</button>
          </div>

          <div class="hint-container">
            <div class="hard" v-if="currentQuestion.isHard">HARD</div>

            <div v-if="isShowHint" class="hint">
              <div>真是杂鱼呢~♡这都答不出来~杂鱼~♡杂鱼~♡</div>
              <div>
                臭杂鱼♡，试试在页面上敲击
                <span>kun</span>
                呢，杂鱼~♡杂鱼~♡3
              </div>
            </div>
            <div v-if="isShowAnswer" class="answer">
              <div>杂~~~鱼~♡杂鱼~♡你就看吧，最后害的还是你自己</div>
              <p>{{ questions[currentQuestionIndex].correctOption }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  display: flex;
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
}

.validate {
  width: 300px;
  min-height: 300px;
  margin: auto;
  padding: 17px;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-2);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
  color: var(--kungalgame-blue-5);
}

.question {
  font-size: 17px;
  margin-bottom: 20px;
  font-style: oblique;
}

.select {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  margin-bottom: 20px;
}

.btn {
  display: flex;
  justify-content: space-around;

  button {
    width: 77px;
    padding: 5px;
    color: var(--kungalgame-blue-5);
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 5px;
    background-color: transparent;
    transition: all 0.2s;
    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.hint-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-style: oblique;
  user-select: none;

  .hard {
    color: var(--kungalgame-red-5);
    font-size: 15px;
    font-weight: bold;
  }

  .hint {
    width: 100%;
    font-size: 10px;
    span {
      color: var(--kungalgame-pink-4);
      font-weight: bold;
    }
  }

  .answer {
    width: 100%;

    div {
      font-size: 10px;
    }

    p {
      color: var(--kungalgame-pink-4);
    }
  }
}

.active {
  transition: all 0.2s;
  border: 2px solid var(--kungalgame-pink-3);
}

.capture-enter-from {
  opacity: 0;
}

.capture-leave-to {
  opacity: 0;
}

.capture-enter-from .validate,
.capture-leave-to .validate {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
