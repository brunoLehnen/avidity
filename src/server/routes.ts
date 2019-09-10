import * as Router from 'koa-router';
import { getCharacterWithSampleStory } from '../middlewares/marvel-middleware';

const router: Router = new Router();

router.get('/sampleStory', getCharacterWithSampleStory);

export const routes = router.routes();
