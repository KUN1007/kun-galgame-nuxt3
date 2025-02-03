<script setup lang="ts">
const { autosaveCount } = storeToRefs(useTempEditStore())
</script>

<template>
  <div class="settings">
    <NuxtLink to="/topic/280" class="rules">
      {{ $t(`edit.topic.rules`) }}
    </NuxtLink>

    <span class="save">
      {{ `${$t('edit.topic.save')} × ${autosaveCount}` }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings {
  color: var(--kungalgame-font-color-1);
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  .rules {
    text-transform: uppercase;
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .save {
    margin-left: 17px;
  }
}
</style>
