import moment from 'moment'

export default (date, format = 'DD/MM/YYYY', formatFrom) => {
  let dateFormated = ''

  try {
    if (formatFrom) {
      dateFormated = moment(date, formatFrom).format(format)
    } else {
      dateFormated = moment(date).format(format)
    }
  } catch (error) {
    dateFormated = 'Invalid date'
  }


  return dateFormated
}
