import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';

import { config } from './config';
import { logger } from './logging';
import { render } from './render';
import { routes } from './routes';
import { session } from './session';

const app: Koa = new Koa();

app.use(mount('/public', serve(`${__dirname}/public`)));
app.use(logger);
app.use(render);
app.use(session);
app.use(routes);
app.listen(config.port);

console.log(`Server running on port ${config.port}`);
