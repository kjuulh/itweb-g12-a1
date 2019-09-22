import { Express } from 'express'
import { exercisesController } from '../controllers/exercises.server.controller'
import { workoutsController } from '../controllers/workout.server.controller'
import { authGuard } from '../middleware/auth.middleware.server'

export default class ExercisesRoute {

  constructor(app: Express) {
    app.route('/workouts/:workoutId/exercises')
      .get(authGuard, exercisesController.createPage)
      .post(authGuard, exercisesController.create)
  }
}

