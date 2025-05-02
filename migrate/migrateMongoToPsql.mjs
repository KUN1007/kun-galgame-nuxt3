#!/usr/bin/env node

import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables
dotenv.config()

const prisma = new PrismaClient()
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/kun-galgame'
const BATCH_SIZE = 100 // Process in batches to avoid memory issues

// Map to store old IDs to new IDs
const idMappings = {
  user: {}, // old uid -> new id
  topic: {}, // old tid -> new id
  reply: {}, // old rid -> new id
  galgame: {}, // old gid -> new id
  galgame_resource: {}, // old grid -> new id
  comment: {}, // old cid -> new id
  galgame_comment: {}, // old gcid -> new id
  chat_room: {}, // old crid -> new id
  chat_message: {}, // old cmid -> new id
  tag: {}, // old tag_id -> new id
  todo: {}, // old tid -> new id
  report: {}, // old rid -> new id
  message: {}, // old mid -> new id
  message_admin: {}, // old maid -> new id
  update_log: {}, // old ulid -> new id
  non_moe: {} // old nmid -> new id
}

// Connect to MongoDB
async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

// Load MongoDB models
async function loadMongoModels() {
  const modelsDir = path.join(process.cwd(), 'server', 'models')
  const modelFiles = fs
    .readdirSync(modelsDir)
    .filter((file) => file.endsWith('.ts') && !file.startsWith('index'))

  const models = {}

  for (const file of modelFiles) {
    try {
      const modelName = path.basename(file, '.ts')
      const modelPath = path.join(modelsDir, file)

      // Extract the model name from the file content
      const content = fs.readFileSync(modelPath, 'utf-8')
      const match = content.match(/mongoose\.model\(['"]([^'"]+)['"]/)

      if (match) {
        const mongoModelName = match[1]
        models[modelName] = mongoose.model(mongoModelName)
      }
    } catch (error) {
      console.error(`Failed to load model ${file}:`, error)
    }
  }

  return models
}

// Migrate Users
async function migrateUsers(userModel) {
  console.log('Migrating users...')

  const totalUsers = await userModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalUsers; skip += BATCH_SIZE) {
    const users = await userModel.find().skip(skip).limit(BATCH_SIZE)

    for (const user of users) {
      try {
        const newUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
            ip: user.ip || '',
            avatar: user.avatar || '',
            role: user.roles,
            status: user.status,
            time: new Date(user.time),
            moemoepoint: user.moemoepoint,
            bio: user.bio || '',
            upvote: user.upvote,
            like: user.like,
            dislike: user.dislike,
            daily_topic_count: user.daily_topic_count,
            daily_galgame_count: user.daily_galgame_count,
            daily_image_count: user.daily_image_count,
            daily_check_in: user.daily_check_in,
            created_at: user.created ? new Date(user.created) : new Date(),
            updated_at: user.updated ? new Date(user.updated) : new Date()
          }
        })

        idMappings.user[user.uid] = newUser.id
        processed++

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalUsers} users`)
        }
      } catch (error) {
        console.error(`Failed to migrate user ${user.uid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} users`)
}

// Migrate Topics
async function migrateTopics(topicModel) {
  console.log('Migrating topics...')

  const totalTopics = await topicModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalTopics; skip += BATCH_SIZE) {
    const topics = await topicModel.find().skip(skip).limit(BATCH_SIZE)

    for (const topic of topics) {
      try {
        const userId = idMappings.user[topic.uid]

        if (!userId) {
          console.warn(
            `Skipping topic ${topic.tid} - User ${topic.uid} not found`
          )
          continue
        }

        const newTopic = await prisma.topic.create({
          data: {
            title: topic.title,
            content: topic.content,
            user_id: userId,
            time: new Date(topic.time),
            view: topic.views,
            comment: topic.comments,
            upvote_time: topic.upvote_time ? new Date(topic.upvote_time) : null,
            status: topic.status,
            edited: topic.edited,
            created_at: topic.created ? new Date(topic.created) : new Date(),
            updated_at: topic.updated ? new Date(topic.updated) : new Date()
          }
        })

        idMappings.topic[topic.tid] = newTopic.id
        processed++

        // Create topic tags
        if (topic.tags && topic.tags.length > 0) {
          const tagPromises = topic.tags.map((tag) =>
            prisma.topic_tag.create({
              data: {
                topic_id: newTopic.id,
                tag: tag
              }
            })
          )
          await Promise.all(tagPromises)
        }

        // Create topic category
        if (topic.category && topic.category.length > 0) {
          const categoryPromises = topic.category.map((category) =>
            prisma.topic_tag.create({
              data: {
                topic_id: newTopic.id,
                tag: category,
                category: 'category'
              }
            })
          )
          await Promise.all(categoryPromises)
        }

        // Create topic section
        if (topic.section && topic.section.length > 0) {
          const sectionPromises = topic.section.map((section) =>
            prisma.topic_tag.create({
              data: {
                topic_id: newTopic.id,
                tag: section,
                section: 'section'
              }
            })
          )
          await Promise.all(sectionPromises)
        }

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalTopics} topics`)
        }
      } catch (error) {
        console.error(`Failed to migrate topic ${topic.tid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} topics`)
}

