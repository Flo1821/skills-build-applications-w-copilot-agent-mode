import mongoose from 'mongoose';

export const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    await mongoose.connect(mongoUrl);
    return mongoose.connection;
}

export async function disconnectFromDatabase() {
    if (mongoose.connection.readyState === 0) {
        return;
    }

    await mongoose.disconnect();
}