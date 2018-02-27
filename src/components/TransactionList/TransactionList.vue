<template>
  <section class="transaction-view">
    <ul class="transaction-list">
      <li class="f-row transaction-list__title">
        <span class="transaction-list__date">Transaction date</span>
        <span class="f-col">Description</span>
        <span class="transaction-list__amount">Amount</span>
      </li>
      <li class="f-row transaction-list__item" v-for="(item, key) in transactions" :key="key">
        <span class="transaction-list__date">{{ item.createdAt | date }}</span>
        <span class="f-col">{{ item.description }}</span>
        <span class="transaction-list__amount">R$ {{ item.value }}</span>
      </li>
    </ul>
    <div class="transaction-list__total">
      <span class="transaction-list__total-label">Total:</span>
      R$ {{ total_amount }}
    </div>
  </section>
</template>
<style lang="less">
@item-padding: 5px;
.transaction-view {
  max-width: 920px;
  margin: 0 auto;
}
.transaction-list {
  list-style: none;

  &__item {
    border-bottom: 1px solid gray;
    padding: @item-padding;
  }

  &__date {
    flex-basis: 150px;
    text-align: left;
  }

  &__amount {
    flex-basis: 150px;
    text-align: left;
  }

  &__total {
    float: right;
    text-align: left;
    width: 150px + @item-padding;
    display: block;
  }

  &__total-label {
    display: block;
    font-weight: bold;
    margin-top: @item-padding;
  }

  &__title {
    span {
      font-weight: bold;
    }
  }
}
</style>

<script>
import dateFilter from '@/filters/date'

export default {
  filters: {
    date: dateFilter
  },
  computed: {
    total_amount () {
      if (!this.transactions.length) return 0
      return this.transactions.reduce((acumulador, actual) => {
        return acumulador + actual.valueAsNumber()
      }, 0)
    },
    sorted_transactions () {
      let sorted = this.transactions.slice()
      return sorted.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }
  },
  props: {
    transactions: {
      type: Array,
      default: () => [],
      description: 'Transaction list'
    }
  }
}
</script>
