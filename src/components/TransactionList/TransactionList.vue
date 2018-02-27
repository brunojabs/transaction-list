<template>
  <section>
    <ul>
      <li v-for="(item, key) in transactions" :key="key">
        {{ item.createdAt | date }}
        {{ item.description }}
        {{ item.value }}
      </li>
    </ul>
    <p> {{ total_amount }} </p>
  </section>
</template>
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
