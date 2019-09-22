import { Document, Model, model, Schema } from 'mongoose'

export interface IToken extends Document {
  value: string,
  userId: string,
  created: Date
}

export let TokenSchema: Schema = new Schema({
  value: {
    type: Schema.Types.String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Token: Model<IToken> = model<IToken>('Token', TokenSchema)
