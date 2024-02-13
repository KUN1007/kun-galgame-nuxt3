<script setup lang="ts"></script>

<template>
  <div class="kungalgame-info">
    <div class="container">
      <div class="top">
        <HomeFooterList class="list" />

        <HomeFooterContacts class="contacts" />
      </div>

      <HomeFooterDescribe class="describe" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-info {
  flex-grow: 1;
  display: flex;
  background-color: var(--kungalgame-trans-blue-2);
}

.container {
  margin: 0 auto;
  width: 90%;
  display: flex;
  max-width: 64rem;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 2;
}

@media (max-width: 1000px) {
  .list,
  .describe {
    display: none;
  }
}
</style>
