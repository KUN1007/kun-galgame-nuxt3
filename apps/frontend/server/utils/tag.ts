import TagModel from '../models/tag'
import mongoose from 'mongoose'

export const createTagsByTidAndRid = async (
  tid: number,
  rid: number,
  tagNames: string[],
  category: string[]
) => {
  const tagsArray = Array.isArray(tagNames) ? tagNames : JSON.parse(tagNames)
  const uniqueTagNames = [...new Set(tagsArray)]
  const createdTags = []

  for (const tagName of uniqueTagNames) {
    const newTag = new TagModel({ name: tagName, tid, rid, category })
    const savedTag = await newTag.save()
    createdTags.push(savedTag)
  }

  return createdTags
}

export const updateTagsByTidAndRid = async (
  tid: number,
  rid: number,
  tags: string[],
  category: string[]
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const tagsArray = tags

    const existingTags = await TagModel.find({ tid, rid })
    const existingTagNames = existingTags.map((tag) => tag.name)

    const tagsToAdd = tagsArray.filter((tag) => !existingTagNames.includes(tag))

    const tagsToRemove = existingTagNames.filter(
      (tag) => !tagsArray.includes(tag)
    )

    await createTagsByTidAndRid(tid, rid, tagsToAdd, category)

    for (const tagToRemove of tagsToRemove) {
      await TagModel.deleteOne({ tid, rid, name: tagToRemove })
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
}
