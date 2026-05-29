"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    targetMuscleGroups: [{ type: String, required: true }],
    durationMinutes: { type: Number, required: true },
    recommendedForGoal: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
exports.WorkoutModel = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
