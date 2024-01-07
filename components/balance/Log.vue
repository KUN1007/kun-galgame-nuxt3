<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  isIncome: boolean
  data?: BalanceIncome[] | BalanceExpenditure[]
}>()

const data = computed(() => props.data)
</script>

<template>
  <div v-for="(kun, index) in data" :key="index">
    <div class="log" :class="props.isIncome ? '' : 'expenditure-log'">
      <div class="reason" v-html="kun.reason"></div>

      <div class="result">
        <span class="date">{{ dayjs(kun.time).format('YYYY/MM/DD') }}</span>
        <span class="amount">{{ kun.amount }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log {
  margin-top: 20px;
  border-bottom: 1px solid var(--kungalgame-blue-4);

  .reason {
    border-left: 5px solid var(--kungalgame-blue-4);
    padding-left: 5px;
  }

  .result {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .date {
      letter-spacing: 1px;
    }

    .amount {
      padding: 0 5px;
      background-color: var(--kungalgame-blue-2);
    }
  }
}

.expenditure-log {
  border-bottom: 1px solid var(--kungalgame-red-4);
  .reason {
    border-left: 5px solid var(--kungalgame-red-4);
  }
  .result .amount {
    background-color: var(--kungalgame-red-2);
  }
}
</style>