// Migrate Replies
async function migrateReplies(replyModel) {
  console.log('Migrating replies...')

  const totalReplies = await replyModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalReplies; skip += BATCH_SIZE) {
    const replies = await replyModel.find().skip(skip).limit(BATCH_SIZE)

    for (const reply of replies) {
      try {
        const topicId = idMappings.topic[reply.tid]
        const userId = idMappings.user[reply.r_uid]
        const toUserId = idMappings.user[reply.to_uid]

        if (!topicId || !userId || !toUserId) {
          console.warn(`Skipping reply ${reply.rid} - Missing related IDs`)
          continue
        }

        const newReply = await prisma.reply.create({
          data: {
            topic_id: topicId,
            user_id: userId,
            to_user_id: toUserId,
            floor: reply.floor,
            to_floor: reply.to_floor,
            time: new Date(reply.time),
            edited: reply.edited,
            content: reply.content,
            upvote_time: reply.upvote_time ? new Date(reply.upvote_time) : null,
            created_at: reply.created ? new Date(reply.created) : new Date(),
            updated_at: reply.updated ? new Date(reply.updated) : new Date()
          }
        })

        idMappings.reply[reply.rid] = newReply.id
        processed++

        // Create reply tags
        if (reply.tags && reply.tags.length > 0) {
          const tagPromises = reply.tags.map((tag) =>
            prisma.reply_tag.create({
              data: {
                reply_id: newReply.id,
                tag: tag
              }
            })
          )
          await Promise.all(tagPromises)
        }

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalReplies} replies`)
        }
      } catch (error) {
        console.error(`Failed to migrate reply ${reply.rid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} replies`)
}

// Migrate Galgames
async function migrateGalgames(galgameModel) {
  console.log('Migrating galgames...')

  const totalGalgames = await galgameModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalGalgames; skip += BATCH_SIZE) {
    const galgames = await galgameModel.find().skip(skip).limit(BATCH_SIZE)

    for (const galgame of galgames) {
      try {
        const userId = idMappings.user[galgame.uid]

        if (!userId) {
          console.warn(
            `Skipping galgame ${galgame.gid} - User ${galgame.uid} not found`
          )
          continue
        }

        const newGalgame = await prisma.galgame.create({
          data: {
            vndb_id: galgame.vndb_id,
            user_id: userId,
            name_en_us: galgame.name['en-us'] || null,
            name_ja_jp: galgame.name['ja-jp'] || null,
            name_zh_cn: galgame.name['zh-cn'] || null,
            name_zh_tw: galgame.name['zh-tw'] || null,
            banner: galgame.banner || '',
            intro_en_us: galgame.introduction['en-us'] || null,
            intro_ja_jp: galgame.introduction['ja-jp'] || null,
            intro_zh_cn: galgame.introduction['zh-cn'] || null,
            intro_zh_tw: galgame.introduction['zh-tw'] || null,
            content_limit: galgame.content_limit,
            time: new Date(galgame.time),
            status: galgame.status,
            view: galgame.views,
            created_at: galgame.created
              ? new Date(galgame.created)
              : new Date(),
            updated_at: galgame.updated ? new Date(galgame.updated) : new Date()
          }
        })

        idMappings.galgame[galgame.gid] = newGalgame.id
        processed++

        // Create galgame types
        if (galgame.type && galgame.type.length > 0) {
          const typePromises = galgame.type.map((type) =>
            prisma.galgame_type.create({
              data: {
                galgame_id: newGalgame.id,
                type: type
              }
            })
          )
          await Promise.all(typePromises)
        }

        // Create galgame languages
        if (galgame.language && galgame.language.length > 0) {
          const langPromises = galgame.language.map((lang) =>
            prisma.galgame_language.create({
              data: {
                galgame_id: newGalgame.id,
                language: lang
              }
            })
          )
          await Promise.all(langPromises)
        }

        // Create galgame platforms
        if (galgame.platform && galgame.platform.length > 0) {
          const platformPromises = galgame.platform.map((platform) =>
            prisma.galgame_platform.create({
              data: {
                galgame_id: newGalgame.id,
                platform: platform
              }
            })
          )
          await Promise.all(platformPromises)
        }

        // Create galgame aliases
        if (galgame.alias && galgame.alias.length > 0) {
          const aliasPromises = galgame.alias.map((alias) =>
            prisma.galgame_alias.create({
              data: {
                galgame_id: newGalgame.id,
                alias: alias
              }
            })
          )
          await Promise.all(aliasPromises)
        }

        // Create galgame officials
        if (galgame.official && galgame.official.length > 0) {
          const officialPromises = galgame.official.map((official) =>
            prisma.galgame_official.create({
              data: {
                galgame_id: newGalgame.id,
                url: official
              }
            })
          )
          await Promise.all(officialPromises)
        }

        // Create galgame engines
        if (galgame.engine && galgame.engine.length > 0) {
          const enginePromises = galgame.engine.map((engine) =>
            prisma.galgame_engine.create({
              data: {
                galgame_id: newGalgame.id,
                engine: engine
              }
            })
          )
          await Promise.all(enginePromises)
        }

        // Create galgame tags
        if (galgame.tags && galgame.tags.length > 0) {
          const tagPromises = galgame.tags.map((tag) =>
            prisma.galgame_tag.create({
              data: {
                galgame_id: newGalgame.id,
                tag: tag
              }
            })
          )
          await Promise.all(tagPromises)
        }

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalGalgames} galgames`)
        }
      } catch (error) {
        console.error(`Failed to migrate galgame ${galgame.gid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} galgames`)
}

