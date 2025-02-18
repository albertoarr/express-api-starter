import 'module-alias/register'
import 'tsconfig-paths/register'
import 'reflect-metadata';
import dotenv from 'dotenv'
import app from './app';
import logger from '@/lib/logger'
import ListEndpoints from 'express-list-endpoints';

dotenv.config();

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {});

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    const routes = ListEndpoints(app);
    logger.info('Registered routes:');
    routes.forEach(route => {
        route.methods.forEach(method => {
            logger.info(`${method.toUpperCase()} ${route.path}`)
        })
    })
});
