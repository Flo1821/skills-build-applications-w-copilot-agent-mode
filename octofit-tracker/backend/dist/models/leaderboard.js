"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.LeaderboardModel = mongoose_1.models.Leaderboard || (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
