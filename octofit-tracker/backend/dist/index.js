"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_1 = require("./lib/mongo");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
function sendRouteError(resource, error, response) {
    console.error(`Failed to load ${resource}`, error);
    response.status(500).json({
        resource,
        error: `Unable to load ${resource}`,
    });
}
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        port,
        baseUrl,
        mongoUrl: mongo_1.mongoUrl,
    });
});
app.get('/api/users/', async (_request, response) => {
    try {
        const items = await user_1.UserModel.find().sort({ displayName: 1 }).lean();
        response.json({
            resource: 'users',
            count: items.length,
            items,
            baseUrl,
        });
    }
    catch (error) {
        sendRouteError('users', error, response);
    }
});
app.get('/api/teams/', async (_request, response) => {
    try {
        const items = await team_1.TeamModel.find().sort({ name: 1 }).lean();
        response.json({
            resource: 'teams',
            count: items.length,
            items,
            baseUrl,
        });
    }
    catch (error) {
        sendRouteError('teams', error, response);
    }
});
app.get('/api/activities/', async (_request, response) => {
    try {
        const items = await activity_1.ActivityModel.find().sort({ completedAt: -1 }).lean();
        response.json({
            resource: 'activities',
            count: items.length,
            items,
            baseUrl,
        });
    }
    catch (error) {
        sendRouteError('activities', error, response);
    }
});
app.get('/api/leaderboard/', async (_request, response) => {
    try {
        const items = await leaderboard_1.LeaderboardModel.find().sort({ rank: 1 }).lean();
        response.json({
            resource: 'leaderboard',
            count: items.length,
            items,
            baseUrl,
        });
    }
    catch (error) {
        sendRouteError('leaderboard', error, response);
    }
});
app.get('/api/workouts/', async (_request, response) => {
    try {
        const items = await workout_1.WorkoutModel.find().sort({ title: 1 }).lean();
        response.json({
            resource: 'workouts',
            count: items.length,
            items,
            baseUrl,
        });
    }
    catch (error) {
        sendRouteError('workouts', error, response);
    }
});
async function startServer() {
    try {
        await (0, mongo_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`OctoFit backend listening on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
}
void startServer();
