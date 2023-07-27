// Truncate string function. Used for chart data labels.
export function truncateString(str: string, num: number) {
  // If the length of string is less than or equal to num just return string.
  if (str.length <= num) {
    return str
  }
  // Return string truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "..."
}

// Percentage that a value takes from total
export function percentageOfTotal(total: number, value: number) {
  // Calculates percentage and cuts the decimal value to 2 places
  let result = ((value / total) * 100).toFixed(2)
  return result
}

// Returns the current year
export function currentYear() {
  const currentISODate = new Date()
  const [currentDateOnly] = currentISODate.toISOString().split("T")
  const currentYear = currentDateOnly.split("-")[0]

  return currentYear
}