// Migrate Galgame Resources
async function migrateGalgameResources(galgameResourceModel) {
  console.log('Migrating galgame resources...')

  const totalResources = await galgameResourceModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalResources; skip += BATCH_SIZE) {
    const resources = await galgameResourceModel
      .find()
      .skip(skip)
      .limit(BATCH_SIZE)

    for (const resource of resources) {
      try {
        const galgameId = idMappings.galgame[resource.gid]
        const userId = idMappings.user[resource.uid]

        if (!galgameId || !userId) {
          console.warn(
            `Skipping resource ${resource.grid} - Missing related IDs`
          )
          continue
        }

        const newResource = await prisma.galgame_resource.create({
          data: {
            galgame_id: galgameId,
            user_id: userId,
            type: resource.type || '',
            language: resource.language || '',
            platform: resource.platform || '',
            size: resource.size || '',
            code: resource.code || '',
            password: resource.password || '',
            note: resource.note || '',
            time: new Date(resource.time),
            status: resource.status,
            created_at: resource.created
              ? new Date(resource.created)
              : new Date(),
            updated_at: resource.updated
              ? new Date(resource.updated)
              : new Date()
          }
        })

        idMappings.galgame_resource[resource.grid] = newResource.id
        processed++

        // Create resource links
        if (resource.link && resource.link.length > 0) {
          const linkPromises = resource.link.map((link) =>
            prisma.galgame_resource_link.create({
              data: {
                galgame_resource_id: newResource.id,
                url: link
              }
            })
          )
          await Promise.all(linkPromises)
        }

        if (processed % 50 === 0) {
          console.log(
            `Processed ${processed}/${totalResources} galgame resources`
          )
        }
      } catch (error) {
        console.error(
          `Failed to migrate galgame resource ${resource.grid}:`,
          error
        )
      }
    }
  }

  console.log(`Completed migrating ${processed} galgame resources`)
}

