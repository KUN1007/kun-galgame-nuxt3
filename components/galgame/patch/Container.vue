<script setup lang="ts">
import {
  SUPPORTED_TYPE_MAP,
  SUPPORTED_PLATFORM_MAP,
  SUPPORTED_LANGUAGE_MAP
} from './constant'
import type { KunPatchResourceResponse, HikariResponse } from './types'

const props = defineProps<{
  vndbId: string
}>()

const resources = ref<KunPatchResourceResponse[]>([])
const isLoading = ref(false)

const fetchKunPatchResource = async (vndbId: string) => {
  isLoading.value = true
  const data = await fetch(`https://www.moyu.moe/api/hikari?vndb_id=${vndbId}`)
  const res = (await data.json()) as HikariResponse
  if (res.success) {
    resources.value = res.data ? res.data.resource : []
  }
  isLoading.value = false
}

onMounted(async () => {
  await fetchKunPatchResource(props.vndbId)
})
</script>

<template>
  <div v-if="resources.length" class="flex flex-col gap-3">
    <KunHeader name="补丁资源下载" scale="h2">
      <template #endContent>
        <p class="text-default-500 text-sm">
          下面是从
          <KunLink size="sm" href="https://www.moyu.moe/">
            鲲 Galgame 补丁
          </KunLink>
          获取到的 Galgame 补丁资源, 请杂鱼点击前往本站的补丁网站下载
        </p>
      </template>
    </KunHeader>

    <div class="space-y-2" v-for="resource in resources" :key="resource.id">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex flex-wrap items-center gap-1 rounded-lg">
          <KunBadge
            v-for="(t, index) in resource.type"
            :key="index"
            color="primary"
          >
            {{ SUPPORTED_TYPE_MAP[t] }}
          </KunBadge>
          <KunBadge color="warning">
            <KunIcon name="lucide:database" />
            {{ resource.size }}
          </KunBadge>
          <KunBadge
            v-for="(p, index) in resource.platform"
            :key="index"
            color="success"
          >
            {{ SUPPORTED_PLATFORM_MAP[p] }}
          </KunBadge>
          <KunBadge
            v-for="(l, index) in resource.language"
            :key="index"
            color="secondary"
          >
            {{ SUPPORTED_LANGUAGE_MAP[l] }}
          </KunBadge>
        </div>

        <div class="ml-auto flex items-center gap-1">
          <KunTooltip text="下载数">
            <KunButton
              :is-icon-only="true"
              variant="light"
              color="default"
              size="sm"
              class-name="gap-1"
            >
              <KunIcon name="lucide:download" />
              <span>{{ resource.download }}</span>
            </KunButton>
          </KunTooltip>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex gap-2">
          <div
            :class="
              cn(
                'flex size-8 shrink-0 cursor-pointer justify-center',
                'hover:ring-primary-500 rounded-full transition duration-150 ease-in-out hover:ring-2'
              )
            "
          >
            <KunImage
              :class="cn('inline-block rounded-full', 'size-8')"
              :src="resource.user.avatar"
              :alt="resource.user.name"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-xs">{{ resource.user.name }}</span>
            <span class="text-default-500 text-xs">
              {{
                `资源更新于 ${formatDate(resource.update_time, {
                  isPrecise: true,
                  isShowYear: true
                })}`
              }}
            </span>
          </div>
        </div>

        <KunButton
          size="sm"
          variant="flat"
          target="_blank"
          :href="`https://www.moyu.moe/patch/${resource.patch_id}/resource#kun_patch_resource_${resource.id}`"
          :icon="true"
        >
          前往下载页面
          <template #icon>
            <KunIcon name="lucide:external-link" />
          </template>
        </KunButton>
      </div>

      <KunDivider margin="0 0 17px 0" />
    </div>
  </div>
</template>
