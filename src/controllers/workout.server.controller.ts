import { Request, Response } from 'express'

export default class WorkoutsController {

  public index(req: Request, res: Response, next: Function): void {
    res.render('workouts', { title: 'Workouts' })
  }

  public myWorkouts(req: Request, res: Response, next: Function): void {
    res.render('myWorkouts', { title: 'My Workouts' })
  }
}

export const workoutsController = new WorkoutsController()
