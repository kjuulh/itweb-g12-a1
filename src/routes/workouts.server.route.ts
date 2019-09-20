import { Express } from 'express'
import { workoutsController } from '../controllers/workout.server.controller'

export default class WorkoutRoute {

  constructor(app: Express) {
    app.route('/workouts').get(workoutsController.index)
    app.route('/workouts/mine').get(workoutsController.myWorkouts)
  }
}

