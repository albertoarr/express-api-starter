import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { loadControllers } from 'awilix-express';
import { loadContainer } from '@/lib/container';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
// TODO: add middleware

export const container = loadContainer(app);

app.use(loadControllers(
    '**/*.controller.{ts,js}',
    { cwd: __dirname }
));

export default app;
