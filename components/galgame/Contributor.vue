<script setup lang="ts">
defineProps<{
  data: KunUser[]
  pending: boolean
  views: number
}>()
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('galgame.contributors') }}
    </template>
  </KunHeader>

  <div class="contributor" v-if="data && !pending">
    <KunAvatar
      size="30px"
      v-for="(user, index) in data"
      :key="index"
      :user="user"
      v-tooltip="{
        message: user.name,
        position: 'bottom'
      }"
    />

    <span
      v-if="views > 0"
      class="views"
      v-tooltip="{
        message: {
          'en-us': 'Views',
          'ja-jp': '閲覧数',
          'zh-cn': '浏览数',
          'zh-tw': '瀏覽數'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:mouse-pointer-click" />
      <span>{{ views }}</span>
    </span>
  </div>
  <KunSkeletonGalgameContributor v-if="pending" />
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.contributor {
  display: flex;
  margin-bottom: 17px;
}

.views {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  user-select: none;

  span {
    display: flex;
    margin-right: 3px;
  }

  &:nth-child(1) span {
    color: var(--kungalgame-red-4);
  }
}
</style>
