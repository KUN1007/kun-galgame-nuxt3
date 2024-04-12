<script setup lang="ts">
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
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.contributor {
  display: flex;
}
</style>
