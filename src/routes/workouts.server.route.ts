import { Express } from 'express'
import { workoutsController } from '../controllers/workout.server.controller'
import { authGuard } from '../middleware/auth.middleware.server'

export default class WorkoutRoute {

  constructor(app: Express) {
    app.route('/workouts').get(workoutsController.index)
    app.route('/workouts/mine').get(authGuard, workoutsController.myWorkouts)
    app.route('/workouts').post(authGuard, workoutsController.createWorkout)
    app.route('/workouts/:workoutId')
    .get(workoutsController.getWorkout)
    app.route('/workouts/:workoutId/put').post(authGuard, workoutsController.changeWorkout)
  }
}

