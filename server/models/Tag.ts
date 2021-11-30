import { model, Schema } from 'mongoose'
import { ITagDocument } from '../types/tag.type'

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

export default model<ITagDocument>('Tag', tagSchema)
