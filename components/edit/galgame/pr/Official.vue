<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('edit.pr.official.name') }}
    </template>
  </KunHeader>

  <div class="hint">
    {{ $t('edit.pr.official.hint') }}
  </div>

  <KunTextarea
    :placeholder="`${$t('edit.pr.official.placeholder')}`"
    v-model="galgamePR[0].official"
  />
</template>

<style lang="scss" scoped>
.kun-textarea {
  width: 100%;
  margin-bottom: 17px;
}

.hint {
  color: var(--kungalgame-font-color-0);
  margin-bottom: 17px;
  font-size: small;
}
</style>
