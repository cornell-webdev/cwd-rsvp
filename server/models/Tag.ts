import { model, Schema } from 'mongoose'
import { ITagDocument } from '../types/tag.type'

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export default model<ITagDocument>('Tag', tagSchema)
