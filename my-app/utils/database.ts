import mongoose from 'mongoose';

let isConnected = false;

const { ATLAS_URI = '' } = process.env;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Mongo DB already connected');
        return;
    }

    try {
        const res = await mongoose.connect(ATLAS_URI, {
            dbName: "wodnext",
        })
        console.log('Mongo DB connected');
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}