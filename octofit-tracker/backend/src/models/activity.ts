import { InferSchemaType, Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
    {
        username: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, required: true },
        caloriesBurned: { type: Number, required: true },
        completedAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const ActivityModel = models.Activity || model('Activity', activitySchema);