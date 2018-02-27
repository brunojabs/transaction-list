export default class TransactionModel {
  constructor (value, description, date = '') {
    this.value = value
    this.description = description
    this.createdAt = date
  }

  valueAsNumber () {
    let newValue = this.value.replace(',', '.').replace(/[.](?=.*[.])/g, '')
    return Number(newValue)
  }
}
