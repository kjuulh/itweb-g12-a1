import { Document, Model, model, Schema } from 'mongoose'

export interface IWorkout extends Document {
  ownerId: string,
  name: string,
  description: string,
  exerciseIds: string[],
  created: Date
}

export let WorkoutSchema: Schema = new Schema({
  ownerId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  exerciseIds: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const User: Model<IWorkout> = model<IWorkout>('Workout', WorkoutSchema)
