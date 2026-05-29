import { InferSchemaType, Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        focus: { type: String, required: true, trim: true },
        memberUsernames: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const TeamModel = models.Team || model('Team', teamSchema);