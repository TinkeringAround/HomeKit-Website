// ===============================================
export const colors = {
  // Background Colors
  white: '#FFF',
  dark: '#3E4555',
  light: '#DFE2EA',
  medium: '#606777',

  // TODO: Text Colors
  heading: '#343842',
  paragraph: '#B0B8CE',
  darkYellow: '#F3AC07',

  // Element Colors
  yellow: '#FFEBC0',
  lightElement: '#EEF0F4',
  darkElement: '#333844'
}

// ===============================================
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

      // Special Colors
      hoverBlack: 'rgba(0,0,0,0.05)'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  }
}
