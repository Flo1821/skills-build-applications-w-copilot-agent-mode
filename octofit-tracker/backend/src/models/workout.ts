import { InferSchemaType, Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        difficulty: { type: String, required: true, trim: true },
        targetMuscleGroups: [{ type: String, required: true }],
        durationMinutes: { type: Number, required: true },
        recommendedForGoal: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = models.Workout || model('Workout', workoutSchema);