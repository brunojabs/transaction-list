<template>
  <section class="list-view">
    <h2>Add transaction</h2>
    <div class="list-view__form">
      <custom-input
        label="Value:"
        mask="money"
        class="list-view__value-input"
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
      <custom-input
        label="Creation Date:"
        class="list-view__date-input"
        mask="99/99/9999"
        v-model="transaction.createdAt"
        :value="transaction.createdAt"
        name="transaction">
      </custom-input>
      <button class="tl-button" @click="$_saveTransaction">Save</button>
    </div>
    <transaction-list :transactions="transactions"></transaction-list>
  </section>
</template>
<style lang="less">
@import '../assets/styles/main';

.list-view {

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;

    .custom-input {
      margin-right: 10px;
    }
  }

  &__date-input {
    max-width: 120px;
  }

  &__value-input {
    max-width: 120px;
  }
}
</style>

<script>
import CustomInput from '@/components/CustomInput/CustomInput'
import TransactionList from '@/components/TransactionList/TransactionList'
import TransactionModel from '@/models/transaction-model'
import moment from 'moment'

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
      this.transaction.createdAt = moment(this.transaction.createdAt, 'DD/MM/YYYY', true)
      debugger
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
