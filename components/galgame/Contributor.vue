<script setup lang="ts">
defineProps<{
  views: number
}>()

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data } = await useFetch(`/api/galgame/${gid.value}/contributor`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <h2>贡献者</h2>
  <div class="contributor" v-if="data">
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
        message: { en: 'Views', zh: '浏览数' },
        position: 'bottom'
      }"
    >
      <span><Icon name="lucide:mouse-pointer-click" /></span>
      <span>{{ views }}</span>
    </span>
  </div>
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
