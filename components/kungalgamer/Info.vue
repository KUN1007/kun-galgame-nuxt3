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
  <!-- Right content area -->
  <div class="article" v-if="user">
    <!-- User profile information -->
    <div class="info">
      <!-- User basic information -->
      <div class="basic">
        <!-- Username -->
        <span>{{ $tm('user.profile.name') }}: {{ user.name }}</span>
        <!-- Moemoepoint -->
        <span>
          {{ $tm('user.profile.moemoepoint') }}: {{ user.moemoepoint }}
        </span>
        <!-- Registration number -->
        <span>{{ $tm('user.profile.register') }}: {{ user.uid }}</span>
        <!-- Role -->
        <span>{{ $tm('user.profile.roles') }}: {{ rolesName() }}</span>
        <!-- Status -->
        <span>{{ $tm('user.profile.status') }}: {{ statusName() }}</span>
        <!-- Upvotes received -->
        <span>{{ $tm('user.profile.upvote') }}: {{ user.upvote }}</span>
        <!-- Likes received -->
        <span>{{ $tm('user.profile.like') }}: {{ user.like }}</span>
        <!-- Dislikes received -->
        <span>{{ $tm('user.profile.dislike') }}: {{ user.dislike }}</span>
        <!-- Topics published today -->
        <span>
          {{ $tm('user.profile.today') }}: {{ user.daily_topic_count }}
        </span>
        <!-- Total topics published -->
        <span>{{ $tm('user.profile.topic') }}: {{ user.topic.length }}</span>
        <!-- Total replies published -->
        <span>{{ $tm('user.profile.reply') }}: {{ user.reply.length }}</span>
        <!-- Total comments published -->
        <span>
          {{ $tm('user.profile.comment') }}: {{ user.comment.length }}
        </span>

        <!-- Registration date -->
        <span>
          {{ $tm('user.profile.time') }}:
          {{ dayjs(user.time).format('YYYY/MM/DD') }}
        </span>
      </div>

      <!-- User bio -->
      <div class="bio">
        <div>{{ $tm('user.profile.bio') }}:</div>
        <div v-if="user.bio">{{ user.bio }}</div>
        <div v-if="!user.bio" class="null">{{ $tm('user.profile.null') }}</div>
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
