import express from 'express';
import { connectToDatabase, mongoUrl } from './lib/mongo';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { TeamModel } from './models/team';
import { UserModel } from './models/user';
import { WorkoutModel } from './models/workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

function sendRouteError(resource: string, error: unknown, response: express.Response) {
    console.error(`Failed to load ${resource}`, error);
    response.status(500).json({
        resource,
        error: `Unable to load ${resource}`,
    });
}

app.use(express.json());

app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        port,
        baseUrl,
        mongoUrl,
    });
});

app.get('/api/users/', async (_request, response) => {
    try {
        const items = await UserModel.find().sort({ displayName: 1 }).lean();
        response.json({
            resource: 'users',
            count: items.length,
            items,
            baseUrl,
        });
    } catch (error) {
        sendRouteError('users', error, response);
    }
});

app.get('/api/teams/', async (_request, response) => {
    try {
        const items = await TeamModel.find().sort({ name: 1 }).lean();
        response.json({
            resource: 'teams',
            count: items.length,
            items,
            baseUrl,
        });
    } catch (error) {
        sendRouteError('teams', error, response);
    }
});

app.get('/api/activities/', async (_request, response) => {
    try {
        const items = await ActivityModel.find().sort({ completedAt: -1 }).lean();
        response.json({
            resource: 'activities',
            count: items.length,
            items,
            baseUrl,
        });
    } catch (error) {
        sendRouteError('activities', error, response);
    }
});

app.get('/api/leaderboard/', async (_request, response) => {
    try {
        const items = await LeaderboardModel.find().sort({ rank: 1 }).lean();
        response.json({
            resource: 'leaderboard',
            count: items.length,
            items,
            baseUrl,
        });
    } catch (error) {
        sendRouteError('leaderboard', error, response);
    }
});

app.get('/api/workouts/', async (_request, response) => {
    try {
        const items = await WorkoutModel.find().sort({ title: 1 }).lean();
        response.json({
            resource: 'workouts',
            count: items.length,
            items,
            baseUrl,
        });
    } catch (error) {
        sendRouteError('workouts', error, response);
    }
});

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`OctoFit backend listening on ${baseUrl}`);
        });
    } catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
}

void startServer();