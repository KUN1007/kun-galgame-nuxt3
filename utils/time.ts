/**
 * Get the number of hours that have passed based on a timestamp.
 */

import dayjs from 'dayjs'

export const hourDiff = (upvote_time: number, hours: number) => {
  // Check if upvote_time is valid, as it may be initialized to 0 by the backend
  if (upvote_time === 0 || upvote_time === undefined) {
    return false
  }

  // Get the current time
  const currentTime = dayjs()

  // Get upvote_time, assuming upvote_time is a UNIX timestamp
  const upvoteTime = dayjs(upvote_time)

  // Calculate the time difference and return the comparison result
  return currentTime.diff(upvoteTime, 'hour') <= hours
}
