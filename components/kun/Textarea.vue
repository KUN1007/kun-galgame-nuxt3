<script setup lang="ts">
const value = defineModel<string | number | string[]>({
  required: true
})

withDefaults(defineProps<{ placeholder: string }>(), {
  placeholder:
    '「恋だよ、恋。私に出来なかったことのひとつを、君に代わりにかなえてもらう」'
})
</script>

<template>
  <div class="kun-textarea">
    <textarea
      :placeholder="placeholder"
      v-model="value"
      name="comment"
      rows="5"
    />
    <span class="kun-textarea-count">{{ value.toString().trim().length }}</span>
  </div>
</template>

<style lang="scss" scoped>
.kun-textarea {
  position: relative;

  textarea {
    color: var(--kungalgame-font-color-3);
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid var(--kungalgame-trans-blue-2);
    background-color: transparent;
    border-radius: 10px;
    padding: 5px;
    resize: vertical;

    &:focus {
      border: 1px solid var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
      box-shadow: 0 0 0 0.5px var(--kungalgame-blue-5);
    }
  }

  .kun-textarea-count {
    font-size: small;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
