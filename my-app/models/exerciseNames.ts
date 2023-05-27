import { ObjectId } from 'mongodb';
import { IExerciseName } from './interfaces/exerciseName';
import { Schema, model, models } from 'mongoose';


const ExerciseNamesSchema = new Schema<IExerciseName>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    category: {
        type: String
    },
    userId: {
        type: ObjectId,
        required: [true, "User required"]
    }
})

const ExerciseNames = models.ExerciseNames || model<IExerciseName>("ExerciseNames", ExerciseNamesSchema);

export default ExerciseNames;

