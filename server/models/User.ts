import { model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { IUserDocument } from '../types/user.type'

const userSchema = new Schema({
  authProvider: {
    // 'google'
    type: String,
  },
  providerId: {
    type: String,
  },
  providerData: {
    type: Schema.Types.Mixed,
  },
}, { timestamps: true })

userSchema.plugin(autopopulate)

export default model<IUserDocument>('User', userSchema)
