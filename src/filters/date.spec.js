import Date from './date'
import moment from 'moment'

describe('Date', () => {
  it('should format date correctly', () => {
    let date = new Date()
    expect(Date(date)).toEqual(moment().format('DD/MM/YYYY'))
  })

  it('should not format invalid date', () => {
    console.warn = jest.genMockFunction();
    expect(Date('31/02/2018')).toEqual('Invalid date')
  })
})
