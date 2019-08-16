import moment from 'moment'
import 'moment/locale/de'

//-----------------------------------------------
export const hexToRGBA = (hexColor: string, opacity: string) => {
  if (hexColor === '#fff' || hexColor === '#FFF') return 'rgba(255, 255, 255, ' + opacity + ')'
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
  if (!result)
    throw new Error('Formatting Error with Input: ' + hexColor + ' and Opacity: ' + opacity)
  const rgba = result
    ? 'rgba(' +
      parseInt(result[1], 16) +
      ', ' +
      parseInt(result[2], 16) +
      ', ' +
      parseInt(result[3], 16) +
      ', ' +
      opacity +
      ')'
    : ''

  return rgba
}

//-----------------------------------------------
export const typeToUnit = (type: string) => {
  switch (type) {
    case 'temperature':
      return '°C'
    case 'humidity':
      return '%'
    default:
      return ''
  }
}

//-----------------------------------------------
export const deviceIsActive = (type: string, timestamp: string) => {
  if (type === '' || timestamp === '') return false

  if (isToday(timestamp)) {
    switch (type) {
      case 'sensor':
        return (
          moment.unix(parseInt(timestamp)).diff(moment.now(), 'hours') === 0 &&
          -moment.unix(parseInt(timestamp)).diff(moment.now(), 'minutes') < 30
        )
    }
  }
  return false
}

export const isToday = (timestamp: string) => {
  if (timestamp === '') return false
  return moment.unix(parseInt(timestamp)).isSame(moment.now(), 'days')
}

export const deviceLastActiveTime = (timestamp: string) => {
  if (timestamp === '') return ''

  moment.locale('de')
  return moment.unix(parseInt(timestamp)).format('HH.mm') + ' Uhr'
}

export const deviceLastActiveDate = (timestamp: string) => {
  if (timestamp === '') return ''

  moment.locale('de')
  return moment.unix(parseInt(timestamp)).format('Do MMMM')
}

export const timestampToDate = (timestamp: string) => {
  if (timestamp === '') return ''

  moment.locale('de')
  return moment.unix(parseInt(timestamp)).format('DD.MM.YYYY')
}

export const timestampToTime = (timestamp: string) => {
  if (timestamp === '') return ''

  moment.locale('de')
  return moment.unix(parseInt(timestamp)).format('HH.mm')
}

export const timestampsToArea = (start: string, end: string) => {
  if (start === '' || end === '') return ''

  moment.locale('de')
  const startDate = timestampToDate(start)
  const endDate = timestampToDate(end)

  if (moment.unix(parseInt(start)).isSame(moment.unix(parseInt(end)), 'day')) return startDate
  else return startDate + ' - ' + endDate
}

export const valueCountToSteps = (count: number): string => {
  if (count < 10) return 'every 5 minutes'
  else if (count >= 10 && count < 50) return 'every hour'
  else if (count >= 50 && count < 150) return 'every 3 hours'
  else if (count >= 150 && count < 1000) return 'every day'
  else return 'every 3 days'
}