// Migrate Comments
async function migrateComments(commentModel) {
  console.log('Migrating comments...')

  const totalComments = await commentModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalComments; skip += BATCH_SIZE) {
    const comments = await commentModel.find().skip(skip).limit(BATCH_SIZE)

    for (const comment of comments) {
      try {
        const topicId = idMappings.topic[comment.tid]
        const replyId = idMappings.reply[comment.rid]
        const userId = idMappings.user[comment.c_uid]
        const toUserId = idMappings.user[comment.to_uid]

        if (!topicId || !replyId || !userId || !toUserId) {
          console.warn(`Skipping comment ${comment.cid} - Missing related IDs`)
          continue
        }

        const newComment = await prisma.comment.create({
          data: {
            topic_id: topicId,
            reply_id: replyId,
            user_id: userId,
            to_user_id: toUserId,
            content: comment.content,
            created_at: comment.created
              ? new Date(comment.created)
              : new Date(),
            updated_at: comment.updated ? new Date(comment.updated) : new Date()
          }
        })

        idMappings.comment[comment.cid] = newComment.id
        processed++

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalComments} comments`)
        }
      } catch (error) {
        console.error(`Failed to migrate comment ${comment.cid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} comments`)
}

// Migrate Galgame Comments
async function migrateGalgameComments(galgameCommentModel) {
  console.log('Migrating galgame comments...')

  const totalComments = await galgameCommentModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalComments; skip += BATCH_SIZE) {
    const comments = await galgameCommentModel
      .find()
      .skip(skip)
      .limit(BATCH_SIZE)

    for (const comment of comments) {
      try {
        const galgameId = idMappings.galgame[comment.gid]
        const userId = idMappings.user[comment.c_uid]
        const toUserId = comment.to_uid ? idMappings.user[comment.to_uid] : null

        if (!galgameId || !userId) {
          console.warn(
            `Skipping galgame comment ${comment.gcid} - Missing related IDs`
          )
          continue
        }

        const newComment = await prisma.galgame_comment.create({
          data: {
            galgame_id: galgameId,
            user_id: userId,
            to_user_id: toUserId,
            content: comment.content,
            created_at: comment.created
              ? new Date(comment.created)
              : new Date(),
            updated_at: comment.updated ? new Date(comment.updated) : new Date()
          }
        })

        idMappings.galgame_comment[comment.gcid] = newComment.id
        processed++

        if (processed % 100 === 0) {
          console.log(
            `Processed ${processed}/${totalComments} galgame comments`
          )
        }
      } catch (error) {
        console.error(
          `Failed to migrate galgame comment ${comment.gcid}:`,
          error
        )
      }
    }
  }

  console.log(`Completed migrating ${processed} galgame comments`)
}

// Migrate Chat Rooms
async function migrateChatRooms(chatRoomModel) {
  console.log('Migrating chat rooms...')

  const totalRooms = await chatRoomModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalRooms; skip += BATCH_SIZE) {
    const rooms = await chatRoomModel.find().skip(skip).limit(BATCH_SIZE)

    for (const room of rooms) {
      try {
        const lastMessageSenderId =
          room.last_message && room.last_message.sender_uid
            ? idMappings.user[room.last_message.sender_uid]
            : null

        const newRoom = await prisma.chat_room.create({
          data: {
            name: room.name || '',
            avatar: room.avatar || '',
            type: room.type,
            last_message_content: room.last_message
              ? room.last_message.content || ''
              : '',
            last_message_time:
              room.last_message && room.last_message.time
                ? new Date(room.last_message.time)
                : null,
            last_message_sender_id: lastMessageSenderId,
            last_message_sender_name: room.last_message
              ? room.last_message.sender_name || ''
              : '',
            created_at: room.created ? new Date(room.created) : new Date(),
            updated_at: room.updated ? new Date(room.updated) : new Date()
          }
        })

        idMappings.chat_room[room.crid] = newRoom.id
        processed++

        // Create chat room participants
        if (room.participants && room.participants.length > 0) {
          for (const uid of room.participants) {
            const userId = idMappings.user[uid]
            if (userId) {
              await prisma.chat_room_participant.create({
                data: {
                  chat_room_id: newRoom.id,
                  user_id: userId
                }
              })
            }
          }
        }

        // Create chat room admins
        if (room.admins && room.admins.length > 0) {
          for (const uid of room.admins) {
            const userId = idMappings.user[uid]
            if (userId) {
              await prisma.chat_room_admin.create({
                data: {
                  chat_room_id: newRoom.id,
                  user_id: userId
                }
              })
            }
          }
        }

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalRooms} chat rooms`)
        }
      } catch (error) {
        console.error(`Failed to migrate chat room ${room.crid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} chat rooms`)
}

