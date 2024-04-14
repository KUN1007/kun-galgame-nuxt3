<script setup lang="ts">
import { languageItems } from '../../utils/options'
import type { GalgameDetail } from '~/types/api/galgame'

const gid = useRequestURL().searchParams.get('gid')

const { locale } = useI18n()
const introductionLanguage = ref(locale.value as Language)

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <div class="container">
    <h2>Pull Request</h2>

    <EditGalgamePrTitle :name="galgamePR[0].name" />

    <EditGalgameIntroduction
      :introduction-language="introductionLanguage"
      type="rewrite"
      @set="(value) => (introductionLanguage = value as Language)"
    />

    <EditGalgamePrFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  backdrop-filter: blur(10px);
  padding: 17px;
}

.nav {
  margin-bottom: 17px;
}
</style>
