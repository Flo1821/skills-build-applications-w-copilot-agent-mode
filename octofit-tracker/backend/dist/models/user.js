"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    fitnessLevel: { type: String, required: true, trim: true },
    goals: [{ type: String, required: true }],
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