// Migrate Chat Messages
async function migrateChatMessages(chatMessageModel) {
  console.log('Migrating chat messages...')

  const totalMessages = await chatMessageModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalMessages; skip += BATCH_SIZE) {
    const messages = await chatMessageModel.find().skip(skip).limit(BATCH_SIZE)

    for (const message of messages) {
      try {
        // Find the chat room by name
        const chatRooms = await prisma.chat_room.findMany({
          where: {
            name: message.chatroom_name
          }
        })

        if (chatRooms.length === 0) {
          console.warn(
            `Skipping chat message ${message.cmid} - Chat room "${message.chatroom_name}" not found`
          )
          continue
        }

        const chatRoomId = chatRooms[0].id
        const senderId = idMappings.user[message.sender_uid]
        const receiverId = message.receiver_uid
          ? idMappings.user[message.receiver_uid]
          : null

        if (!senderId) {
          console.warn(
            `Skipping chat message ${message.cmid} - Sender ${message.sender_uid} not found`
          )
          continue
        }

        const newMessage = await prisma.chat_message.create({
          data: {
            chat_room_id: chatRoomId,
            chatroom_name: message.chatroom_name,
            sender_id: senderId,
            receiver_id: receiverId,
            content: message.content,
            time: new Date(message.time),
            status: message.status,
            is_recalled: message.is_recalled || false,
            recalled_time: message.recalled_time
              ? new Date(message.recalled_time)
              : null,
            created_at: message.created
              ? new Date(message.created)
              : new Date(),
            updated_at: message.updated ? new Date(message.updated) : new Date()
          }
        })

        idMappings.chat_message[message.cmid] = newMessage.id
        processed++

        // Create message read_by entries
        if (message.read_by && message.read_by.length > 0) {
          for (const readBy of message.read_by) {
            const userId = idMappings.user[readBy.uid]
            if (userId) {
              await prisma.chat_message_read_by.create({
                data: {
                  chat_message_id: newMessage.id,
                  user_id: userId,
                  read_time: new Date(readBy.read_time)
                }
              })
            }
          }
        }

        // Create message reactions
        if (message.reactions && message.reactions.length > 0) {
          for (const reaction of message.reactions) {
            const userId = idMappings.user[reaction.uid]
            if (userId) {
              await prisma.chat_message_reaction.create({
                data: {
                  chat_message_id: newMessage.id,
                  user_id: userId,
                  reaction: reaction.reaction
                }
              })
            }
          }
        }

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalMessages} chat messages`)
        }
      } catch (error) {
        console.error(`Failed to migrate chat message ${message.cmid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} chat messages`)
}

// Migrate Todo items
async function migrateTodos(todoModel) {
  console.log('Migrating todos...')

  const totalTodos = await todoModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalTodos; skip += BATCH_SIZE) {
    const todos = await todoModel.find().skip(skip).limit(BATCH_SIZE)

    for (const todo of todos) {
      try {
        // Assign the todo to the first admin user
        const adminUser = await prisma.user.findFirst({
          where: { role: { gte: 3 } }
        })

        if (!adminUser) {
          console.warn('Skipping todo - No admin user found')
          continue
        }

        const newTodo = await prisma.todo.create({
          data: {
            status: todo.status,
            content_en_us: todo.content['en-us'] || null,
            content_ja_jp: todo.content['ja-jp'] || null,
            content_zh_cn: todo.content['zh-cn'] || null,
            content_zh_tw: todo.content['zh-tw'] || null,
            time: new Date(todo.time),
            completed_time: todo.completed_time
              ? new Date(todo.completed_time)
              : null,
            user_id: adminUser.id,
            created_at: todo.created ? new Date(todo.created) : new Date(),
            updated_at: todo.updated ? new Date(todo.updated) : new Date()
          }
        })

        idMappings.todo[todo.todo_id] = newTodo.id
        processed++

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalTodos} todos`)
        }
      } catch (error) {
        console.error(`Failed to migrate todo ${todo.todo_id}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} todos`)
}

