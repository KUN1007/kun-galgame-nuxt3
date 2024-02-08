<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.balance.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.balance.description'),
    },
  ],
})

const { income, expenditure } = storeToRefs(useTempBalanceStore())

const { data: incomeData } = await useFetch(`/api/balance/income`, {
  method: 'GET',
  query: {
    page: income.value.page,
    limit: income.value.limit,
    sortField: income.value.sortField,
    sortOrder: income.value.sortOrder,
  },
  watch: false,
  ...kungalgameResponseHandler,
})

const { data: expenditureData } = await useFetch(`/api/balance/expenditure`, {
  method: 'GET',
  query: {
    page: expenditure.value.page,
    limit: expenditure.value.limit,
    sortField: expenditure.value.sortField,
    sortOrder: expenditure.value.sortOrder,
  },
  watch: false,
  ...kungalgameResponseHandler,
})

const { data: statement } = await useFetch(`/api/balance/statement`, {
  method: 'GET',
  query: {
    page: expenditure.value.page,
    limit: expenditure.value.limit,
    sortField: expenditure.value.sortField,
    sortOrder: expenditure.value.sortOrder,
  },
  watch: false,
  ...kungalgameResponseHandler,
})
</script>

<template>
  <div class="root">
    <div class="article">
      <div class="title">{{ $t('balance.pl') }}</div>

      <div class="content">
        <BalanceForm
          v-if="incomeData && statement"
          :isIncome="true"
          :income-data="incomeData"
          :statement="statement"
        />
        <BalanceForm
          v-if="expenditureData && statement"
          :isIncome="false"
          :expenditure-data="expenditureData"
          :statement="statement"
        />
      </div>

      <div class="sum" v-if="statement">
        <div
          class="amount-status-deficit"
          :class="statement.profitLoss >= 0 ? 'amount-status-surplus' : ''"
        >
          <div>
            {{ $t('balance.status') }}:
            <span>{{
              statement.profitLoss >= 0
                ? $t('balance.surplusStatus')
                : $t('balance.deficitStatus')
            }}</span>
          </div>
          <div>
            {{
              statement.profitLoss >= 0
                ? $t('balance.surplusAmount')
                : $t('balance.deficitAmount')
            }}: {{ statement.profitLoss }} USDT
          </div>
        </div>
      </div>

      <KunFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 800px;
  color: var(--kungalgame-font-color-3);
}

.article {
  min-height: 500px;
  margin: auto;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 7px;
  box-shadow: var(--kungalgame-shadow-0);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.title {
  height: 60px;
  font-size: 30px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sum {
  margin-top: 30px;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.amount-status-deficit {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    padding: 5px;
    background-color: var(--kungalgame-red-4);
    color: var(--kungalgame-white);
  }

  & > div:last-child {
    background-color: var(--kungalgame-red-2);
  }
}

.amount-status-surplus {
  span {
    background-color: var(--kungalgame-green-4);
  }

  & > div:last-child {
    padding: 5px;
    color: var(--kungalgame-white);
    background-color: var(--kungalgame-green-4);
  }
}

@media (max-width: 1000px) {
  .root {
    width: 80%;
    height: 100%;
    margin: auto;
  }

  .content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

    div {
      &:nth-child(1) {
        margin-bottom: 20px;
      }
    }
  }

  .title {
    font-size: 20px;
  }

  .amount-status-deficit {
    flex-direction: column;

    div {
      &:nth-child(2) {
        margin-top: 20px;
      }
    }
  }
}

@media (max-width: 700px) {
  .root {
    width: 95%;
  }
  .content {
    width: 100%;
  }
}
</style>
