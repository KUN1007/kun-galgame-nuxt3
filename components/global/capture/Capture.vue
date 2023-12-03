<script setup lang="ts">
import { ref, watch } from 'vue'
import { questionsEN, Question } from './questionsEN'
import { questionsCN } from './questionsCN'

import Message from '@/components/alert/Message'

import { useTempMessageStore } from '@/store/temp/message'
import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

const { showKUNGalgameLanguage } = storeToRefs(useKUNGalgameSettingsStore())
const { isShowCapture, isCaptureSuccessful } = storeToRefs(
  useTempMessageStore()
)
// Current language
const questions = ref<Question[]>([])

// Initialize
questions.value =
  showKUNGalgameLanguage.value === 'en' ? questionsEN : questionsCN

// Watch for changes in the language setting
watch(showKUNGalgameLanguage, () => {
  questions.value =
    showKUNGalgameLanguage.value === 'en' ? questionsEN : questionsCN
})

// Function to randomly select a question
const randomizeQuestion = () => {
  // Generate a random integer between 0 and the number of questions minus 1
  return Math.floor(Math.random() * questions.value.length)
}

// User's input answer
const userAnswers = ref('')
// Current question index
const currentQuestionIndex = ref(randomizeQuestion())
// Current question
const currentQuestion = ref(questions.value[currentQuestionIndex.value])
// Error count
const errorCounter = ref(0)
const expectedKeys = ref(['k', 'u', 'n'])
const currentIndex = ref(0)
// Whether to show hints
const isShowHint = ref(false)
// Whether to show the answer
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

// Listen to keyboard events
const checkKeyPress = (event: KeyboardEvent) => {
  const pressedKey = event.key

  if (pressedKey === expectedKeys.value[currentIndex.value]) {
    // When the user presses the expected key
    if (currentIndex.value === expectedKeys.value.length - 1) {
      // If the last key "n" has been pressed, trigger the corresponding logic
      isShowAnswer.value = true
    } else {
      // Otherwise, continue to the next expected key
      currentIndex.value++
    }
  } else {
    // If the wrong key is pressed, start checking again
    currentIndex.value = 0
  }
}

// Submit the answer
const submitAnswer = () => {
  const correctOption = currentQuestion.value.correctOption

  if (userAnswers.value === correctOption) {
    // Correct answer
    // Set the validation as successful
    isCaptureSuccessful.value = true
    // Close the panel
    isShowCapture.value = false
    Message(
      'Human-machine identity verification successful ~',
      '人机身份验证通过 ~',
      'success'
    )
    resetStatus()
  } else {
    // Wrong answer
    errorCounter.value++

    Message('Wrong answer!', '回答错误！', 'warn')

    // Randomly select a new question
    const randomIndex = randomizeQuestion()
    currentQuestionIndex.value = randomIndex
    userAnswers.value = ''

    // Show hints if the error count is greater than or equal to 3
    if (errorCounter.value >= 3) {
      isShowHint.value = true
    }
  }
}

// Close panel
const handleCloseCapture = () => {
  isShowCapture.value = false
  resetStatus()
}
</script>

<template>
  <Teleport to="body" :disabled="isShowCapture">
    <Transition name="capture">
      <!-- Mask -->
      <div
        class="mask"
        @keydown="checkKeyPress($event)"
        tabindex="0"
        v-if="isShowCapture"
      >
        <div class="validate">
          <!-- Title -->
          <div class="title">
            <!-- <span>{{ `❮` }}</span> -->
            <h2>{{ $tm('AlertInfo.capture.title') }}</h2>
            <!-- <span>{{ `❯` }}</span> -->
          </div>
          <p class="question">{{ currentQuestion.text }}</p>

          <!-- Options -->
          <div class="select">
            <label
              v-for="(option, index) in currentQuestion.options"
              :key="index"
            >
              <input type="radio" v-model="userAnswers" :value="option" />
              {{ option }}
            </label>
          </div>

          <!-- Submit buttons -->
          <div class="btn">
            <button @click="submitAnswer">
              {{ $tm('AlertInfo.capture.submit') }}
            </button>
            <button @click="handleCloseCapture">
              {{ $tm('AlertInfo.capture.close') }}
            </button>
          </div>

          <!-- Hints -->
          <!-- tabindex allows this element to be focused on the page -->
          <div class="hint-container">
            <div v-if="isShowHint" class="hint">
              <div>{{ $tm('AlertInfo.capture.hint1') }}</div>
              <div>
                {{ $tm('AlertInfo.capture.hint2') }}
                <span>kun</span>
                {{ $tm('AlertInfo.capture.hint3') }}
              </div>
            </div>
            <div v-if="isShowAnswer" class="answer">
              <div>{{ $tm('AlertInfo.capture.hint4') }}</div>
              <a
                href="https://github.com/KUN1007/kun-galgame-vue/tree/remove-server/src/components/capture"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $tm('AlertInfo.capture.answer') }}
              </a>
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
  border: 1px solid var(--kungalgame-blue-1);
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
  color: var(--kungalgame-blue-4);
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
    color: var(--kungalgame-blue-4);
    border: 1px solid var(--kungalgame-blue-4);
    border-radius: 5px;
    background-color: var(--kungalgame-trans-white-9);
    transition: all 0.2s;
    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-4);
    }
  }
}

.hint-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  font-style: oblique;
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
    a {
      color: var(--kungalgame-blue-5);
      &:hover {
        text-decoration: underline;
      }
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
