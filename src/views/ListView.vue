<template>
  <section class="list-view">
    <h2>Add transaction</h2>
    <custom-input
      label="Value:"
      mask="money"
      :value="transaction.value"
      v-model="transaction.value"
      name="transaction">
    </custom-input>
    <custom-input
      label="Description:"
      v-model="transaction.description"
      :value="transaction.description"
      name="transaction">
    </custom-input>
    <button @click="$_saveTransaction">Save</button>
    <transaction-list :transactions="transactions"></transaction-list>
  </section>
</template>
<script>
import CustomInput from '@/components/CustomInput/CustomInput'
import TransactionList from '@/components/TransactionList/TransactionList'
import TransactionModel from '@/models/transaction-model'

export default {
  components: {
    CustomInput,
    TransactionList
  },
  data () {
    return {
      transaction: new TransactionModel(0, ''),
      transactions: []
    }
  },
  methods: {
    $_saveTransaction () {
      this.transaction.createdAt = new Date()
      this.transactions.push(this.transaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
      this.transaction = new TransactionModel(0, '')
    }
  },
  mounted () {
    let itens = localStorage.getItem('transactions')
    if (itens) {
      this.transactions = JSON.parse(itens).map((e) => {
        e.valueAsNumber = new TransactionModel(e.value, e.description).valueAsNumber
        return e
      })
    }
  }
}
</script>
