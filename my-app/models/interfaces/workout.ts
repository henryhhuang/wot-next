import { ObjectId } from "mongoose"
import { IExerciseName } from "./exerciseName"

export interface IWorkout {
    name: string,
    date: Date,
    exercises: IExerciseName[],
    _id?: ObjectId,
    userId?: ObjectId
}