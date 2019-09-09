import * as Router from 'koa-router';
import { getCharacter } from '../middlewares/marvel-middleware';

const router: Router = new Router();

router.get('/character', getCharacter);

export const routes = router.routes();
