import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';
import { IWorkout } from './interfaces/workout';

const WorkoutSchema = new Schema<IWorkout>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    exercises: [{
        _id: {
            type: ObjectId,
            required: [false]
        },
        name: {
            type: String,
            required: [true, "Exercise name is required"]
        }
    }],
    userId: {
        type: ObjectId,
        required: [true, "User required"]
    },
})

const Workout = models.Workout || model<IWorkout>("Workout", WorkoutSchema);

export default Workout;

