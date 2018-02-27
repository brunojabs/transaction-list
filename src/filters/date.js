import moment from 'moment'

export default (date, format = 'DD/MM/YYYY', formatFrom) => {
  let dateFormated = ''

  if (formatFrom) {
    dateFormated = moment(date, formatFrom).format(format)
  } else {
    dateFormated = moment(date).format(format)
  }

  return dateFormated
}
