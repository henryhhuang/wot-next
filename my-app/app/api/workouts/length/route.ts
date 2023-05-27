import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from 'mongodb';
import Workout from "@/models/workout";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        await connectToDB();

        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("You must be logged in", { status: 401 });
        }

        const length = await Workout.countDocuments( {
                userId: new ObjectId(session?.user.id) });

        return new Response(JSON.stringify(length), { status : 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500});
    }
}
