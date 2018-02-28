import TransactionModel from './transaction-model'
import moment from 'moment'

describe('TransactionModel', () => {
  it('should convert numbers correctly', () => {
    let transaction = new TransactionModel('1.234,10', 'test')
    expect(transaction.valueAsNumber()).toEqual(1234.10)
  })

  it('should start with default date', () => {
    let transaction = new TransactionModel('1.234,10', 'test')
    expect(transaction.createdAt).toEqual(moment().format('DD/MM/YYYY'))
  })
})
