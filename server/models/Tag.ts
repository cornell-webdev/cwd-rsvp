import { model, Schema } from 'mongoose'
import { ITagDocument } from '../types/tag.type'

const tagSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

export default model<ITagDocument>('Tag', tagSchema)
