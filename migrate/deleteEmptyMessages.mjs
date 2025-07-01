import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MessageSchema = new mongoose.Schema(
  {
    mid: { type: Number, unique: true },
    sender_uid: { type: Number, required: true },
    receiver_uid: { type: Number, required: true },
    time: { type: Number, default: 0 },
    tid: { type: Number, default: 0 },
    gid: { type: Number, default: 0 },
    content: { type: String, default: '', maxlength: 233 },
    status: { type: String, default: 'unread' },
    type: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

MessageSchema.virtual('user', {
  ref: 'user',
  localField: 'sender_uid',
  foreignField: 'uid'
})

const MessageModel = mongoose.model('message', MessageSchema)

const deleteEmptyMessages = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log('Connected to MongoDB')

      const result = await MessageModel.deleteMany({ content: '' })

      console.log(`Deleted ${result.deletedCount} messages with empty content`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      await mongoose.disconnect()
      console.log('Disconnected from MongoDB')
    }
  }
}

deleteEmptyMessages()