// Migrate Update Logs
async function migrateUpdateLogs(updateLogModel) {
  console.log('Migrating update logs...')

  const totalLogs = await updateLogModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalLogs; skip += BATCH_SIZE) {
    const logs = await updateLogModel.find().skip(skip).limit(BATCH_SIZE)

    for (const log of logs) {
      try {
        const newLog = await prisma.update_log.create({
          data: {
            type: log.type,
            content_en_us: log.content['en-us'] || null,
            content_ja_jp: log.content['ja-jp'] || null,
            content_zh_cn: log.content['zh-cn'] || null,
            content_zh_tw: log.content['zh-tw'] || null,
            time: log.time || '',
            version: log.version || '',
            created_at: log.created ? new Date(log.created) : new Date(),
            updated_at: log.updated ? new Date(log.updated) : new Date()
          }
        })

        idMappings.update_log[log.upid] = newLog.id
        processed++

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalLogs} update logs`)
        }
      } catch (error) {
        console.error(`Failed to migrate update log ${log.upid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} update logs`)
}

// Migrate Non-Moe entries
async function migrateNonMoe(nonMoeModel) {
  console.log('Migrating non-moe entries...')

  const totalEntries = await nonMoeModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalEntries; skip += BATCH_SIZE) {
    const entries = await nonMoeModel.find().skip(skip).limit(BATCH_SIZE)

    for (const entry of entries) {
      try {
        const userId = idMappings.user[entry.uid]

        if (!userId) {
          console.warn(
            `Skipping non-moe ${entry.nid} - User ${entry.uid} not found`
          )
          continue
        }

        const newEntry = await prisma.non_moe.create({
          data: {
            user_id: userId,
            name: entry.name,
            desc_en_us: entry.description['en-us'] || null,
            desc_ja_jp: entry.description['ja-jp'] || null,
            desc_zh_cn: entry.description['zh-cn'] || null,
            desc_zh_tw: entry.description['zh-tw'] || null,
            time: new Date(entry.time),
            result: entry.result,
            created_at: entry.created ? new Date(entry.created) : new Date(),
            updated_at: entry.updated ? new Date(entry.updated) : new Date()
          }
        })

        idMappings.non_moe[entry.nid] = newEntry.id
        processed++

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalEntries} non-moe entries`)
        }
      } catch (error) {
        console.error(`Failed to migrate non-moe ${entry.nid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} non-moe entries`)
}

