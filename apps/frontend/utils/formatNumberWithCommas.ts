export const formatNumberWithCommas = (number: number): string => {
  if (number >= 10000) {
    return (number / 1000).toFixed(1) + 'k'
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
