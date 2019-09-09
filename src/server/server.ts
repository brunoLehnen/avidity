import * as Koa from 'koa';

import { config } from './config';
import { logger } from './logging';
import { routes } from './routes';
import { addExtensions } from '../extensions';

const app: Koa = new Koa();

addExtensions(app);

app.use(logger);
app.use(routes);
app.listen(config.port);

console.log(`Server running on port ${config.port}`);
