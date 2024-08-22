<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('edit.pr.tags.name') }}
    </template>
  </KunHeader>

  <div class="hint">
    {{ $t('edit.pr.tags.hint') }}
  </div>

  <KunTextarea
    :placeholder="`${$t('edit.pr.tags.placeholder')}`"
    v-model="galgamePR[0].tags"
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
