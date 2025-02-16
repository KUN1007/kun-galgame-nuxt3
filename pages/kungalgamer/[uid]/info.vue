<script setup lang="ts">
import { KUN_USER_ROLE_MAP, KUN_USER_STATUS_MAP } from '~/constants/user'
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
        <span>用户名: {{ user.name }}</span>
        <span>萌萌点: {{ user.moemoepoint }}</span>
        <span>注册序号: {{ user.uid }}</span>
        <span>角色: {{ KUN_USER_ROLE_MAP[rolesName()] }}</span>
        <span>状态: {{ KUN_USER_STATUS_MAP[statusName()] }}</span>
        <span>被推: {{ user.upvote }}</span>
        <span>被赞: {{ user.like }}</span>
        <span>被踩: {{ user.dislike }}</span>
        <span>今日发布话题: {{ user.dailyTopicCount }}</span>
        <span>话题: {{ user.topic }}</span>
        <span>回复: {{ user.reply }}</span>
        <span>评论: {{ user.comment }}</span>
        <span>发布 Galgame: {{ user.galgame }}</span>
        <span>贡献 Galgame :{{ user.contributeGalgame }}</span>
        <span>今日发布 Galgame :{{ user.dailyGalgameCount }}</span>
        <span>
          注册时间 :
          {{ formatDate(user.time, { isShowYear: true, isPrecise: true }) }}
        </span>
      </div>

      <KunDivider margin="0 7px" />

      <div class="bio">
        <div>签名:</div>
        <pre v-if="user.bio">{{ user.bio }}</pre>
        <KunNull :condition="!user.bio" type="null" :is-show-sticker="false" />
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
  grid-template-columns: repeat(3, minmax(0, 2fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  padding-bottom: 10px;

  span {
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
    cursor: default;

    &:hover {
      background-color: var(--kungalgame-trans-blue-0);
    }

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

  pre {
    display: block;
    width: 100%;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-wrap: break-word;
    font-size: large;
  }
}

.null {
  color: var(--kungalgame-blue-2);
  font-style: oblique;
}

@media (max-width: 700px) {
  .bio {
    pre {
      font-size: medium;
    }
  }
}
</style>
