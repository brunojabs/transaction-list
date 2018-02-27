import TransactionModel from './transaction-model'

describe('TransactionModel', () => {
  it('should convert numbers correctly', () => {
    let transaction = new TransactionModel()
    transaction.value = "1.234,10"
    expect(transaction.valueAsNumber).toEqual(1234.10)
  })
})
