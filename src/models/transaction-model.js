export default class TransactionModel {
  constructor (value, description, date = '') {
    this.value = value
    this.description = description
    this.createdAt = date
  }

  valueAsNumber () {
    let value = 0
    if (this.value && this.value.replace) {
      value = Number(this.value.replace(',', '.').replace(/[.](?=.*[.])/g, ''))
    }
    return value
  }
}
