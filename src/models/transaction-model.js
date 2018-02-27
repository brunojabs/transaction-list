export default class TransactionModel {
  constructor () {
    this.value = 0
    this.description = ''
  }

  get valueAsNumber () {
    let newValue = this.value.replace(',', '.').replace(/[.](?=.*[.])/g, '')
    return Number(newValue)
  }
}
