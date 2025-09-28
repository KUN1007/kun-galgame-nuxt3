<script setup lang="ts">
import { languageItems } from '~/constants/edit'

const introductionLanguage = ref<Language>('zh-cn')
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <div class="contents">
    <ClientOnly>
      <KunCard
        :is-hoverable="false"
        :is-transparent="false"
        content-class="space-y-6"
      >
        <EditGalgamePrHelp />

        <EditGalgamePrTitle />

        <div>
          <h2 class="text-xl">VNDB 编号</h2>
          <div class="my-2 flex items-center justify-center gap-2">
            <KunInput
              v-model="galgamePR[0].vndbId"
              placeholder="例如: v19658"
            />
          </div>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl">游戏介绍</h2>
          <KunTab
            :items="languageItems"
            v-model="introductionLanguage"
            variant="underlined"
            color="primary"
            size="sm"
          />
          <EditGalgameEditor :lang="introductionLanguage" type="rewrite" />
        </div>

        <EditGalgamePrAlias type="rewrite" />

        <EditGalgameContentLimit type="rewrite" />

        <EditGalgamePrFooter />
      </KunCard>
    </ClientOnly>
  </div>
</template>
