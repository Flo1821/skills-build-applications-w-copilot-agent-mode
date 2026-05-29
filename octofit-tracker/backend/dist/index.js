"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        port,
        mongoUrl,
    });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUrl);
        app.listen(port, () => {
            console.log(`OctoFit backend listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
}
void startServer();
