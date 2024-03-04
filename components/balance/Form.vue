<script setup lang="ts">
import type {
  BalanceIncome,
  BalanceExpenditure,
  PLStatement
} from '~/types/api/balance'

const props = defineProps<{
  isIncome: boolean
  incomeData?: BalanceIncome[]
  expenditureData?: BalanceExpenditure[]
  statement: PLStatement
}>()

const { isIncome, incomeData, expenditureData, statement } = toRefs(props)
</script>

<template>
  <div class="form" :class="$props.isIncome ? '' : 'expenditure-form'">
    <div v-if="isIncome" class="title">{{ $t(`balance.income`) }}</div>
    <div v-if="!isIncome" class="title">{{ $t(`balance.expenditure`) }}</div>

    <div class="container">
      <BalanceLog :is-income="isIncome" :data="incomeData" />
      <BalanceLog :is-income="isIncome" :data="expenditureData" />
    </div>

    <div v-if="isIncome" class="sum">
      {{ $t(`balance.totalIncome`) }}:
      {{ statement.totalIncome }}
      USDT
    </div>

    <div v-if="!isIncome" class="sum">
      {{ $t(`balance.totalExpenditure`) }}:
      {{ statement.totalExpenditure }}
      USDT
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  width: 460px;
  margin: 0 10px;
  height: 300px;
  border: 1px solid var(--kungalgame-blue-5);
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
  }

  .container {
    flex-grow: 1;
    padding: 10px;
    overflow-y: scroll;
    scrollbar-width: thin;
  }

  .sum {
    height: 40px;
    font-size: 18px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-0);
  }
}

.expenditure-form {
  border: 1px solid var(--kungalgame-red-4);

  .title {
    border-bottom: 1px solid var(--kungalgame-red-4);
    background-color: var(--kungalgame-trans-pink-0);
  }

  .sum {
    border-top: 1px solid var(--kungalgame-red-4);
    background-color: var(--kungalgame-trans-pink-0);
  }
}

@media (max-width: 1000px) {
  .form {
    width: 100%;
  }
}
</style>
