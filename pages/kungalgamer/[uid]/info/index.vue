<script setup lang="ts">
import dayjs from 'dayjs'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const user = computed(() => props.user)

const rolesName = () => {
  const roles = props.user.roles
  if (roles === 1) {
    return 'user'
  }
  if (roles === 2) {
    return 'admin'
  }
  if (roles === 3) {
    return 'SU'
  }
  return ''
}

const statusName = () => {
  const status = props.user.status
  if (status === 0) {
    return 'normal'
  }
  if (status === 1) {
    return 'banned'
  }
  return ''
}
</script>

<template>
  <div class="article" v-if="user">
    <div class="info">
      <div class="basic">
        <span>{{ $t('user.profile.name') }}: {{ user.name }}</span>

        <span>
          {{ $t('user.profile.moemoepoint') }}: {{ user.moemoepoint }}
        </span>

        <span>{{ $t('user.profile.register') }}: {{ user.uid }}</span>

        <span>
          {{ $t('user.profile.roles') }}:
          {{ $t(`user.profile.${rolesName()}`) }}
        </span>

        <span>
          {{ $t('user.profile.status') }}:
          {{ $t(`user.profile.${statusName()}`) }}
        </span>

        <span>{{ $t('user.profile.upvote') }}: {{ user.upvote }}</span>

        <span>{{ $t('user.profile.like') }}: {{ user.like }}</span>

        <span>{{ $t('user.profile.dislike') }}: {{ user.dislike }}</span>

        <span>
          {{ $t('user.profile.today') }}: {{ user.daily_topic_count }}
        </span>

        <span>{{ $t('user.profile.topic') }}: {{ user.topic.length }}</span>

        <span>{{ $t('user.profile.reply') }}: {{ user.reply.length }}</span>

        <span>
          {{ $t('user.profile.comment') }}: {{ user.comment.length }}
        </span>

        <span>
          {{ $t('user.profile.time') }}:
          {{ dayjs(user.time).format('YYYY/MM/DD') }}
        </span>
      </div>

      <div class="bio">
        <div>{{ $t('user.profile.bio') }}:</div>
        <div v-if="user.bio">{{ user.bio }}</div>
        <div v-if="!user.bio" class="null">{{ $t('user.profile.null') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  flex-grow: 1;
  padding: 7px 0;
}

.info {
  display: flex;
  flex-direction: column;
}

.basic {
  font-size: small;
  place-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 2fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  padding-bottom: 10px;
  border-bottom: 1px solid var(--kungalgame-blue-4);

  span {
    padding: 5px 7px;

    &:last-child {
      grid-column-start: span 3;
    }
  }
}

.bio {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}

.null {
  color: var(--kungalgame-blue-2);
  font-style: oblique;
}
</style>
