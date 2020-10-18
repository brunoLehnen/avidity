import { config as dotenv } from 'dotenv';

dotenv();

import Koa from 'koa';
import { config } from './config';
import { logger } from './logging';
import { routes } from './routes';

const app: Koa = new Koa();

app.use(logger);
app.use(routes);
app.listen(config.port);

console.log(`Server running on port ${config.port}`);
