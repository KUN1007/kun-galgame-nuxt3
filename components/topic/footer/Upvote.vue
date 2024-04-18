<script setup lang="ts">
const props = defineProps<{
  tid: number
  toUid: number
  upvoteCount: number
  isUpvoted: boolean
}>()

const { uid, moemoeAccessToken, moemoepoint } = usePersistUserStore()
const isUpvoted = ref(props.isUpvoted)
const upvoteCount = ref(props.upvoteCount)

const upvoteTopic = async () => {
  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Are you sure you want to upvote this topic?',
      'ja-jp': '',
      'zh-cn': '您确定推这个话题吗?'
    },
    {
      'en-us':
        'Upvote a topic will consume 7 MoeMoePoints from you and give the recipient 3 MoeMoePoints',
      'ja-jp': '',
      'zh-cn': '推话题将会消耗您 7 萌萌点, 并给被推者增加 3 萌萌点'
    }
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.tid}/upvote`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    upvoteCount.value++
    isUpvoted.value = true
    useMessage('Topic upvote successfully', '推话题成功', 'success')
  }
}

// const upvoteReply = async () => {
//   const res = await useTempMessageStore().alert(
//     {
//       'en-us': 'Are you sure you want to upvote this reply?',
//       'ja-jp': '',
//       'zh-cn': '您确定推这个回复吗?'
//     },
//     {
//       'en-us':
//         'Upvote a reply will consume 2 MoeMoePoints from you and give the recipient 1 MoeMoePoints',
//       'ja-jp': '',
//       'zh-cn': '推回复将会消耗您 2 萌萌点, 并给被推者增加 1 萌萌点'
//     }
//   )
//   if (!res) {
//     return
//   }

//   const result = await $fetch(`/api/topic/${props.tid}/reply/upvote`, {
//     method: 'PUT',
//     query: { rid: props.rid },
//     watch: false,
//     ...kungalgameResponseHandler
//   })

//   if (result) {
//     upvoteCount.value++
//     isUpvoted.value = true
//     useMessage('Reply upvote successfully', '推回复成功', 'success')
//   }
// }

const handleClickUpvote = async () => {
  if (!moemoeAccessToken) {
    useMessage(
      'You need to login to use upvote feature',
      '您需要登录使用推功能',
      'warn',
      5000
    )
    return
  }

  if (uid === props.toUid) {
    useMessage(
      'You cannot upvote your own topic',
      '您不可以推自己的话题',
      'warn'
    )
    return
  }

  if (moemoepoint < 1100) {
    useMessage(
      `Your moemoepoints are less than 1100, so you can't use the upvote feature`,
      '您的萌萌点不足 1100, 无法使用推功能',
      'warn'
    )
    return
  }

  await upvoteTopic()

  // if (props.rid === 0) {
  //   await upvoteTopic()
  // } else {
  //   await upvoteReply()
  // }
}
</script>

<template>
  <span
    class="upvote"
    :class="isUpvoted ? 'active' : ''"
    @click="handleClickUpvote"
  >
    <Icon class="icon" name="lucide:cherry" />
    <span v-if="upvoteCount">{{ upvoteCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.upvote {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  color: var(--kungalgame-font-color-2);

  .icon {
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .upvote {
    font-size: initial;
  }
}
</style>
