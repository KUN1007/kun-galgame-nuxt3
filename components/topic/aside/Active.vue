<script setup lang="ts">
import { asideItem, sortItem } from '../utils/asideItem'
import type { SortField, SortOrder } from '~/types/api/reply'

const { replyRequest } = storeToRefs(useTempReplyStore())

const props = defineProps<{
  tags: string[]
  uid: number
}>()
const { tags, uid } = toRefs(props)

const handleSortReply = (sortField: SortField) => {
  useTempReplyStore().resetPageStatus()
  replyRequest.value.sortField = sortField
}

const handleClickSortOrder = (sortOrder: SortOrder) => {
  useTempReplyStore().resetPageStatus()
  replyRequest.value.sortOrder = sortOrder
}
</script>

<template>
  <div class="aside">
    <div class="sort">
      <div
        class="item"
        :class="replyRequest.sortField === item.sortField ? 'item-active' : ''"
        v-for="item in asideItem"
        :key="item.index"
        @click="handleSortReply(item.sortField)"
      >
        <span><Icon :name="item.icon" /></span>
        <span>{{ $t(`topic.aside.${item.name}`) }}</span>
      </div>

      <div class="order">
        <span
          :class="
            replyRequest.sortOrder === order.sortOrder ? 'order-active' : ''
          "
          v-for="order in sortItem"
          :key="order.index"
          @click="handleClickSortOrder(order.sortOrder)"
        >
          <Icon :name="order.icon" />
        </span>
      </div>
    </div>

    <TopicAsideOtherTag style="margin-bottom: 17px" :tags="tags" />
    <TopicAsideMaster :uid="uid" />
    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.aside {
  height: 940px;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  margin-right: 5px;
}

.sort {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;
  margin-bottom: 17px;
  box-shadow: var(--shadow);
  cursor: pointer;

  .item {
    width: 100%;
    display: flex;
    justify-content: space-around;

    span {
      padding: 7px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .order {
    width: 100%;
    display: flex;
    font-size: 20px;
    color: var(--kungalgame-blue-4);

    span {
      padding: 7px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.item-active {
  background-color: var(--kungalgame-trans-blue-2);
}

.order-active {
  background-color: var(--kungalgame-blue-4);
  color: var(--kungalgame-white);
}
</style>
