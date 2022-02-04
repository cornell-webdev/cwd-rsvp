import { model, Schema } from 'mongoose'
import { IOrgDocument } from '../types/org.type'
import User from './User'

const orgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    desc: {
      type: String,
      default: '',
    },
    linkedUserIds: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
    },
    providerId: {
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

orgSchema.virtual('linkedUsers', {
  ref: User,
  localField: 'linkedUserIds',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
})

orgSchema.plugin(require('mongoose-autopopulate'))

export default model<IOrgDocument>('Org', orgSchema)
