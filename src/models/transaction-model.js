export default class TransactionModel {
  constructor (value, description, date = '') {
    this.value = value
    this.description = description
    this.createdAt = date
  }

  valueAsNumber () {
    let value = 0
    if (this.value && this.value.replace) {
      const REMOVE_ALL_DOTS_EXCEPT_LAST = /[.](?=.*[.])/g
      value = Number(this.value.replace(',', '.').replace(REMOVE_ALL_DOTS_EXCEPT_LAST, ''))
    }
    return value
  }
}
