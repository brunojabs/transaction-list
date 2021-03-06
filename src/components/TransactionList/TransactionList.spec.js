import { mount } from '@vue/test-utils'
import moment from 'moment'
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

  it('calculate the negative amount', () => {
    expect(transactionList.vm.negative_amount).toEqual(-1000.90)
  })

  it('calculate the positive amount', () => {
    expect(transactionList.vm.positive_amount).toEqual(3000.30)
  })

  it('sort the total list by date with older in last position', () => {
    expect(transactionList.vm.sorted_transactions[2].value).toEqual('-1000.90')
  })

  it('should display data in brazilian format', () => {
    expect(transactionList.find('.transaction-list__date-value').text()).toEqual(moment().format('DD/MM/YYYY'))
  })

  it('should display all the transactions', () => {
    expect(transactionList.findAll('.transaction-list__item').length).toEqual(3)
  })

  it('should remove a item', () => {
    transactionList.find('.transaction-list__actions-remove').trigger('click')
    expect(transactionList.vm.transactions.length).toEqual(2)
  })
})
