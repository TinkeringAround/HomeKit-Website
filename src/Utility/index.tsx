import moment from 'moment'
import 'moment/locale/de'
import { ColorSchemeId } from '@nivo/colors'

// Types
import { TScale, TDeviceType } from '../Types'

// ===============================================
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

export const typeToMeasurement = (type: string, value: string): string => {
  if (type === 'battery') return (parseInt(value) / 1000).toString()
  else return value
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

// ===============================================
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

// ===============================================
export const deviceTypeToName: (type: TDeviceType) => string = (type: TDeviceType) => {
  switch (type) {
    case 'sensor':
      return 'Sensor'
  }
}

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

export const deviceHasLowBattery = (battery: number) => battery < 2400

// ===============================================
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

// ===============================================
export const timestampToTime = (timestamp: string) => {
  if (timestamp === '') return ''

  const format = 'HH.mm DD.MM.YYYY'

  return moment
    .unix(parseInt(timestamp))
    .subtract(2, 'hour')
    .format(format)
}

// Consts
const ONE_DAY = 100
const TWO_DAYS = 200

export const valueCountToSteps = (count: number, isMobile: boolean): string => {
  if (isMobile) {
    if (count < ONE_DAY / 4) return 'every 4 hours'
    else if (count < ONE_DAY / 2) return 'every 8 hours'
    else return 'every day'
  } else {
    if (count < ONE_DAY) return 'every 2 hours'
    else if (count < TWO_DAYS) return 'every 6 hours'
    else return 'every 12 hours'
  }
}
