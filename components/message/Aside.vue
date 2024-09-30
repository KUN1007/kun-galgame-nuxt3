<script setup lang="ts"></script>

<template>
  <div class="aside">
    <h2>Message</h2>

    <KunDivider margin="10px 0" />

    <div class="item">
      <NuxtImg src="/apple-touch-icon.png" />
      <div class="info">
        <div class="title">
          <span>Notice</span>
          <span>1/10/2024</span>
        </div>
        <div class="content">
          <span>KUN IS THE CUTEST!!!!!!!!!!</span>
          <span>17</span>
        </div>
      </div>
    </div>

    <div class="item">
      <NuxtImg src="/apple-touch-icon.png" />
      <div class="info">
        <div class="title">
          <span>System</span>
          <span>1/10/2024</span>
        </div>
        <div class="content">
          <span>Content</span>
          <span>1007</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  height: 100%;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  padding: 10px;
  @include kun-blur;
}

.item {
  display: flex;
  padding: 10px;
  width: 20rem;
  border-radius: 10px;
  cursor: pointer;

  img {
    height: 50px;
    width: 50px;
  }

  &:hover {
    background-color: var(--kungalgame-trans-blue-0);
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        font-size: small;
        color: var(--kungalgame-font-color-0);
      }
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: small;

      &:first-child {
        color: var(--kungalgame-font-color-0);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      &:last-child {
        font-size: 12px;
        background-color: var(--kungalgame-blue-5);
        color: var(--kungalgame-white);
        border-radius: 10px;
        padding: 2px 4px;
      }
    }
  }
}
</style>
