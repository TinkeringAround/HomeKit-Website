export const hexToRGBA = (hexColor: string, opacity: string) => {
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
