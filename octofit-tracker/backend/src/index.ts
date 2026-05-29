import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        port,
        mongoUrl,
    });
});

async function startServer() {
    try {
        await mongoose.connect(mongoUrl);
        app.listen(port, () => {
            console.log(`OctoFit backend listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
}

void startServer();