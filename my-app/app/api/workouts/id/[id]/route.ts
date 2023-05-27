import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import Workout from "@/models/workout";
import Exercise from "@/models/exercise";
import { authOptions } from "../auth/[...nextauth]/route";

export const DELETE = async (req: NextRequest, { params }: any) => {
    try {
        await connectToDB();
        
        await Exercise.deleteMany( {
            workoutId: params.id
        });

        const result = await Workout.deleteOne({
            _id: params.id
        });

        if (result && result.deletedCount) {
            return new Response("Successfully deleted workout ID: " + params.id, { status : 200 });
        } else if (!result) {
            return new Response("Failed to delete workout ID: " + params.id, { status : 400 });
        } else if (!result.deletedCount) {
            return new Response("Failed to find workout ID: " + params.id, { status : 404 });
        }
        
    } catch (error) {
        return new Response("Internal Server Error", { status : 500 });
    }
}