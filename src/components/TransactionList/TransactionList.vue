<template>
  <section class="transaction-view">
    <ul class="transaction-list">
      <li class="f-row transaction-list__title">
        <span class="transaction-list__date">Transaction date</span>
        <span class="f-col">Description</span>
        <span class="transaction-list__amount">Amount</span>
        <span class="transaction-list__actions">Actions</span>
      </li>
      <transition-group name="fade">
        <li class="f-row transaction-list__item" v-for="(item, key) in sorted_transactions" :key="key">
          <span class="transaction-list__date">{{ item.createdAt | date }}</span>
          <span class="f-col">{{ item.description }}</span>
          <span class="transaction-list__amount">R$ {{ item.value }}</span>
          <span class="transaction-list__actions"><a @click="$_remove(item)">Remove</a></span>
        </li>
      </transition-group>
    </ul>
    <div class="transaction-list__total">
      <span class="transaction-list__total-label">Total:</span>
      R$ {{ total_amount }}
    </div>
  </section>
</template>
<style lang="less">
@item-padding: 5px;
@actions-size: 100px;
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

  &__actions {
    flex-basis: @actions-size;
    text-align: left;
    a {
      cursor: pointer;
    }
  }

  &__total {
    float: right;
    text-align: left;
    width: 150px + @item-padding + @actions-size;
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
import moment from 'moment'

export default {
  filters: {
    date: dateFilter
  },
  computed: {
    total_amount () {
      if (!this.transactions.length) return 0
      return this.transactions.reduce((acumulador, actual) => {
        return acumulador + actual.valueAsNumber()
      }, 0).toFixed(2)
    },
    sorted_transactions () {
      let sorted = this.transactions.slice()
      return sorted.sort((a, b) => {
        return moment(b.createdAt).format('X') - moment(a.createdAt).format('X')
      })
    }
  },
  methods: {
    $_remove (item) {
      const index = this.transactions.indexOf(item)
      if (index > -1) {
        this.transactions.splice(index, 1)
        localStorage.setItem('transactions', JSON.stringify(this.transactions))
      }
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
