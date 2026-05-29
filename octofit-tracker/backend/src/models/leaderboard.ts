import { InferSchemaType, Schema, model, models } from 'mongoose';

const leaderboardSchema = new Schema(
    {
        username: { type: String, required: true, trim: true },
        teamName: { type: String, required: true, trim: true },
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel =
    models.Leaderboard || model('Leaderboard', leaderboardSchema);