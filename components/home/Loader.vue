<script setup lang="ts">
const pageNumber = defineModel<number>({ required: true })

defineProps<{
  status: UseFetchStatus
}>()
</script>

<template>
  <KunDivider margin="30px" padding="0 17px">
    <slot />
    <span v-if="status !== 'pending'" @click="pageNumber++" class="loader">
      {{ $t('home.load') }}
    </span>
    <span v-if="status === 'pending'">
      {{ $t('home.loading') }}
    </span>
  </KunDivider>
</template>

<style lang="scss" scoped>
span {
  &:first-child {
    padding-left: 17px;
  }

  &:last-child {
    padding-right: 17px;
  }
}

.loader {
  cursor: pointer;

  &:hover {
    color: var(--kungalgame-blue-5);
  }
}
</style>
