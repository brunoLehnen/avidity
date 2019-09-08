
import * as Router from 'koa-router';
import { getCharacters } from '../services/http-service';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/test', async (ctx) => {
    ctx.status = 201;
    ctx.body = 'test';
});

router.get('/marvel', getCharacters);

export const routes = router.routes();
