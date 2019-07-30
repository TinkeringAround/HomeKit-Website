//const hours = new Date().getHours()
const isDayTime = true //hours > 7 && hours < 20

const colors = {
  // Background Colors
  white: '#FFF',
  dark: '#3E4555',

  // Text Colors
  headingDark: '#343842',
  darkYellow: '#F3AC07',
  paragraph: '#B0B8CE',

  // Element Colors
  yellow: '#FFEBC0',
  lightElement: '#EEF0F4',
  darkElement: '#333844'
}

export default {
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
      formular: colors.paragraph,
      heading: isDayTime ? colors.headingDark : colors.white,
      headingInverse: isDayTime ? colors.white : colors.headingDark,
      paragraph: isDayTime ? colors.darkYellow : colors.paragraph,

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
