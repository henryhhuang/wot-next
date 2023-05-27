
import Exercise from "@/models/exercise";
import { connectToDB } from "@/utils/database";
import { ObjectId } from 'mongodb';
import { NextApiRequest } from "next";

export const GET = async (_request: NextApiRequest, { params }: any) => {
    try {
        await connectToDB();

        const exercises = await Exercise.find({
            workoutId: new ObjectId(params.workoutId)
        });

        return new Response(JSON.stringify(exercises), { status : 200 });
    } catch (error) {
        return new Response("Failed to fetch exercise names", { status: 500 });
    }
}