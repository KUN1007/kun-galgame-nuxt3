<script setup lang="ts"></script>

<template>
  <div class="top-bar">
    <KunPopover>
      <span class="nav">{{ $t('header.topic.name') }}</span>
      <template #content>
        <div class="menu">
          <NuxtLinkLocale class="item" to="/pool">
            <span>
              {{ $t('header.topic.all') }}
            </span>
          </NuxtLinkLocale>

          <NuxtLinkLocale class="item" to="/category">
            <span>
              <span>{{ $t('header.topic.category') }}</span>
            </span>
          </NuxtLinkLocale>
        </div>
      </template>
    </KunPopover>

    <KunPopover>
      <span class="nav">{{ $t('header.publish.name') }}</span>
      <template #content>
        <div class="menu">
          <NuxtLinkLocale class="item" to="/edit/topic">
            <span>
              {{ $t('header.publish.topic') }}
            </span>
          </NuxtLinkLocale>

          <NuxtLinkLocale class="item" to="/edit/galgame">
            <span>
              <span>{{ $t('header.publish.galgame') }}</span>
            </span>
          </NuxtLinkLocale>
        </div>
      </template>
    </KunPopover>

    <NuxtLinkLocale class="link" to="/galgame">
      <span>
        {{ $t('header.galgame') }}
      </span>
    </NuxtLinkLocale>

    <NuxtLinkLocale class="link" to="/kungalgame">
      <span>
        {{ $t('header.about') }}
      </span>
    </NuxtLinkLocale>

    <NuxtLinkLocale class="link" to="/">
      <span>
        {{ $t('header.home') }}
      </span>
    </NuxtLinkLocale>
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
  width: 333px;
  align-items: center;
  display: flex;
  margin-left: 30px;

  .nav {
    cursor: pointer;
    display: block;
    line-height: 58px;
    width: 100%;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--kungalgame-trans-white-5);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: var(--shadow);
    white-space: nowrap;
    padding: 10px;

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
  position: relative;
  color: var(--kungalgame-blue-5);

  span {
    @include underline-hover;
  }

  &:hover span::before {
    transform: scaleX(1);
  }
}

@media (max-width: 700px) {
  .top-bar {
    display: none;
  }
}
</style>
