import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const GalgameSchema = new mongoose.Schema(
  {
    gid: { type: Number, unique: true },
    vndb_id: { type: String, required: true },
    uid: { type: Number, required: true },
    name: {
      'en-us': { type: String, default: '', maxlength: 100007 },
      'ja-jp': { type: String, default: '', maxlength: 100007 },
      'zh-cn': { type: String, default: '', maxlength: 100007 },
      'zh-tw': { type: String, default: '', maxlength: 100007 }
    },
    banner: { type: String, default: '', maxlength: 1007 },
    introduction: {
      'en-us': { type: String, default: '', maxlength: 100007 },
      'ja-jp': { type: String, default: '', maxlength: 100007 },
      'zh-cn': { type: String, default: '', maxlength: 100007 },
      'zh-tw': { type: String, default: '', maxlength: 100007 }
    },
    content_limit: { type: String, default: 'sfw', maxlength: 10 },

    time: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    type: { type: [String], default: [] },
    language: { type: [String], default: [] },
    platform: { type: [String], default: [] },
    contributor: { type: [Number], default: [] },
    likes: { type: [Number], default: [] },
    favorites: { type: [Number], default: [] },

    series: { type: [Number], default: [] },
    resources: { type: [Number], default: [] },
    links: { type: [Number], default: [] },
    histories: { type: [Number], default: [] },
    comments: { type: [Number], default: [] },

    alias: { type: [String], default: [] },
    official: { type: [String], default: [] },
    engine: { type: [String], default: [] },
    tags: { type: [String], default: [] }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

GalgameSchema.virtual('user', {
  ref: 'user',
  localField: 'uid',
  foreignField: 'uid'
})

const GalgameModel = mongoose.model('galgame', GalgameSchema)

const deleteEmptyMessages = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log('Connected to MongoDB')

      await GalgameModel.updateMany({}, { content_limit: 'sfw' })

      console.log(`Update successfully!`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      await mongoose.disconnect()
      console.log('Disconnected from MongoDB')
    }
  }
}

deleteEmptyMessages()
