import { model, Schema } from 'mongoose'
import { IMemberDocument } from '../types/member.type'

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

memberSchema.plugin(require('mongoose-autopopulate'))

export default model<IMemberDocument>('Member', memberSchema)