// Migrate Messages
async function migrateMessages(messageModel) {
  console.log('Migrating messages...')

  const totalMessages = await messageModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalMessages; skip += BATCH_SIZE) {
    const messages = await messageModel.find().skip(skip).limit(BATCH_SIZE)

    for (const message of messages) {
      try {
        const senderId = idMappings.user[message.sender_uid]
        const receiverId = idMappings.user[message.receiver_uid]

        if (!senderId || !receiverId) {
          console.warn(`Skipping message ${message.mid} - Missing user IDs`)
          continue
        }

        const newMessage = await prisma.message.create({
          data: {
            sender_id: senderId,
            receiver_id: receiverId,
            time: new Date(message.time),
            topic_id: message.tid || 0,
            galgame_id: message.gid || 0,
            content: message.content,
            status: message.status,
            type: message.type,
            created_at: message.created
              ? new Date(message.created)
              : new Date(),
            updated_at: message.updated ? new Date(message.updated) : new Date()
          }
        })

        idMappings.message[message.mid] = newMessage.id
        processed++

        if (processed % 100 === 0) {
          console.log(`Processed ${processed}/${totalMessages} messages`)
        }
      } catch (error) {
        console.error(`Failed to migrate message ${message.mid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} messages`)
}

// Migrate Admin Messages
async function migrateAdminMessages(messageAdminModel) {
  console.log('Migrating admin messages...')

  const totalMessages = await messageAdminModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalMessages; skip += BATCH_SIZE) {
    const messages = await messageAdminModel.find().skip(skip).limit(BATCH_SIZE)

    for (const message of messages) {
      try {
        const userId = idMappings.user[message.uid]

        if (!userId) {
          console.warn(
            `Skipping admin message ${message.maid} - User ${message.uid} not found`
          )
          continue
        }

        // Find the first admin user to assign as the admin
        const adminUser = await prisma.user.findFirst({
          where: { role: { gte: 3 } }
        })

        if (!adminUser) {
          console.warn('Skipping admin message - No admin user found')
          continue
        }

        const newMessage = await prisma.message_admin.create({
          data: {
            user_id: userId,
            admin_id: adminUser.id,
            time: new Date(message.time),
            content_en_us: message.content['en-us'] || null,
            content_ja_jp: message.content['ja-jp'] || null,
            content_zh_cn: message.content['zh-cn'] || null,
            content_zh_tw: message.content['zh-tw'] || null,
            status: message.status,
            created_at: message.created
              ? new Date(message.created)
              : new Date(),
            updated_at: message.updated ? new Date(message.updated) : new Date()
          }
        })

        idMappings.message_admin[message.maid] = newMessage.id
        processed++

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalMessages} admin messages`)
        }
      } catch (error) {
        console.error(`Failed to migrate admin message ${message.maid}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} admin messages`)
}

// Migrate Reports
async function migrateReports(reportModel) {
  console.log('Migrating reports...')

  const totalReports = await reportModel.countDocuments()
  let processed = 0

  for (let skip = 0; skip < totalReports; skip += BATCH_SIZE) {
    const reports = await reportModel.find().skip(skip).limit(BATCH_SIZE)

    for (const report of reports) {
      try {
        // Assign the report to the first user (as the reporter)
        const user = await prisma.user.findFirst()

        if (!user) {
          console.warn('Skipping report - No user found')
          continue
        }

        const newReport = await prisma.report.create({
          data: {
            user_id: user.id,
            reason: report.reason,
            type: report.type,
            status: report.status,
            created_at: report.created ? new Date(report.created) : new Date(),
            updated_at: report.updated ? new Date(report.updated) : new Date()
          }
        })

        idMappings.report[report.report_id] = newReport.id
        processed++

        if (processed % 50 === 0) {
          console.log(`Processed ${processed}/${totalReports} reports`)
        }
      } catch (error) {
        console.error(`Failed to migrate report ${report.report_id}:`, error)
      }
    }
  }

  console.log(`Completed migrating ${processed} reports`)
}

// Migrate all the many-to-many relationships
async function migrateRelationships(models) {
  console.log('Migrating relationships...')

  // Migrate user friends
  console.log('Migrating user friends...')
  const users = await models.user.find({})

  for (const user of users) {
    const userId = idMappings.user[user.uid]

    if (!userId) continue

    // Friends
    if (user.friend && user.friend.length > 0) {
      for (const friendUid of user.friend) {
        const friendId = idMappings.user[friendUid]

        if (!friendId) continue

        try {
          await prisma.user_friend.create({
            data: {
              user_id: userId,
              friend_id: friendId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create friend relationship for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Followers
    if (user.followed && user.followed.length > 0) {
      for (const followedUid of user.followed) {
        const followedId = idMappings.user[followedUid]

        if (!followedId) continue

        try {
          await prisma.user_follow.create({
            data: {
              follower_id: userId,
              followed_id: followedId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create follow relationship for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Topic likes
    if (user.like_topic && user.like_topic.length > 0) {
      for (const topicId of user.like_topic) {
        const newTopicId = idMappings.topic[topicId]

        if (!newTopicId) continue

        try {
          await prisma.topic_like.create({
            data: {
              topic_id: newTopicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic like for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Topic dislikes
    if (user.dislike_topic && user.dislike_topic.length > 0) {
      for (const topicId of user.dislike_topic) {
        const newTopicId = idMappings.topic[topicId]

        if (!newTopicId) continue

        try {
          await prisma.topic_dislike.create({
            data: {
              topic_id: newTopicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic dislike for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Topic upvotes
    if (user.upvote_topic && user.upvote_topic.length > 0) {
      for (const topicId of user.upvote_topic) {
        const newTopicId = idMappings.topic[topicId]

        if (!newTopicId) continue

        try {
          await prisma.topic_upvote.create({
            data: {
              topic_id: newTopicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic upvote for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Topic favorites
    if (user.favorite_topic && user.favorite_topic.length > 0) {
      for (const topicId of user.favorite_topic) {
        const newTopicId = idMappings.topic[topicId]

        if (!newTopicId) continue

        try {
          await prisma.topic_favorite.create({
            data: {
              topic_id: newTopicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic favorite for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Galgame likes
    if (user.like_galgame && user.like_galgame.length > 0) {
      for (const galgameId of user.like_galgame) {
        const newGalgameId = idMappings.galgame[galgameId]

        if (!newGalgameId) continue

        try {
          await prisma.galgame_like.create({
            data: {
              galgame_id: newGalgameId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create galgame like for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Galgame favorites
    if (user.favorite_galgame && user.favorite_galgame.length > 0) {
      for (const galgameId of user.favorite_galgame) {
        const newGalgameId = idMappings.galgame[galgameId]

        if (!newGalgameId) continue

        try {
          await prisma.galgame_favorite.create({
            data: {
              galgame_id: newGalgameId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create galgame favorite for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }

    // Galgame contributions
    if (user.contribute_galgame && user.contribute_galgame.length > 0) {
      for (const galgameId of user.contribute_galgame) {
        const newGalgameId = idMappings.galgame[galgameId]

        if (!newGalgameId) continue

        try {
          await prisma.galgame_contributor.create({
            data: {
              galgame_id: newGalgameId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create galgame contributor for user ${user.uid}:`,
              error
            )
          }
        }
      }
    }
  }

  // Migrate topic upvotes, likes, etc.
  console.log('Migrating topic relationships...')
  const topics = await models.topic.find({})

  for (const topic of topics) {
    const topicId = idMappings.topic[topic.tid]

    if (!topicId) continue

    // Upvotes
    if (topic.upvotes && topic.upvotes.length > 0) {
      for (const userUid of topic.upvotes) {
        const userId = idMappings.user[userUid]

        if (!userId) continue

        try {
          await prisma.topic_upvote.create({
            data: {
              topic_id: topicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic upvote for topic ${topic.tid}:`,
              error
            )
          }
        }
      }
    }

    // Likes
    if (topic.likes && topic.likes.length > 0) {
      for (const userUid of topic.likes) {
        const userId = idMappings.user[userUid]

        if (!userId) continue

        try {
          await prisma.topic_like.create({
            data: {
              topic_id: topicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic like for topic ${topic.tid}:`,
              error
            )
          }
        }
      }
    }

    // Dislikes
    if (topic.dislikes && topic.dislikes.length > 0) {
      for (const userUid of topic.dislikes) {
        const userId = idMappings.user[userUid]

        if (!userId) continue

        try {
          await prisma.topic_dislike.create({
            data: {
              topic_id: topicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic dislike for topic ${topic.tid}:`,
              error
            )
          }
        }
      }
    }

    // Favorites
    if (topic.favorites && topic.favorites.length > 0) {
      for (const userUid of topic.favorites) {
        const userId = idMappings.user[userUid]

        if (!userId) continue

        try {
          await prisma.topic_favorite.create({
            data: {
              topic_id: topicId,
              user_id: userId
            }
          })
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('Unique constraint')) {
            console.error(
              `Failed to create topic favorite for topic ${topic.tid}:`,
              error
            )
          }
        }
      }
    }
  }

  // ... Other relationships (reply likes, galgame contributors, etc.)

  console.log('Completed migrating relationships')
}

// Main migration function
async function migrate() {
  try {
    await connectMongo()
    const models = await loadMongoModels()

    // Perform migrations in sequence due to dependencies
    await migrateUsers(models.user)
    await migrateTopics(models.topic)
    await migrateReplies(models.reply)
    await migrateGalgames(models.galgame)
    await migrateGalgameResources(models.galgame_resource)
    await migrateComments(models.comment)
    await migrateGalgameComments(models.galgame_comment)
    await migrateChatRooms(models.chat_room)
    await migrateChatMessages(models.chat_message)
    await migrateTodos(models.todo)
    await migrateUpdateLogs(models.update_log)
    await migrateNonMoe(models.non_moe)
    await migrateMessages(models.message)
    await migrateAdminMessages(models.message_admin)
    await migrateReports(models.report)

    // After all entities are migrated, migrate relationships
    await migrateRelationships(models)

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
    await mongoose.disconnect()
  }
}

// Run the migration
migrate().catch(console.error)
