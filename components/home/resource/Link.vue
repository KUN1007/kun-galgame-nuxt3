<script setup lang="ts">
import {
  typeIconMap,
  platformIconMap
} from '~/components/galgame/utils/iconMap'
import type { HomeGalgameResources } from '~/types/api/home'

defineProps<{
  link: HomeGalgameResources
}>()

const { locale } = useI18n()

const { uid } = usePersistUserStore()
const { rewriteResourceId } = storeToRefs(useTempGalgameResourceStore())
</script>

<template>
  <div class="title">
    <NuxtLinkLocale :to="`/galgame/${link.gid}`">
      {{ getPreferredLanguageText(link.name, locale as Language) }}
    </NuxtLinkLocale>
    <span class="time">
      {{ formatTimeDifferenceHint(link.time, locale) }}
    </span>
  </div>

  <div class="link">
    <div class="base">
      <div class="info">
        <span class="rewrite" v-if="link.grid === rewriteResourceId">
          <Icon name="svg-spinners:12-dots-scale-rotate" />
          <span>{{ $t('galgame.resource.edit') }}</span>
        </span>
        <span>
          <Icon :name="typeIconMap[link.type]" />
          <span>{{ $t(`galgame.resource.type.${link.type}`) }}</span>
        </span>
        <span>
          <Icon name="lucide:database" />
          <span>{{ link.size }}</span>
        </span>
        <span>
          <Icon :name="platformIconMap[link.platform]" />
          <span>{{ $t(`galgame.resource.platform.${link.platform}`) }}</span>
        </span>
        <span>
          {{ $t(`galgame.resource.language.${link.language}`) }}
        </span>
      </div>

      <div class="status">
        <GalgameResourceLike
          v-if="uid !== link.uid"
          :gid="link.gid"
          :grid="link.grid"
          :to-uid="link.uid"
          :likes="link.likes"
          v-tooltip="{
            message: { en: 'Like', zh: '点赞' },
            position: 'bottom'
          }"
        />

        <NuxtLinkLocale
          v-if="uid !== link.uid"
          to="/report"
          aria-label="Report violation"
          v-tooltip="{
            message: { en: 'Report violation', zh: '举报违规' },
            position: 'bottom'
          }"
        >
          <Icon name="lucide:triangle-alert" />
        </NuxtLinkLocale>

        <span
          class="status-dot"
          :class="`status-${link.status}`"
          v-tooltip="{
            message: {
              en: link.status ? 'Link expired' : 'Link valid',
              zh: link.status ? '链接过期' : '链接有效'
            },
            position: 'bottom'
          }"
        ></span>
      </div>
    </div>

    <KunDivider margin="0 0 17px 0" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  width: 100%;
  font-size: 18px;
  margin-bottom: 7px;

  a {
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .time {
    color: var(--kungalgame-font-color-0);
    font-size: small;
    font-weight: initial;
    margin-left: 17px;
    white-space: nowrap;
  }
}

.base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px;
  margin-bottom: 10px;

  & > span {
    padding: 3px 7px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: medium;
    margin-right: 5px;
  }
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: auto;

  & > span,
  a {
    color: var(--kungalgame-font-color-3);
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-0 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-green-4);
  border-radius: 50%;
}

.status-1 {
  width: 10px;
  height: 10px;
  background-color: var(--kungalgame-red-4);
  border-radius: 50%;
}
</style>
