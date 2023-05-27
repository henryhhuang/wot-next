import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    type: {
        type: String
    },
    workoutId: {
        type: ObjectId,
        required: [true, "Workout required"]
    },
    sets: [{
        _id: ObjectId,
        weight: Number,
        reps: Number
    }]
})

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);

export default Exercise;

