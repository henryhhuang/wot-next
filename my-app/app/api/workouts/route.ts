import ExerciseNames from "@/models/exerciseNames";
import { connectToDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from 'mongodb';
import { IExerciseName } from "@/models/interfaces/exerciseName";
import { IWorkout } from "@/models/interfaces/workout";
import Workout from "@/models/workout";
import Exercise from "@/models/exercise";
import { authOptions } from "../auth/[...nextauth]/route";


export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("You must be logged in", { status: 401 });
        }

        const { name, date, exercises } = await req.json();

        const newWorkout = new Workout({
            name,
            date,
            exercises: exercises,
            userId: new ObjectId(session?.user.id)
        });

        await newWorkout.save().then((savedWorkout: IWorkout) => {
            savedWorkout.exercises.map(async (exerciseName: IExerciseName) => {
                const newExercise = new Exercise({
                    name: exerciseName.name,
                    workoutId: savedWorkout._id,
                    sets: []
                });

                await newExercise.save();

                if (exerciseName._id == null) {
                    const newExerciseName = new ExerciseNames({
                        name: exerciseName.name,
                        userId: new ObjectId(session?.user.id)
                    })

                    await newExerciseName.save()

                }
            });
        });

        return new Response("Created new workout: ID", { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create workout", { status: 500 });
    }
}