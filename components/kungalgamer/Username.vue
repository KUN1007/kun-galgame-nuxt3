<script setup lang="ts"></script>

<template>
  <div class="username">
    <div class="title">{{ $t('user.settings.username') }}</div>
    <input type="text" />
    <p>{{ $t('user.settings.usernameHint') }}</p>
    <button>{{ $t('user.settings.confirm') }}</button>
  </div>
</template>

<style lang="scss" scoped>
.username {
  input {
    margin-top: 10px;
    height: 25px;
    padding-left: 5px;
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-white-9);
    color: var(--kungalgame-font-color-3);

    &:focus {
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  p {
    margin: 10px 0;
    font-size: 13px;
  }

  button {
    cursor: pointer;
    padding: 5px 17px;
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    color: var(--kungalgame-blue-4);
    transition: all 0.2s;

    &:hover {
      background-color: var(--kungalgame-blue-4);
      color: var(--kungalgame-white);
    }
    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
