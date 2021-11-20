import { model, Schema } from 'mongoose'
import { IEventDocument } from '../types/event.type'
import User from './User'
import Tag from './Tag'

const eventSchema = new Schema(
  {
    orgId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: true,
    },
    meetingUrl: {
      // zoom link for virtual events
      type: String,
    },
    tagId: {
      type: String,
    },
    dates: {
      type: [Date],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    imgs: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    likedUserIds: {
      type: [String],
      default: [],
    },
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    providerUrl: {
      type: String,
    },
    providerData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

eventSchema.virtual('likedUsers', {
  ref: User,
  localField: 'likeUserIds',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
})

eventSchema.virtual('tag', {
  ref: Tag,
  localField: 'tagId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

eventSchema.plugin(require('mongoose-autopopulate'))

export default model<IEventDocument>('Event', eventSchema)
