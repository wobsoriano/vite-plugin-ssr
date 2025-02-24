export { joinEnglish }

import { assert } from './assert'

// https://stackoverflow.com/questions/53879088/join-an-array-by-commas-and-and/53879103#53879103
function joinEnglish(arr: string[], conjunction: 'or' | 'and'): string {
  assert(arr.length > 0)
  if (arr.length === 1) return arr[0]!
  const firsts = arr.slice(0, arr.length - 1)
  const last = arr[arr.length - 1]
  return firsts.join(', ') + ` ${conjunction} ` + last
}
