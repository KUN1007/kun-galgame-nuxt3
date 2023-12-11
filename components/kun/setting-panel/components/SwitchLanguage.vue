<script setup lang="ts">
const container = ref<HTMLElement>()
const isShowLanguage = ref(false)
const { locale, setLocale } = useI18n()

const handleClickShowLanguage = async () => {
  isShowLanguage.value = !isShowLanguage.value
  await new Promise((resolve) => {
    setTimeout(resolve, 107)
  })
  container.value?.focus()
}
</script>

<template>
  <div class="set-lang">
    <span>{{ $t('header.settings.language') }}</span>

    <div class="lang">
      <div class="chooser" @click="handleClickShowLanguage">
        <span>{{ $t(`header.settings.${locale}`) }}</span>
        <Icon class="icon" name="line-md:chevron-down" />
      </div>

      <Transition name="select">
        <div
          ref="container"
          tabindex="-1"
          v-if="isShowLanguage"
          class="lang-container"
          @blur="isShowLanguage = false"
        >
          <span
            v-for="(lang, index) in $i18n.availableLocales"
            :key="index"
            @click="setLocale(lang)"
            v-once
          >
            {{ $t(`header.settings.${lang}`) }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set-lang {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.lang {
  position: relative;
  cursor: pointer;
}

.chooser {
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon {
    color: var(--kungalgame-blue-4);
  }
}

.lang-container {
  width: 100px;
  position: absolute;
  top: 27px;
  padding: 7px;
  border: 1px solid var(--kungalgame-trans-blue-1);
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--shadow);

  span {
    font-size: 15px;
    display: flex;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--kungalgame-blue-0);
    }
  }
}

.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
