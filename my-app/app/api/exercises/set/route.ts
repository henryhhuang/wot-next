import Exercise from "@/models/exercise";
import { connectToDB } from "@/utils/database";
import { ObjectId } from 'mongodb';
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    try {
        await connectToDB();

        const { _id, set } = await req.json();

        const newSet = {
            _id: new ObjectId(),
            weight: set.weight,
            reps: set.reps
        }

        const result = await Exercise.updateOne( {_id: _id}, {$push: {sets : newSet} } );

        if (result.acknowledged) {
            return new Response("Added new set to exercise" + _id, { status : 200 });
        }
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new set", { status: 500 });
    }
}

export const PATCH = async (req: NextRequest) => {
    try {
        await connectToDB();

        const { _id, setId } = await req.json();
        const result = await Exercise.updateOne( { _id: _id }, { $pull: { sets: { _id: setId } } } );
        if (result.acknowledged) {
            return new Response("Deleted set from exercise" + _id, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return new Response("Failed to delete set", { status: 500 });
    }
}