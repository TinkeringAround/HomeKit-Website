const hours = new Date().getHours()
const isDayTime = true //hours > 7 && hours < 20

export const colors = {
  // Background Colors
  white: '#fff',
  dark: '#3E4555',
  light: '#DFE2EA',
  middleDark: '#606777',

  // Text Colors
  headingDark: '#343842',
  darkYellow: '#F3AC07',
  paragraph: '#B0B8CE',

  // Element Colors
  yellow: '#FFEBC0',
  lightElement: '#EEF0F4',
  darkElement: '#333844'
}

export const theme = {
  global: {
    breakpoints: {
      xsmall: {
        value: 500
      },
      small: {
        value: 950
      },
      medium: {
        value: 1200
      },
      middle: {
        value: 1500
      },
      large: {
        value: 2000
      }
    },
    colors: {
      // All Colors
      ...colors,
      // Background Colors
      background: isDayTime ? colors.white : colors.dark,
      bgInverse: isDayTime ? colors.dark : colors.white,

      // Text Colors
      heading: isDayTime ? colors.headingDark : colors.white,
      headingInverse: isDayTime ? colors.white : colors.headingDark,

      // IoT
      deviceActive: isDayTime ? colors.yellow : colors.white,
      deviceInactive: isDayTime ? colors.lightElement : colors.darkElement,

      iconWrapperActive: isDayTime ? colors.darkYellow : colors.yellow,
      iconWrapperInactive: isDayTime ? colors.light : colors.middleDark,

      iconActive: isDayTime ? colors.white : colors.darkYellow,
      iconInactive: colors.paragraph,

      headingActive: isDayTime ? colors.darkYellow : colors.middleDark,
      headingInactive: isDayTime ? colors.paragraph : colors.white,

      // TODO: Bis hierher richtige Farben....
      paragraph: isDayTime ? colors.darkYellow : colors.headingDark,

      // Element Colors
      active: isDayTime ? colors.yellow : colors.white,
      inactive: isDayTime ? colors.lightElement : colors.darkElement
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  },
  button: {
    color: isDayTime ? colors.headingDark : colors.darkYellow,
    primary: {
      color: isDayTime ? colors.lightElement : colors.yellow
    },
    border: {
      radius: '25px',
      color: 'transparent'
    }
  }
}
