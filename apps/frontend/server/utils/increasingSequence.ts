import type { Document } from 'mongoose'

/**
 * Generic function to generate an increasing sequence for a given model and field.
 * @param {String} fieldName - The name of the field to be incremented.
 * @param {Number} startSeq - The starting sequence number.
 * @returns {Function} - A pre-save middleware function to be used in the schema.
 */
type PreSaveMiddleware<T extends Document> = (
  this: T,
  next: (error?: Error) => void
) => Promise<void>

function increasingSequence(
  fieldName: string,
  startSeq = 1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): PreSaveMiddleware<any> {
  return async function (next) {
    if (!this.isNew) {
      return next()
    }

    try {
      const lastTopic = await this.constructor
        .findOne({}, { [fieldName]: 1 })
        .sort({ [fieldName]: -1 })

      if (lastTopic) {
        this[fieldName] = (lastTopic[fieldName] as number) + 1
      } else {
        this[fieldName] = startSeq
      }

      next()
    } catch (error) {
      return next(error as Error)
    }
  }
}

export default increasingSequence
