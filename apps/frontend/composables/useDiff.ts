// Note: <b /> ++, <strong /> --

export const useDiff = (str1: string, str2: string): string => {
  const dp: number[][] = []
  for (let i = 0; i <= str1.length; i++) {
    dp[i] = []
    for (let j = 0; j <= str2.length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  let lcs = ''
  let i = str1.length
  let j = str2.length
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  let diff = ''
  let idx1 = 0
  let idx2 = 0
  for (let k = 0; k < lcs.length; k++) {
    while (str1[idx1] !== lcs[k]) {
      diff += `<b>${str1[idx1++]}</b>`
    }
    while (str2[idx2] !== lcs[k]) {
      diff += `<strong>${str2[idx2++]}</strong>`
    }
    diff += `${lcs[k]}`
    idx1++
    idx2++
  }

  while (idx1 < str1.length) {
    diff += `<b>${str1[idx1++]}</b>`
  }
  while (idx2 < str2.length) {
    diff += `<strong>${str2[idx2++]}</strong>`
  }

  return diff.trim()
}
