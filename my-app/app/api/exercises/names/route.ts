import ExerciseNames from "@/models/exerciseNames";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";

export const GET = async (_request: NextApiRequest) => {
    try {
        await connectToDB();

        const exerciseNames = await ExerciseNames.find({});
        console.log(exerciseNames);

        return new Response(JSON.stringify(exerciseNames), { status : 200 });
    } catch (error) {
        return new Response("Failed to fetch exercise names", { status: 500 });
    }
}

