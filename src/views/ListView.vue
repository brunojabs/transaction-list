<template>
  <section class="list-view">
    <h2>Add transaction</h2>
    <custom-input
      label="Transaction value"
      mask="money"
      :value="transaction.value"
      v-model="transaction.value"
      name="transaction">
    </custom-input>
    <custom-input
      label="Transaction description"
      v-model="transaction.description"
      :value="transaction.description"
      name="transaction">
    </custom-input>
    <button @click="$_saveTransaction"></button>
  </section>
</template>
<script>
import CustomInput from '@/components/CustomInput/CustomInput'
import TransactionModel from '@/models/transaction-model'

export default {
  components: {
    CustomInput
  },
  data () {
    return {
      transaction: new TransactionModel()
    }
  },
  methods: {
    $_saveTransaction () {
      console.log(this.transaction)
      this.transaction = new TransactionModel()
    }
  }
}
</script>
