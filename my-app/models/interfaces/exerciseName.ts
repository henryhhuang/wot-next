import { ObjectId } from "mongoose"

export interface IExerciseName {
    _id?: ObjectId,
    name: string,
    category?: string,
    userId: ObjectId
}