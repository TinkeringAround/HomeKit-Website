import moment from 'moment'
import 'moment/locale/de'
import { ColorSchemeId } from '@nivo/colors'

// Types
import { TScale } from '../Types'

//-----------------------------------------------
export const typeToLegend = (type: string): string => {
  switch (type) {
    case 'temperature':
      return 'Temperatur in ' + typeToUnit(type)
    case 'humidity':
      return 'Feuchtigkeit in ' + typeToUnit(type)
    case 'battery':
      return 'Batteriespannung in ' + typeToUnit(type)
    default:
      return ''
  }
}

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

export const typeToColor = (type: string): ColorSchemeId => {
  switch (type) {
    case 'temperature':
      return 'pastel1'
    case 'humidity':
      return 'pastel2'
    case 'battery':
      return 'category10'
    default:
      return 'greys'
  }
}

//-----------------------------------------------
export const typeToUnit = (type: string) => {
  switch (type) {
    case 'temperature':
      return '°C'
    case 'humidity':
      return '%'
    case 'battery':
      return 'V'
    default:
      return ''
  }
}

export const typeToScale = (type: string): TScale => {
  switch (type) {
    case 'temperature':
      return { min: 0, max: 35 }
    case 'humidity':
      return { min: 0, max: 80 }
    case 'battery':
      return { min: 2, max: 3.8 }
    default:
      return { min: 'auto', max: 'auto' }
  }
}

export const parseMeasurement = (type: string, value: string): string => {
  if (type === 'battery') return (parseInt(value) / 1000).toString()
  else return value
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

//-------------------------------------------------------------
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

//-------------------------------------------------------------
export const timestampToTime = (timestamp: string, count: number) => {
  if (timestamp === '') return ''

  const format = count < 50 ? 'HH.mm' : 'DD.MM.YYYY'

  moment.locale('de')
  return moment
    .unix(parseInt(timestamp))
    .subtract(1, 'hour')
    .format(format)
}

export const valueCountToSteps = (count: number): string => {
  if (count < 10) return 'every hour'
  else if (count >= 10 && count < 50) return 'every 6 hours'
  else if (count >= 50 && count < 150) return 'every day'
  else if (count >= 150 && count < 1000) return 'every 2 days'
  else return 'every 5 days'
}

export const valueCountToFormat = (count: number): string => {
  if (count < 50) return '%H.%M'
  else return '%d.%m.%Y'
}

export const valueCountToAxisBottom = (count: number): string => {
  if (count < 50) return '%H.%M Uhr'
  else return '%d.%m.%Y'
}
