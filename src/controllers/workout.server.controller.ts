import { Request, Response } from 'express'
import { Mongoose } from 'mongoose'
import { Exercise, IExercise } from '../models/exercise.model'
import { IWorkout, Workout } from '../models/workout.model'

export default class WorkoutsController {
  public index(req: Request, res: Response, next: Function): void {
    Workout.find((err, workouts) => {
      if (!err) {
        res.render('workouts', { title: 'Workouts', workouts })
      }
    })
  }

  public myWorkouts(req: Request, res: Response, next: Function): void {
    Workout.find({ ownerId: req.user['_id'] }, (err, workouts) => {
      if (err) {
        req.flash('workoutMessages', "couldn't get workouts")
      }
      res.render('myWorkouts', {
        title: 'My Workouts',
        message: req.flash('workoutMessages'),
        workouts,
      })
    })
  }

  public createWorkout(req: Request, res: Response, next: Function): void {
    console.info('Creating workout')
    const workout = new Workout({
      ownerId: req.user['_id'],
      name: req.body.name,
      description: req.body.description,
    })
    workout.save(err => {
      if (err) {
        console.log('An error occurred saving workout')
        req.flash('workoutMessages', "Couldn't save workout")
      }
      res.redirect('/workouts/mine')
    })
    console.info('Workout Created')
  }

  public changeWorkout(req: Request, res: Response, next: Function): void {
    console.info('Changing workout')

    Workout.findById(req.params.workoutId, (err, workout: IWorkout) => {
      const userId = req.user['_id']
      const workoutOwnerId = workout.ownerId
      if (!userId.equals(workoutOwnerId)) {
        console.log("User doesn't have permission")
        res.redirect('/home')
      }
      if (err) {
        console.error(err)
        req.flash('workoutMessages', "Clouldn't update workout")
        res.redirect('/workouts/' + req.params.workoutId)
        return
      }
      workout.name = req.body.name
      workout.description = req.body.description
      workout.save(err => {
        if (err) {
          console.error(err)
          console.log('An error occurred saving workout')
          req.flash('workoutMessages', "Couldn't update workout")
          res.redirect('/workouts/' + req.params.workoutId)
          return
        }
        res.redirect('/workouts/mine')
      })
    })

    console.info('Workout Created')
  }

  public getWorkout(req: Request, res: Response, next: Function): void {
    Workout.findOne({ _id: req.params.workoutId }).exec(
      (err, workout: IWorkout) => {
        if (err) {
          console.error(err)
          req.flash('workoutMessages', 'Something went wrong')
          res.redirect('/workouts')
          return
        }
        Exercise.find({ workoutId: workout._id }, (err, exercises) => {
          if (err) {
            console.error("Couldn't get exercises")
          } else {
            if (req.isAuthenticated()) {
              const userId = req.user['_id']
              const workoutOwnerId = workout.ownerId
              if (userId.equals(workoutOwnerId)) {
                res.render('editWorkout', {
                  title: 'Edit Workout: ' + workout.name,
                  workout,
                  exercises,
                  loggedIn: true,
                })
                return
              } else {
                res.render('workout', {
                  title: 'Workout: ' + workout.name,
                  workout,
                  exercises,
                  loggedIn: true,
                })
              }
            }
            res.render('workout', {
              title: 'Workout: ' + workout.name,
              workout,
              exercises,
              loggedIn: false,
            })
          }
        })
      }
    )
  }
}

export const workoutsController = new WorkoutsController()
