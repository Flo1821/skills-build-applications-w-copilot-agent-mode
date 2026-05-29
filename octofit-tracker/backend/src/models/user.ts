import { InferSchemaType, Schema, model, models } from 'mongoose';

const userSchema = new Schema(
    {
        username: { type: String, required: true, trim: true },
        displayName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        fitnessLevel: { type: String, required: true, trim: true },
        goals: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = models.User || model('User', userSchema);