import { mount } from '@vue/test-utils'

import TransactionList from './TransactionList'
import TransactionModel from '../../models/transaction-model'

describe('TransactionList', () => {
  let transactionList = [
    new TransactionModel('1000.20', 'Investimento', new Date()),
    new TransactionModel('2000.10', 'Investimento', new Date()),
    new TransactionModel('-1000.90', 'Investimento passado', new Date(2016, 6, 4, 12, 30, 0, 0))
  ]

  let configuration = {
    transactions: transactionList
  }

  beforeEach(function () {
    transactionList = mount(TransactionList, {
      propsData: configuration
    })
  })

  it('calculate the total amount', () => {
    expect(transactionList.vm.total_amount).toEqual(1999.40)
  })

  it('sort the total list by date with older in last position', () => {
    expect(transactionList.vm.sorted_transactions[2].value).toEqual('-1000.90')
  })
})
