<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('edit.pr.engine.name') }}
    </template>
  </KunHeader>

  <div class="hint">
    {{ $t('edit.pr.engine.hint') }}
  </div>

  <KunTextarea
    :placeholder="`${$t('edit.pr.engine.placeholder')}`"
    v-model="galgamePR[0].engine"
  />
</template>

<style lang="scss" scoped>
.kun-input {
  width: 100%;
  margin-bottom: 17px;
}

.hint {
  color: var(--kungalgame-font-color-0);
  margin-bottom: 17px;
  font-size: small;
}
</style>
