<script setup lang="ts"></script>

<template>
  <div class="top-bar">
    <KunPopover>
      <span class="nav">话题</span>
      <template #content>
        <div class="menu">
          <NuxtLink class="item" to="/pool">
            <span>所有话题</span>
          </NuxtLink>

          <NuxtLink class="item" to="/category">
            <span>话题分类</span>
          </NuxtLink>
        </div>
      </template>
    </KunPopover>

    <KunPopover>
      <span class="nav">发布</span>
      <template #content>
        <div class="menu">
          <NuxtLink class="item" to="/edit/topic">
            <span>发布话题</span>
          </NuxtLink>

          <NuxtLink class="item" to="/edit/galgame?type=publish">
            <span>
              <span>发布 Galgame</span>
            </span>
          </NuxtLink>
        </div>
      </template>
    </KunPopover>

    <KunPopover>
      <span class="nav">关于</span>
      <template #content>
        <div class="menu">
          <NuxtLink class="item" to="/kungalgame">
            <span>关于我们</span>
          </NuxtLink>

          <NuxtLink class="item" to="/friend-links">
            <span>
              <span>友情链接</span>
            </span>
          </NuxtLink>

          <NuxtLink class="item" to="/contact">
            <span>
              <span>加入群组</span>
            </span>
          </NuxtLink>

          <a href="https://nav.kungal.org" target="_blank" class="item">
            <span>
              <span>导航页面</span>
            </span>
          </a>
        </div>
      </template>
    </KunPopover>

    <NuxtLink class="link" to="/galgame">
      <span>Galgame</span>
    </NuxtLink>

    <NuxtLink class="link" to="/">
      <span>主页</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@mixin underline-hover {
  position: relative;
  color: var(--kungalgame-blue-5);

  &::before {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--kungalgame-blue-5);
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }
}

.top-bar {
  text-align: center;
  align-items: center;
  display: flex;
  margin-left: 30px;

  .nav {
    cursor: pointer;
    display: block;
    line-height: 58px;
    width: 100%;
    padding: 0 17px;
    white-space: nowrap;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: nowrap;
    padding: 10px;

    @include kun-blur;

    .item {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      position: relative;
      color: var(--kungalgame-blue-5);
      padding: 10px;

      span {
        @include underline-hover;
      }

      &:hover span::before {
        transform: scaleX(1);
      }
    }
  }
}

.link {
  display: block;
  line-height: 58px;
  width: 100%;
  padding: 0 17px;
  position: relative;
  color: var(--kungalgame-blue-5);

  span {
    white-space: nowrap;
    @include underline-hover;
  }

  &:hover span::before {
    transform: scaleX(1);
  }
}

@media (max-width: 1000px) {
  .top-bar {
    display: none;
  }
}
</style>
