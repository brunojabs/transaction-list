<template>
  <section class="list-view">
    <h2>Transaction list</h2>
    <h4>You can add a minus sign in front of the value</h4>
    <div class="list-view__form">
      <custom-input
        label="Value:"
        mask="money"
        class="list-view__value-input"
        :value="transaction.value"
        data-vv-as="transactionValue"
        v-validate="'required'"
        :hasError="errors.has('transactionValue')"
        :errorMessage="errors.first('transactionValue')"
        v-model="transaction.value"
        name="transactionValue">
      </custom-input>
      <custom-input
        label="Description:"
        v-model="transaction.description"
        :value="transaction.description"
        data-vv-as="transactionDesc"
        v-validate="'required'"
        :hasError="errors.has('transactionDesc')"
        :errorMessage="errors.first('transactionDesc')"
        name="transactionDesc">
      </custom-input>
      <custom-input
        label="Creation Date:"
        class="list-view__date-input"
        v-validate="'required|date_format:DD/MM/YYYY'"
        mask="99/99/9999"
        v-model="transaction.createdAt"
        :value="transaction.createdAt"
        :hasError="errors.has('transactionCreation')"
        :errorMessage="errors.first('transactionCreation')"
        data-vv-as="transactionCreation"
        name="transactionCreation">
      </custom-input>
      <button class="tl-button" aria-label="Save new transaction" @click="$_saveTransaction">Save</button>
    </div>
    <transaction-list :transactions="transactions"></transaction-list>
  </section>
</template>
<style lang="less">
@import '../assets/styles/main';

.list-view {

  &__form {
    display: flex;
    align-items: end;
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

@media only screen and (max-width: 768px) {
  .list-view {
    max-width: 95%;
    margin: 0 auto;

    &__form {
      flex-wrap: wrap;
    }
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
      transaction: new TransactionModel(),
      transactions: []
    }
  },
  methods: {
    $_saveTransaction () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.transaction.createdAt = moment(this.transaction.createdAt, 'DD/MM/YYYY', true)
          this.transactions.push(this.transaction)
          localStorage.setItem('transactions', JSON.stringify(this.transactions))
          this.transaction = new TransactionModel(0, '')
          return
        }
        alert('Correct them errors!')
      })
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
