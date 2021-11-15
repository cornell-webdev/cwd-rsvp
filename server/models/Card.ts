import { model, Schema } from 'mongoose'
import { ICardDocument } from '../types/card.type'
import User from './User'

const cardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    question: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
    answer: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },

    isLearning: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
          autopopulate: true,
        },
      ],
      default: [],
    },

    repAt: {
      type: Date,
      default: new Date(),
    },
    repSpace: {
      type: Number,
      default: 1,
    },
    repCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

cardSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

cardSchema.plugin(require('mongoose-autopopulate'))

export default model<ICardDocument>('Card', cardSchema)
