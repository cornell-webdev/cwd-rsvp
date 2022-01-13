import { model, Schema } from 'mongoose'
import { ILogDocument } from '../types/log.type'

const logSchema = new Schema(
  {
    action: {
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

logSchema.plugin(require('mongoose-autopopulate'))

export default model<ILogDocument>('Log', logSchema)
