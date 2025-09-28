<script setup lang="ts">
const isExpand = ref(false)

const { data } = await useFetch(`/api/home`, {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="flex flex-col justify-between gap-3 rounded-lg lg:flex-row">
    <div class="w-full space-y-3">
      <HomeCarousel />

      <KunCard :is-hoverable="false" :is-transparent="false" color="primary">
        <div>
          <KunButton
            class-name="text-lg p-0"
            @click="() => (isExpand = !isExpand)"
            variant="light"
          >
            <span>关于 Galgame 补丁资源的说明</span>
            <KunIcon
              :name="isExpand ? 'lucide:chevron-down' : 'lucide:chevron-right'"
            />
          </KunButton>
          <p class="pt-2" v-if="isExpand">
            如果您想要寻找 Galgame 补丁资源, 请前往
            <KunLink target="_blank" :to="kungal.domain.patch">
              鲲 Galgame 补丁 (moyu.moe)
            </KunLink>
            , 本论坛是论坛社区网站, 补丁需要在我们的补丁站获取。如果
            <KunLink target="_blank" :to="kungal.domain.patch">
              moyu.moe
            </KunLink>
            没有您想要的补丁资源, 可以前往
            <KunLink target="_blank" to="https://www.ai2.moe">
              御爱同萌
            </KunLink>
          </p>
        </div>
      </KunCard>

      <HomeTopicContainer v-if="data" :topics="data.topics" />

      <HomeGalgameContainer v-if="data" :galgames="data.galgames" />

      <HomeFooter />
    </div>

    <div class="w-full shrink-0 space-y-3 lg:w-72">
      <HomeRecent v-if="data" :activities="data.activities" />
    </div>
  </div>
</template>
