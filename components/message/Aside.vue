<script setup lang="ts">
const { locale } = useI18n()

const { data } = await useFetch(`/api/message/status`, {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <aside class="aside">
    <h2>Message</h2>

    <KunDivider margin="10px 0" />

    <NuxtLinkLocale class="item" to="/message/notice" v-if="data">
      <NuxtImg src="/apple-touch-icon.png" />
      <div class="info">
        <div class="title">
          <span>{{ $t('message.notice') }}</span>
          <span>
            {{ formatTimeDifference(data.notice.time, locale) }}
          </span>
        </div>
        <div class="content">
          <span>
            {{ markdownToText(data.notice.content) }}
          </span>
          <span v-if="data.notice.unreadCount" class="unread">
            {{ data.notice.unreadCount }}
          </span>
          <span v-if="!data.notice.unreadCount" class="read">
            {{ data.notice.count }}
          </span>
        </div>
      </div>
    </NuxtLinkLocale>

    <NuxtLinkLocale class="item" to="/message/system" v-if="data">
      <NuxtImg src="/apple-touch-icon.png" />
      <div class="info">
        <div class="title">
          <span>{{ $t('message.system') }}</span>
          <span>
            {{ formatTimeDifference(data.system.time, locale) }}
          </span>
        </div>
        <div class="content">
          <span>
            {{
              data.system.unreadCount
                ? $t('message.new')
                : $t('topic.panel.reply')
            }}
          </span>
          <span v-if="data.system.unreadCount" class="unread">
            {{ data.system.unreadCount }}
          </span>
          <span v-if="!data.system.unreadCount" class="read">
            {{ data.system.count }}
          </span>
        </div>
      </div>
    </NuxtLinkLocale>
  </aside>
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
  color: var(--kungalgame-font-color-3);
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
    }

    .read,
    .unread {
      margin-left: auto;
      font-size: 12px;
      background-color: var(--kungalgame-gray-4);
      color: var(--kungalgame-white);
      border-radius: 10px;
      padding: 2px 4px;
    }

    .unread {
      background-color: var(--kungalgame-red-5);
    }
  }
}
</style>
